import Navbar from "../components/landingpage/Navbar";
import Hero from "../components/landingpage/Hero";
import LogoStrip from "../components/landingpage/LogoStrip";
import Features from "../components/landingpage/Features";
import HowItWorks from "../components/landingpage/HowItWorks";
import UseCases from "../components/landingpage/UseCases";
import Testimonial from "../components/landingpage/Testimonial";
import Pricing from "../components/landingpage/Pricing";
import FAQ from "../components/landingpage/FAQ";
import FinalCTA from "../components/landingpage/FinalCTA";
import Footer from "../components/landingpage/Footer";
import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
 

export default function LandingPage() {


  return (
    <main className="antialiased">
      <Navbar />
      <Hero />
      <LogoStrip />
      <Features />
      <HowItWorks />
      <UseCases />
      <Testimonial />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}


