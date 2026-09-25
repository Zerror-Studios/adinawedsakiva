import Contact from "@/components/home/Contact";
import CountDown from "@/components/home/CountDown";
import Hero from "@/components/home/Hero";
import { createPageMetadata } from "@/lib/seo";
import Image from "next/image";

const HomePage = () => {
  return (
    <div className=" relative bg-[#FAF7F6]">
      <div className="fixed  bg_img opacity-0 w-full z-1  h-screen inset-0">
        <Image fill className="cover" src="/images/flower_bg.png" alt="loading" />
      </div>
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
