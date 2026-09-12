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

import CampaignTracking from "@/components/tracking/CampaignTracking";

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#F5F8FA]">

      {/* =====================================================
          GLOBAL CAMPAIGN TRACKING
      ====================================================== */}

      <CampaignTracking />

      {/* =====================================================
          01. HERO
      ====================================================== */}

      <section
        data-source-action="Home Hero"
        data-section="Hero"
      >
        <HeroSlider />
      </section>

      {/* =====================================================
          02. QUICK ACTIONS
      ====================================================== */}

      <section
        data-source-action="Quick Actions"
        data-section="QuickActions"
      >
        <QuickActions />
      </section>

      {/* =====================================================
          03. ABOUT AJFT
      ====================================================== */}

      <section
        data-source-action="Home About"
        data-section="About"
      >
        <AboutSection />
      </section>

      {/* =====================================================
          04. FOCUS AREAS
      ====================================================== */}

      <section
        data-source-action="Focus Areas"
        data-section="FocusAreas"
      >
        <FocusAreas />
      </section>

      {/* =====================================================
          05. IMPACT
      ====================================================== */}

      <section
        data-source-action="Home Impact"
        data-section="Impact"
      >
        <ImpactStats />
      </section>

      {/* =====================================================
          06. FEATURED PROJECTS
      ====================================================== */}

      <section
        data-source-action="Featured Projects"
        data-section="Projects"
      >
        <FeaturedProjects />
      </section>

      {/* =====================================================
          07. SUCCESS STORIES
      ====================================================== */}

      <section
        data-source-action="Success Stories"
        data-section="Stories"
      >
        <SuccessStories />
      </section>

      {/* =====================================================
          08. LATEST NEWS
      ====================================================== */}

      <section
        data-source-action="Latest News"
        data-section="News"
      >
        <LatestNews />
      </section>

      {/* =====================================================
          09. UPCOMING EVENTS
      ====================================================== */}

      <section
        data-source-action="Upcoming Events"
        data-section="Events"
      >
        <UpcomingEvents />
      </section>

      {/* =====================================================
          10. VOLUNTEER
      ====================================================== */}

      <section
        data-source-action="Volunteer"
        data-section="Volunteer"
      >
        <VolunteerCTA />
      </section>

      {/* =====================================================
          11. DONATE
      ====================================================== */}

      <section
        data-source-action="Home Donate"
        data-section="Donate"
      >
        <DonateCTA />
      </section>

      {/* =====================================================
          12. FAQ
      ====================================================== */}

      <section
        data-source-action="Home FAQ"
        data-section="FAQ"
      >
        <FAQSection />
      </section>

    </main>
  );
}