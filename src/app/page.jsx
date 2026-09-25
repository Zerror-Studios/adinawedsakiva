import Home from "@/components/home/Home";
import { createPageMetadata } from "@/lib/seo";

const HomePage = () => {
  return (
    <Home />
  );
};

export default HomePage;

export async function generateMetadata() {
  return createPageMetadata("/");
}
