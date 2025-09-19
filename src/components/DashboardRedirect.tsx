import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

/** -------- Base32 (RFC 4648) util -------- */
const B32_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
function base32ToBytes(input: string): Uint8Array {
  const cleaned = input.replace(/\s|=|-/g, '').toUpperCase();
  let bits = '';
  for (const c of cleaned) {
    const v = B32_ALPHABET.indexOf(c);
    if (v === -1) continue;
    bits += v.toString(2).padStart(5, '0');
  }
  const out: number[] = [];
  for (let i = 0; i + 8 <= bits.length; i += 8) {
    out.push(parseInt(bits.slice(i, i + 8), 2));
  }
  return new Uint8Array(out);
}

/** -------- HMAC-SHA1 + TOTP util -------- */
function intToBytes8(counter: number): Uint8Array {
  const b = new Uint8Array(8);
  for (let i = 7; i >= 0; i--) {
    b[i] = counter & 0xff;
    counter = Math.floor(counter / 256);
  }
  return b;
}

async function hmacSha1(keyBytes: Uint8Array, msg: Uint8Array): Promise<Uint8Array> {
  const cryptoKey = await crypto.subtle.importKey('raw', keyBytes, { name: 'HMAC', hash: 'SHA-1' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', cryptoKey, msg);
  return new Uint8Array(sig);
}

async function totpAt(secretB32: string, counter: number, digits = 6): Promise<string> {
  const key = base32ToBytes(secretB32);
  const mac = await hmacSha1(key, intToBytes8(counter));
  const offset = mac[mac.length - 1] & 0xf;
  const bin =
    ((mac[offset] & 0x7f) << 24) |
    (mac[offset + 1] << 16) |
    (mac[offset + 2] << 8) |
    mac[offset + 3];
  const mod = 10 ** digits;
  return (bin % mod).toString().padStart(digits, '0');
}

async function validateTotp(inputCode: string, secretB32: string, step = 30, window = 1, digits = 6): Promise<boolean> {
  const now = Math.floor(Date.now() / 1000);
  const cur = Math.floor(now / step);
  const trimmed = inputCode.trim();
  for (let w = -window; w <= window; w++) {
    const code = await totpAt(secretB32, cur + w, digits);
    if (code === trimmed) return true;
  }
  return false;
}

/** -------- Modal OTP -------- */
const OtpModal: React.FC<{
  isOpen: boolean;
  onValidated: () => void;
  secretB32?: string;
}> = ({ isOpen, onValidated, secretB32 = 'JBSWY3DPEHPK3PXP' }) => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setCode('');
      setError(null);
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [isOpen]);

  const remaining = useMemo(() => {
    const step = 30;
    const now = Math.floor(Date.now() / 1000);
    return step - (now % step);
  }, [isOpen]); // apenas para render inicial

  useEffect(() => {
    if (!isOpen) return;
    const id = setInterval(() => {
      // força rerender para contagem regressiva via state dummy
      setError((e) => e); // noop para disparar render
    }, 1000);
    return () => clearInterval(id);
  }, [isOpen]);

  const secondsLeft = (() => {
    const step = 30;
    const now = Math.floor(Date.now() / 1000);
    return step - (now % step);
  })();

  const handleValidate = async () => {
    setLoading(true);
    setError(null);
    try {
      const ok = await validateTotp(code, secretB32, 30, 1, 6);
      if (ok) {
        onValidated();
      } else {
        setError('Código inválido. Tente novamente.');
      }
    } catch (e) {
      setError('Falha ao validar o código.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm"
      aria-modal="true"
      role="dialog"
      aria-labelledby="otp-title"
    >
      <div className="w-full max-w-sm rounded-2xl border border-zinc-800 bg-zinc-950 p-5 shadow-2xl">
        <h2 id="otp-title" className="text-lg font-semibold text-zinc-100">
          Verificação em duas etapas
        </h2>
        <p className="mt-1 text-sm text-zinc-400">
          Abra o Google Authenticator e digite o código de 6 dígitos.
        </p>

        <div className="mt-4">
          <label htmlFor="otp" className="text-xs text-zinc-400">
            Código TOTP
          </label>
          <input
            id="otp"
            ref={inputRef}
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={6}
            value={code}
            onChange={(e) => {
              const v = e.target.value.replace(/\D/g, '').slice(0, 6);
              setCode(v);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && code.length === 6 && !loading) handleValidate();
            }}
            className="mt-1 w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-zinc-100 outline-none focus:ring-2 focus:ring-emerald-500/30"
            placeholder="••••••"
          />
          <div className="mt-2 flex items-center justify-between text-xs text-zinc-500">
            <span>KEY: <code className="text-zinc-300">JBSWY3DPEHPK3PXP</code></span>
            <span>{secondsLeft}s restantes</span>
          </div>
        </div>

        {error && <div className="mt-3 text-sm text-red-400">{error}</div>}

        <div className="mt-5 flex items-center justify-end gap-2">
          <button
            type="button"
            className="rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-800"
            onClick={() => {
              // bloquear navegação sem validar: apenas limpa
              setCode('');
              setError(null);
              inputRef.current?.focus();
            }}
          >
            Limpar
          </button>
          <button
            type="button"
            disabled={loading || code.length !== 6}
            onClick={handleValidate}
            className="rounded-xl border border-emerald-400/20 bg-emerald-600 px-4 py-2 text-sm text-white hover:bg-emerald-500 disabled:opacity-50"
          >
            {loading ? 'Validando…' : 'Validar'}
          </button>
        </div>
      </div>
    </div>
  );
};

/** -------- Página de redirecionamento com 2FA -------- */
const DashboardRedirect: React.FC = () => {
  const { userRole } = useAuth();
  const navigate = useNavigate();

  // Estado do modal 2FA
  const [otpOk, setOtpOk] = useState(false);
  const [showOtp, setShowOtp] = useState(true); // abre de imediato

  // Quando validar, fechamos modal e seguimos com o redirect
  useEffect(() => {
    if (!otpOk) return;
    if (userRole === 'gestor') {
      navigate('/prefeitura-dashboard', { replace: true });
    } else if (userRole === 'hospital') {
      navigate('/dashboard', { replace: true });
    } else {
      navigate('/profile', { replace: true });
    }
  }, [otpOk, userRole, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
      {/* Modal 2FA */}
      <OtpModal
        isOpen={showOtp}
        onValidated={() => {
          setOtpOk(true);
          setShowOtp(false);
        }}
        secretB32="JBSWY3DPEHPK3PXP"
      />

      {/* Loading/placeholder por trás do modal */}
      <div className="text-white text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <p>{otpOk ? 'Autenticado. Redirecionando…' : 'Aguardando verificação de duas etapas…'}</p>
      </div>
    </div>
  );
};

export default DashboardRedirect;
