import React from "react";
import Hero from "../components/home/Hero";
import AboutSection from "../components/home/AboutSection";
import { OrgStructure } from "../components/ui/OrgStructure";
import GalleryHighlight from "../components/home/GalleryHighlight";
import BibleVerse from "../components/home/BibleVerse";
import Blogs from "../components/home/Blogs";

export default function Home() {
  return (
    <div className="bg-alabaster min-h-screen">
      <Hero />
      <AboutSection />
      <OrgStructure />
      <GalleryHighlight />
      <BibleVerse />
      <Blogs />
    </div>
  );
}
