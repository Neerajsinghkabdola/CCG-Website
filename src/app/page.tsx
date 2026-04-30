import Navbar from "@/components/Navbar";
import ScrollSequence from "@/components/ScrollSequence";
import ExpertiseSection from "@/components/ExpertiseSection";
import MarqueeSection from "@/components/MarqueeSection";
import FooterSection from "@/components/FooterSection";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <ScrollSequence />
      <ExpertiseSection />
      <MarqueeSection />
      <FooterSection />
    </main>
  );
}
