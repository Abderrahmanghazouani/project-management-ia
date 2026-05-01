import Navbar from "./components/Navbar";
import HeroCTA from "./components/HeroCTA";
import HeroSection from "./components/HeroSection";
import RolesSection from "./components/RolesSection";
import FeaturesSection from "./components/FeaturesSection";
import ModulesShowcase from "./components/ModulesShowcases";
import AIProcessSection from "./components/AIProcessSection";
import TechStackSection from "./components/TechStackSection";
import TestimonialsSection from "./components/TestimonialsSection";
import { Footer } from "./components/CTAAndFooter";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroCTA />
      <HeroSection />
      <RolesSection />
      <FeaturesSection />
      <AIProcessSection />
      <ModulesShowcase />
      <TechStackSection />
      <TestimonialsSection />
      <Footer />
    </main>
  );
}