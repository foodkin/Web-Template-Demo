'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Template } from '@/data/templates';

function TemplateThumbnail({ t }: { t: Template }) {
    return (
        <div
            className="w-full h-full flex flex-col p-5"
            style={{ background: t.headerBg }}
        >
            {/* Browser bar */}
            <div className="flex items-center gap-1.5 mb-4">
                <div className="w-2 h-2 rounded-full bg-red-300" />
                <div className="w-2 h-2 rounded-full bg-yellow-300" />
                <div className="w-2 h-2 rounded-full bg-green-300" />
                <div
                    className="ml-2 flex-1 h-3 rounded-full"
                    style={{ background: `${t.headerAccent}25` }}
                />
            </div>
            {/* Page content blocks */}
            <div className="flex flex-col gap-2.5 flex-1 justify-center">
                {t.thumb.map((b, i) => (
                    <div
                        key={i}
                        style={{ width: b.w, height: b.h, background: b.bg, borderRadius: b.br }}
                    />
                ))}
            </div>
        </div>
    );
}

interface TemplateCardProps {
    template: Template;
}

export default function TemplateCard({ template: t }: TemplateCardProps) {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            className="relative rounded-2xl overflow-hidden cursor-pointer group"
            style={{
                aspectRatio: '4/3',
                boxShadow: hovered
                    ? '0 20px 60px #2E106525'
                    : '0 4px 20px #2E106510',
                transform: hovered ? 'translateY(-6px)' : 'none',
                transition: 'all 0.3s ease',
                border: hovered ? '2px solid #FACC15' : '2px solid transparent',
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Full thumbnail */}
            <div className="absolute inset-0">
                <TemplateThumbnail t={t} />
            </div>

            {/* Badge top-left */}
            <div
                className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider z-10"
                style={{
                    background: '#FACC15',
                    color: '#2E1065',
                }}
            >
                {t.badge}
            </div>

            {/* Pages top-right */}
            <div
                className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold z-10"
                style={{ background: '#2E106520', color: '#2E1065', backdropFilter: 'blur(4px)' }}
            >
                {t.pages} hal
            </div>

            {/* Bottom overlay */}
            <div
                className="absolute inset-0 flex flex-col justify-end z-10"
                style={{
                    background: hovered
                        ? 'linear-gradient(to top, #2E1065EE 40%, #2E106560 70%, transparent 100%)'
                        : 'linear-gradient(to top, #2E1065CC 30%, #2E106530 60%, transparent 100%)',
                    transition: 'background 0.3s ease',
                }}
            >
                <div className="p-5">
                    {/* Category */}
                    <div
                        className="text-[10px] font-bold uppercase tracking-widest mb-1"
                        style={{ color: '#FACC1590' }}
                    >
                        {t.category}
                    </div>

                    {/* Title */}
                    <h3
                        className="font-black text-base leading-tight mb-1"
                        style={{ color: '#FFFFFF', fontFamily: "'Georgia', serif" }}
                    >
                        {t.title}
                    </h3>

                    {/* Desc — hover */}
                    <p
                        className="text-xs leading-relaxed mb-4 transition-all duration-300"
                        style={{
                            color: '#ffffff80',
                            maxHeight: hovered ? '40px' : '0px',
                            opacity: hovered ? 1 : 0,
                            overflow: 'hidden',
                        }}
                    >
                        {t.desc}
                    </p>

                    {/* Actions */}
                    <div
                        className="flex items-center gap-2 transition-all duration-300"
                        style={{
                            opacity: hovered ? 1 : 0,
                            transform: hovered ? 'translateY(0)' : 'translateY(8px)',
                        }}
                    >
                        <Link
                            href={`/templates/${t.id}`}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 hover:scale-105"
                            style={{ background: '#FFFFFF', color: '#2E1065' }}
                        >
                            👁 Lihat
                        </Link>
                        <button
                            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 hover:scale-105"
                            style={{ background: '#FACC15', color: '#2E1065' }}
                        >
                            ✓ Pilih Ini
                        </button>
                        <span
                            className="ml-auto text-xs font-black"
                            style={{ color: '#FACC15' }}
                        >
                            Rp{t.price}rb
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
