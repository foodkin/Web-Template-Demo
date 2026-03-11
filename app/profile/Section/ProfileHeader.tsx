'use client';

import { useState } from 'react';

export default function ProfileHeader() {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: 'Budi Santoso',
    email: 'budi@example.com',
    phone: '08123456789',
    city: 'Jakarta',
    bio: 'Pemilik UMKM — senang membangun bisnis digital.',
  });
  const [draft, setDraft] = useState(form);

  const handleSave = () => {
    setForm(draft);
    setEditing(false);
  };

  return (
    <div
      className="relative rounded-2xl overflow-hidden"
      style={{ background: '#2E1065', boxShadow: '0 8px 40px #2E106525' }}
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #ffffff08 1.2px, transparent 1.2px)`,
          backgroundSize: '28px 28px',
        }}
      />
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: 'linear-gradient(90deg, #FACC15, #ffffff20)' }} />

      <div className="relative z-10 p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">

          {/* Avatar */}
          <div className="relative shrink-0">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-black"
              style={{ background: '#FACC15', color: '#2E1065' }}
            >
              {form.name.charAt(0)}
            </div>
            <div
              className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 flex items-center justify-center text-[8px]"
              style={{ background: '#FACC15', borderColor: '#2E1065', color: '#2E1065' }}
            >
              ✓
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            {!editing ? (
              <>
                <div className="flex items-center gap-3 flex-wrap">
                  <h2
                    className="font-black text-xl"
                    style={{ color: '#FFFFFF', fontFamily: "'Georgia', serif", letterSpacing: '-0.02em' }}
                  >
                    {form.name}
                  </h2>
                  <span
                    className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                    style={{ background: '#FACC1520', color: '#FACC15', border: '1px solid #FACC1530' }}
                  >
                    Member Aktif
                  </span>
                </div>
                <p className="text-sm mt-1" style={{ color: '#ffffff60' }}>{form.bio}</p>
                <div className="flex flex-wrap gap-4 mt-3">
                  {[
                    { icon: '✉', val: form.email },
                    { icon: '📱', val: form.phone },
                    { icon: '📍', val: form.city },
                  ].map((item) => (
                    <span key={item.val} className="flex items-center gap-1.5 text-xs" style={{ color: '#ffffff50' }}>
                      <span>{item.icon}</span>
                      {item.val}
                    </span>
                  ))}
                </div>
              </>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                {[
                  { label: 'Nama Lengkap', key: 'name', type: 'text' },
                  { label: 'Email', key: 'email', type: 'email' },
                  { label: 'No. Telepon', key: 'phone', type: 'tel' },
                  { label: 'Kota', key: 'city', type: 'text' },
                ].map(({ label, key, type }) => (
                  <div key={key}>
                    <label className="block text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: '#FACC1580' }}>
                      {label}
                    </label>
                    <input
                      type={type}
                      value={draft[key as keyof typeof draft]}
                      onChange={(e) => setDraft({ ...draft, [key]: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                      style={{ background: '#ffffff10', border: '1px solid #ffffff20', color: '#fff' }}
                    />
                  </div>
                ))}
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: '#FACC1580' }}>Bio</label>
                  <input
                    type="text"
                    value={draft.bio}
                    onChange={(e) => setDraft({ ...draft, bio: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                    style={{ background: '#ffffff10', border: '1px solid #ffffff20', color: '#fff' }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2 shrink-0">
            {!editing ? (
              <button
                onClick={() => { setDraft(form); setEditing(true); }}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 hover:scale-105"
                style={{ background: '#FACC15', color: '#2E1065' }}
              >
                ✏️ Edit Profil
              </button>
            ) : (
              <>
                <button
                  onClick={() => setEditing(false)}
                  className="px-4 py-2 rounded-full text-xs font-bold"
                  style={{ background: '#ffffff15', color: '#ffffff80' }}
                >
                  Batal
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 rounded-full text-xs font-bold hover:opacity-90"
                  style={{ background: '#FACC15', color: '#2E1065' }}
                >
                  Simpan
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}