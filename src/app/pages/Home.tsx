import React from "react";
import Hero from "../components/home/Hero";
import AboutSection from "../components/home/AboutSection";
import GalleryHighlight from "../components/home/GalleryHighlight";
import { ServiceTimesAndGiving } from "../components/home/ServiceTimesAndGiving";
import BibleVerse from "../components/home/BibleVerse";
import Blogs from "../components/home/Blogs";

export default function Home() {
  return (
    <div className="bg-alabaster min-h-screen w-full">
      <Hero />
      <AboutSection />
      <GalleryHighlight />
      <ServiceTimesAndGiving />
      <BibleVerse />
      <Blogs />
    </div>
  );
}
