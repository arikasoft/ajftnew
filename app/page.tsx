import HeroSlider from "@/components/home/HeroSlider";
import QuickActions from "@/components/home/QuickActions";
import AboutSection from "@/components/home/AboutSection";
import FocusAreas from "@/components/home/FocusAreas";
import ImpactStats from "@/components/home/ImpactStats";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import SuccessStories from "@/components/home/SuccessStories";
import LatestNews from "@/components/home/LatestNews";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import VolunteerCTA from "@/components/home/VolunteerCTA";
import DonateCTA from "@/components/home/DonateCTA";
import FAQSection from "@/components/home/FAQSection";

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#F5F8FA]">

      {/* =====================================================
          01. HERO
      ====================================================== */}

      <HeroSlider />

      {/* =====================================================
          02. QUICK ACTIONS
      ====================================================== */}

      <QuickActions />

      {/* =====================================================
          03. ABOUT AJFT
      ====================================================== */}

      <AboutSection />

      {/* =====================================================
          04. FOCUS AREAS
      ====================================================== */}

      <FocusAreas />

      {/* =====================================================
          05. IMPACT
      ====================================================== */}

      <ImpactStats />

      {/* =====================================================
          06. FEATURED PROJECTS
      ====================================================== */}

      <FeaturedProjects />

      {/* =====================================================
          07. SUCCESS STORIES
      ====================================================== */}

      <SuccessStories />

      {/* =====================================================
          08. LATEST NEWS
      ====================================================== */}

      <LatestNews />

      {/* =====================================================
          09. UPCOMING EVENTS
      ====================================================== */}

      <UpcomingEvents />

      {/* =====================================================
          10. VOLUNTEER
      ====================================================== */}

      <VolunteerCTA />

      {/* =====================================================
          11. DONATE
      ====================================================== */}

      <DonateCTA />

      {/* =====================================================
          12. FAQ
      ====================================================== */}

      <FAQSection />

    </main>
  );
}