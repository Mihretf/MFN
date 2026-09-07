import React from "react";
import Hero from "../components/home/Hero";
import AboutSection from "../components/home/AboutSection";
import GalleryHighlight from "../components/home/GalleryHighlight";
import BibleVerse from "../components/home/BibleVerse";
import Blogs from "../components/home/Blogs";

// OrgStructure removed from Home — it now lives exclusively on the About page.
// GalleryHighlight photos now navigate directly to /gallery on click.

export default function Home() {
  return (
    <div className="bg-alabaster min-h-screen w-full">
      <Hero />
      <AboutSection />
      <GalleryHighlight />
      <BibleVerse />
      <Blogs />
    </div>
  );
}
