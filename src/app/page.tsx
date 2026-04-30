import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import FeaturedProjects from "@/components/FeaturedProjects";
import OtherProjects from "@/components/OtherProjects";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <FeaturedProjects />
        <OtherProjects />
        <Contact />
      </main>
    </>
  );
}
