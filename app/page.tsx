import { Hero } from "@/components/sections/Hero";
import { PropertyTypeLinks } from "@/components/sections/PropertyTypeLinks";
import { FeaturedProperties } from "@/components/sections/FeaturedProperties";
import { ProjectSection } from "@/components/sections/ProjectSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { TravelSection } from "@/components/sections/TravelSection";
import { AgentsSection } from "@/components/sections/AgentsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import {
  getActiveProject,
  getCategories,
  getCities,
  getFeaturedProperties,
  getPropertyStats,
} from "@/lib/properties";

export const revalidate = 300;

export default async function Home() {
  const [featuredProperties, project, stats, categories, cities] = await Promise.all([
    getFeaturedProperties(6),
    getActiveProject(),
    getPropertyStats(),
    getCategories(),
    getCities(),
  ]);

  return (
    <>
      <Hero categories={categories} cities={cities} extraSlide={featuredProperties[0]?.image} />
      <PropertyTypeLinks stats={stats} />
      <FeaturedProperties properties={featuredProperties} />
      {project && <ProjectSection project={project} />}
      <AboutSection />
      <TravelSection />
      <AgentsSection />
      <ContactSection />
    </>
  );
}
