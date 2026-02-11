import Hero from "../components/home/Hero";
import FeaturedProducts from "../components/home/FeaturedProducts";
import CategoryGrid from "../components/home/CategoryGrid";
import Values from "../components/home/Values";
import LimitedEdition from "../components/home/LimitedEdition";
import ShopCollection from "../components/home/ShopCollection";
import Articles from "../components/home/Articles";
const Home = () => {
  return (
    <div className="w-full">
      <Hero />
      <FeaturedProducts />
      <CategoryGrid />
      <Values />
      <LimitedEdition />
      <ShopCollection />
      <Articles />
    </div>
  );
};

export default Home;
