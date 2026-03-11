import Hero from "@/components/layout/Hero";
import Populer from "@/components/layout/Populer";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Populer />
      <Footer />
    </div>
  );
}
