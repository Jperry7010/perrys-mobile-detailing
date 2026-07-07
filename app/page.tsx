import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Services from "@/components/home/Services";
import HowItWorks from "@/components/home/HowItWorks";
import Gallery from "@/components/home/Gallery";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
<Hero />
<WhyChooseUs />
<Services />
<HowItWorks />
<Gallery />
    </main>
  );
}