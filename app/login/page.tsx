'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/app/contexts/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const router     = useRouter();
  const params     = useSearchParams();
  const redirect   = params.get('redirect') || '/';

  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  const handleLogin = async () => {
    setError('');
    if (!email || !password) { setError('Email dan password wajib diisi.'); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600)); // simulasi delay
    const result = login(email, password);
    setLoading(false);
    if (result === 'error') { setError('Email atau password salah.'); return; }
    if (result === 'admin') { router.push('/admin'); return; }
    router.push(redirect);
  };

  const fillDummy = (role: 'admin' | 'user') => {
    if (role === 'admin') { setEmail('admin@nusantara.id'); setPassword('admin123'); }
    else                  { setEmail('user@gmail.com');     setPassword('user123'); }
    setError('');
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'linear-gradient(135deg, #F0EBF8 0%, #FFFFFF 60%, #FFF7ED 100%)' }}
    >
      {/* Card */}
      <div
        className="w-full max-w-md rounded-3xl overflow-hidden"
        style={{ boxShadow: '0 24px 80px #2E106318', border: '1.5px solid #2E106510' }}
      >
        {/* Header */}
        <div
          className="px-8 pt-8 pb-6 text-center"
          style={{ background: 'linear-gradient(135deg, #2E1065 0%, #1e0a45 100%)' }}
        >
          <div
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4 font-black text-xl"
            style={{ background: '#FACC15', color: '#2E1065', fontFamily: 'Georgia, serif' }}
          >
            W
          </div>
          <h1
            className="text-2xl font-black mb-1"
            style={{ color: '#FFFFFF', fontFamily: 'Georgia, serif', letterSpacing: '-0.03em' }}
          >
            Masuk ke Akun
          </h1>
          <p className="text-sm" style={{ color: '#ffffff60' }}>WebDemo — Platform Template Website</p>
        </div>

        {/* Form */}
        <div className="px-8 py-8" style={{ background: '#FFFFFF' }}>

          {/* Dummy account pills */}
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#2E106550' }}>
              Akun Demo
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => fillDummy('user')}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold transition-all hover:scale-[1.02]"
                style={{ background: '#F0EBF8', color: '#2E1065', border: '1.5px solid #2E106514' }}
              >
                👤 Login sebagai User
              </button>
              <button
                onClick={() => fillDummy('admin')}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold transition-all hover:scale-[1.02]"
                style={{ background: '#2E1065', color: '#FACC15' }}
              >
                ⚙ Login sebagai Admin
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px" style={{ background: '#2E106510' }} />
            <span className="text-xs" style={{ color: '#2E106540' }}>atau isi manual</span>
            <div className="flex-1 h-px" style={{ background: '#2E106510' }} />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-xs font-black uppercase tracking-widest mb-2" style={{ color: '#2E1065' }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              placeholder="email@contoh.com"
              className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
              style={{ background: '#F8F7FF', border: '1.5px solid #2E106514', color: '#2E1065' }}
              onFocus={(e) => (e.currentTarget.style.borderColor = '#2E106540')}
              onBlur={(e)  => (e.currentTarget.style.borderColor = '#2E106514')}
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-xs font-black uppercase tracking-widest mb-2" style={{ color: '#2E1065' }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
              style={{ background: '#F8F7FF', border: '1.5px solid #2E106514', color: '#2E1065' }}
              onFocus={(e) => (e.currentTarget.style.borderColor = '#2E106540')}
              onBlur={(e)  => (e.currentTarget.style.borderColor = '#2E106514')}
            />
          </div>

          {/* Error */}
          {error && (
            <div
              className="mb-4 px-4 py-3 rounded-xl text-sm font-semibold"
              style={{ background: '#FEF2F2', color: '#DC2626', border: '1px solid #FCA5A5' }}
            >
              ⚠ {error}
            </div>
          )}

          {/* Submit */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-3.5 rounded-xl text-sm font-black transition-all duration-200 hover:scale-[1.02] disabled:opacity-60"
            style={{ background: 'linear-gradient(135deg, #2E1065, #4c1d95)', color: '#FACC15', boxShadow: '0 8px 24px #2E106330' }}
          >
            {loading ? 'Memproses...' : 'Masuk →'}
          </button>

          {/* Hint */}
          <div className="mt-6 p-4 rounded-xl text-xs" style={{ background: '#F8F7FF', color: '#2E106560' }}>
            <p className="font-bold mb-1" style={{ color: '#2E1065' }}>Akun tersedia:</p>
            <p>👤 User → user@gmail.com / user123</p>
            <p>⚙ Admin → admin@nusantara.id / admin123</p>
          </div>
        </div>
      </div>
    </div>
  );
}
