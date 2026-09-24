import About from "@/components/home/About";
import Contact from "@/components/home/Contact";
import CountDown from "@/components/home/CountDown";
import Hero from "@/components/home/Hero";
import { createPageMetadata } from "@/lib/seo";

const HomePage = () => {
  return (
 <>
 <Hero/>
 <About/>
 <CountDown/>
 <Contact/>
 </>
  );
};

export default HomePage;

export async function generateMetadata() {
  return createPageMetadata("/");
}
