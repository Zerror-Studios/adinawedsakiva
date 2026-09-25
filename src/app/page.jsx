import Contact from "@/components/home/Contact";
import CountDown from "@/components/home/CountDown";
import Hero from "@/components/home/Hero";
import { createPageMetadata } from "@/lib/seo";

const HomePage = () => {
  return (
    <div className=" relative">
      <img className="cover  fixed z-1  inset-0" src="/images/flowers_bg.svg" alt="" />

      <Hero />
      <div className="relative z-10 bg-[#F3EBE9] ">
        <img className="cover absolute opacity-50  inset-0" src="/images/paper.avif" alt="" />

        <CountDown />
        <Contact />
      </div>
    </div>
  );
};

export default HomePage;

export async function generateMetadata() {
  return createPageMetadata("/");
}
