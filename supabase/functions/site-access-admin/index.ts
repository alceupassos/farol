import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import CryptoJS from "https://esm.sh/crypto-js@4.2.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const ISSUER = "Saúde Municipal+";

const getRequiredEnv = (key: string): string => {
  const value = Deno.env.get(key);
  if (!value) {
    throw new Error(`${key} not configured`);
  }
  return value;
};

const generateSalt = (): string => {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
};

const generateSecret = (): string => {
  const BASE32_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);

  let secret = "";
  for (let i = 0; i < bytes.length; i++) {
    secret += BASE32_ALPHABET[bytes[i] % 32];
  }

  return secret;
};

const deriveKey = (salt: string): string => {
  const encryptionKey = getRequiredEnv("SITE_ENCRYPTION_KEY");
  return CryptoJS.PBKDF2(encryptionKey, salt, {
    keySize: 256 / 32,
    iterations: 100000,
  }).toString();
};

const encryptSecret = (secret: string, salt: string): string => {
  const key = deriveKey(salt);
  return CryptoJS.AES.encrypt(secret, key).toString();
};

const decryptSecret = (encryptedSecret: string, salt: string): string => {
  const key = deriveKey(salt);
  const bytes = CryptoJS.AES.decrypt(encryptedSecret, key);
  return bytes.toString(CryptoJS.enc.Utf8);
};

const generateTotpUri = (secret: string, codeName: string): string => {
  const label = `Site Access - ${codeName}`;
  return `otpauth://totp/${encodeURIComponent(label)}?secret=${secret}&issuer=${encodeURIComponent(ISSUER)}`;
};

const requireAdminSession = async (supabaseClient: ReturnType<typeof createClient>, sessionToken?: unknown): Promise<string> => {
  if (typeof sessionToken !== "string" || sessionToken.trim().length === 0) {
    throw new Error("Admin session token is required");
  }

  const { data: isValid, error: validationError } = await supabaseClient.rpc("validate_admin_session", {
    session_token: sessionToken,
  });

  if (validationError) {
    console.error("Failed validating admin session:", validationError);
    throw new Error("Unable to validate admin session");
  }

  if (!isValid) {
    throw new Error("Invalid or expired admin session");
  }

  const { data: session, error: sessionError } = await supabaseClient
    .from("admin_sessions")
    .select("admin_user_id")
    .eq("session_token", sessionToken)
    .gt("expires_at", new Date().toISOString())
    .maybeSingle();

  if (sessionError || !session) {
    console.error("Admin session lookup error:", sessionError);
    throw new Error("Admin session not found or expired");
  }

  return session.admin_user_id;
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const supabaseClient = createClient(
      getRequiredEnv("SUPABASE_URL"),
      getRequiredEnv("SUPABASE_SERVICE_ROLE_KEY")
    );

    const body = await req.json();
    const action = body?.action as string | undefined;

    if (!action) {
      return new Response(JSON.stringify({ error: "Action is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    switch (action) {
      case "overview": {
        await requireAdminSession(supabaseClient, body.sessionToken);

        const [codesResult, logsResult] = await Promise.all([
          supabaseClient
            .from("site_access_codes")
            .select("id, code_name, is_active, created_at, expires_at, last_used_at")
            .order("created_at", { ascending: false }),
          supabaseClient
            .from("site_access_logs")
            .select("id, success, attempted_at, ip_address, user_agent, code_used")
            .order("attempted_at", { ascending: false })
            .limit(50),
        ]);

        if (codesResult.error) {
          console.error("Failed to load access codes:", codesResult.error);
          throw new Error("Unable to load access codes");
        }

        if (logsResult.error) {
          console.error("Failed to load access logs:", logsResult.error);
          throw new Error("Unable to load access logs");
        }

        return new Response(
          JSON.stringify({
            codes: codesResult.data ?? [],
            logs: logsResult.data ?? [],
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      case "create_code": {
        const adminId = await requireAdminSession(supabaseClient, body.sessionToken);
        const codeName = typeof body.codeName === "string" ? body.codeName.trim() : "";

        if (!codeName) {
          return new Response(JSON.stringify({ error: "Code name is required" }), {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }

        const secret = generateSecret();
        const salt = generateSalt();
        const encryptedSecret = encryptSecret(secret, salt);
        const qrUri = generateTotpUri(secret, codeName);

        const { data: inserted, error } = await supabaseClient
          .from("site_access_codes")
          .insert({
            code_name: codeName,
            encrypted_secret: encryptedSecret,
            salt,
            is_active: true,
            created_by: adminId,
          })
          .select("id, code_name, is_active, created_at, expires_at, last_used_at")
          .single();

        if (error || !inserted) {
          console.error("Failed to create site access code:", error);
          throw new Error("Unable to create access code");
        }

        return new Response(
          JSON.stringify({
            code: inserted,
            secret,
            qrUri,
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 201 }
        );
      }

      case "update_status": {
        await requireAdminSession(supabaseClient, body.sessionToken);
        const codeId = typeof body.codeId === "string" ? body.codeId : undefined;
        const isActive = typeof body.isActive === "boolean" ? body.isActive : undefined;

        if (!codeId || typeof isActive !== "boolean") {
          return new Response(JSON.stringify({ error: "codeId and isActive are required" }), {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }

        const { error } = await supabaseClient
          .from("site_access_codes")
          .update({ is_active: isActive })
          .eq("id", codeId);

        if (error) {
          console.error("Failed to update code status:", error);
          throw new Error("Unable to update code status");
        }

        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      case "get_code_secret": {
        await requireAdminSession(supabaseClient, body.sessionToken);
        const codeId = typeof body.codeId === "string" ? body.codeId : undefined;

        if (!codeId) {
          return new Response(JSON.stringify({ error: "codeId is required" }), {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }

        const { data: code, error } = await supabaseClient
          .from("site_access_codes")
          .select("code_name, encrypted_secret, salt")
          .eq("id", codeId)
          .maybeSingle();

        if (error || !code) {
          console.error("Failed to fetch code secret:", error);
          throw new Error("Access code not found");
        }

        const secret = decryptSecret(code.encrypted_secret, code.salt);
        const qrUri = generateTotpUri(secret, code.code_name);

        return new Response(
          JSON.stringify({
            secret,
            qrUri,
            codeName: code.code_name,
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      default:
        return new Response(JSON.stringify({ error: `Unknown action: ${action}` }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }
  } catch (error) {
    console.error("Error in site-access-admin function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Internal server error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
