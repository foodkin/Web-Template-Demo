import Hero from "@/components/layout/Hero";
import Populer from "@/components/layout/Populer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Populer />
    </div>
  );
}