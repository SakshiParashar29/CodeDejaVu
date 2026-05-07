import React from "react";

import Navbar from "../components/landing/Navbar";
import HeroSection from "../components/landing/HeroSection";
import FeaturesSection from "../components/landing/FeaturesSection";
import MemesSection from "../components/landing/MemesSection";
import Footer from "../components/shared/Footer";

const Landing = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">

      {/* Navbar (sticky optional) */}
      <Navbar />

      {/* Hero Section */}
      <section id="hero">
        <HeroSection />
      </section>

      {/* Features Section */}
      <section id="features">
        <FeaturesSection />
      </section>

      {/* Memes Section */}
      <section id="memes" className="py-10 ">
        <MemesSection />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Landing;