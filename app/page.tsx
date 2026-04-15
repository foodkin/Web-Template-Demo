import Hero from "@/components/layout/Hero";
import Populer from "@/components/layout/Populer";
import ServiceGrid from "@/components/layout/ServiceGrid";
import WhyUs from "@/components/layout/WhyUs";
import Testimonials from "@/components/layout/Testimonials";
import CTA from "@/components/layout/CTA";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Populer />
      <ServiceGrid />
      <WhyUs />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}
