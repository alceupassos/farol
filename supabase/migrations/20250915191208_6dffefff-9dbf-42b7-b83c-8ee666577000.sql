-- Complete the security fix by adding the remaining secure functions
-- Update is_admin_user to use the same secure logic
CREATE OR REPLACE FUNCTION public.is_admin_user()
RETURNS boolean
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN public.is_current_user_admin();
END;
$$;

-- Add additional security: Create a function that only service role can use to manage admin users
CREATE OR REPLACE FUNCTION public.create_admin_user(
  p_email text,
  p_password_hash text,
  p_salt text DEFAULT null
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_admin_id uuid;
BEGIN
  -- Only service role can create admin users
  IF auth.role() != 'service_role' THEN
    RAISE EXCEPTION 'Unauthorized: Only service role can create admin users';
  END IF;
  
  INSERT INTO admin_users (email, password_hash, salt)
  VALUES (p_email, p_password_hash, p_salt)
  RETURNING id INTO new_admin_id;
  
  RETURN new_admin_id;
END;
$$;

-- Create a secure function for admin authentication that only edge functions can use
CREATE OR REPLACE FUNCTION public.authenticate_admin(
  p_email text,
  p_password_hash text
)
RETURNS table(admin_id uuid, session_token text, expires_at timestamptz)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_admin_id uuid;
  v_session_token text;
  v_expires_at timestamptz;
BEGIN
  -- Only service role can call this function
  IF auth.role() != 'service_role' THEN
    RAISE EXCEPTION 'Unauthorized: Only service role can authenticate admins';
  END IF;
  
  -- Find admin user with matching credentials
  SELECT id INTO v_admin_id
  FROM admin_users 
  WHERE email = p_email 
  AND password_hash = p_password_hash
  AND (locked_until IS NULL OR locked_until < now());
  
  IF v_admin_id IS NULL THEN
    -- Update failed login attempts
    UPDATE admin_users 
    SET failed_login_attempts = COALESCE(failed_login_attempts, 0) + 1,
        locked_until = CASE 
          WHEN COALESCE(failed_login_attempts, 0) + 1 >= 5 
          THEN now() + interval '30 minutes'
          ELSE locked_until
        END
    WHERE email = p_email;
    
    RETURN;
  END IF;
  
  -- Reset failed attempts and update last login
  UPDATE admin_users 
  SET failed_login_attempts = 0,
      locked_until = null,
      last_login_at = now()
  WHERE id = v_admin_id;
  
  -- Generate session token
  v_session_token := encode(gen_random_bytes(32), 'hex');
  v_expires_at := now() + interval '24 hours';
  
  -- Create session
  INSERT INTO admin_sessions (admin_user_id, session_token, expires_at)
  VALUES (v_admin_id, v_session_token, v_expires_at);
  
  RETURN QUERY SELECT v_admin_id, v_session_token, v_expires_at;
END;
$$;