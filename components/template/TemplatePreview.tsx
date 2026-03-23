'use client';

import type { Template } from '@/data/templates';

function TemplateThumbnailLarge({ t }: { t: Template }) {
    return (
        <div
            className="w-full h-full flex flex-col p-8"
            style={{ background: t.headerBg }}
        >
            {/* Search bar */}
            <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-300" />
                <div className="w-3 h-3 rounded-full bg-yellow-300" />
                <div className="w-3 h-3 rounded-full bg-green-300" />
                <div
                    className="ml-3 flex-1 h-4 rounded-full"
                    style={{ background: `${t.headerAccent}20` }}
                />
            </div>

            {/* Hero */}
            <div className="flex flex-col gap-3 flex-1 justify-center">
                <div style={{ width: '70%', height: '16px', background: t.headerAccent, borderRadius: '6px' }} />
                <div style={{ width: '50%', height: '10px', background: `${t.headerAccent}40`, borderRadius: '4px' }} />
                <div style={{ width: '100%', height: '80px', background: `${t.headerAccent}0D`, borderRadius: '12px', marginTop: '8px' }} />
                <div className="flex gap-3 mt-2">
                    <div style={{ width: '100px', height: '36px', background: t.headerAccent, borderRadius: '8px' }} />
                    <div style={{ width: '80px', height: '36px', background: `${t.headerAccent}20`, borderRadius: '8px' }} />
                </div>
                {/* Footer */}
                <div className="flex gap-2 mt-4">
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            style={{
                                flex: 1,
                                height: '60px',
                                background: `${t.headerAccent}${i === 1 ? '15' : '08'}`,
                                borderRadius: '10px',
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

interface TemplatePreviewProps {
    template: Template;
    className?: string;
}

export default function TemplatePreview({ template: t, className = '' }: TemplatePreviewProps) {
    return (
        <div
            className={`relative rounded-2xl overflow-hidden ${className}`}
            style={{
                boxShadow: '0 20px 64px #2E106525',
                border: '2px solid #2E106512',
            }}
        >
            {/* Browser bar with color */}
            <div
                className="h-1 w-full"
                style={{ background: `linear-gradient(90deg, ${t.headerAccent}, ${t.headerAccent}50)` }}
            />
            <TemplateThumbnailLarge t={t} />
        </div>
    );
}
