import LandingNavbar from "@/components/LandingNavbar";
import LandingHero from "@/components/LandingHero";
import LandingContent from "@/components/LandingContent";
import Benefits from "@/components/Benefits";

export default function Home() {
  return (
    <div className="h-full">
      <LandingNavbar />
      <LandingHero />
      <LandingContent />
      <Benefits />
    </div>
  );
}
