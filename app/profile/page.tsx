import ProfileHeader from './Section/ProfileHeader';
import DomainSection from './Section/DomainSection';
import PaketSection from './Section/PaketSection';
import TemplateSection from './Section/TemplateSection';
import Footer from '@/components/layout/Footer';

export default function ProfilePage() {
  return (
    <main
      className="min-h-screen relative"
      style={{ background: '#FFFFFF' }}
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #2E106512 1.2px, transparent 1.2px)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Purple top band */}
      <div className="absolute top-0 left-0 right-0 h-48 pointer-events-none" style={{ background: 'linear-gradient(to bottom, #2E106508, transparent)' }} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 py-10 flex flex-col gap-6">

        {/* Page title */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1 h-8 rounded-full" style={{ background: '#FACC15' }} />
          <h1
            className="font-black"
            style={{
              fontSize: 'clamp(22px, 3vw, 32px)',
              color: '#2E1065',
              fontFamily: "'Georgia', serif",
              letterSpacing: '-0.03em',
            }}
          >
            Profil Saya
          </h1>
        </div>

        {/* Sections */}
        <ProfileHeader />
        <PaketSection />
        <DomainSection />
        <TemplateSection />
      </div>
      <Footer />
    </main>
  );
}
