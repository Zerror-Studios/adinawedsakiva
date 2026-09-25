import Contact from "@/components/home/Contact";
import CountDown from "@/components/home/CountDown";
import Hero from "@/components/home/Hero";
import { createPageMetadata } from "@/lib/seo";

const HomePage = () => {
  return (
    <div className=" relative">
      <img className="cover  fixed z-1  inset-0" src="/images/flowers_bg.svg" alt="" />
      <Hero />
      <CountDown />
      <Contact />
    </div>
  );
};

export default HomePage;

export async function generateMetadata() {
  return createPageMetadata("/");
}
