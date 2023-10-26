import LandingNavbar from "@/components/LandingNavbar";
import LandingHero from "@/components/LandingHero";
import LandingContent from "@/components/LandingContent";

export default function Home() {
  return (
    <div className="h-full bg-[#131725]">
      <LandingNavbar />
      <LandingHero />
      <LandingContent />
    </div>
  );
}
