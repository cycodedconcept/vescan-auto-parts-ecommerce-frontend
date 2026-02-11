import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { categories } from "../../data/categories";

const CollectionCard = ({ category, className, imageClassName }) => (
  <div
    className={`relative bg-[#F3F5F7] rounded-lg overflow-hidden group flex flex-col justify-between p-6 md:p-8 ${className}`}
  >
    {/* Image Centered */}
    <div className="flex-1 flex items-center justify-center w-full">
      <img
        src={category.image}
        alt={category.name}
        className={`object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110 ${imageClassName}`}
      />
    </div>

    {/* Content Bottom Left */}
    <div className="mt-4 md:mt-0 flex flex-col items-start gap-2 z-10">
      <h3 className="font-heading text-2xl md:text-3xl font-medium text-heading">
        {category.name}
      </h3>
      <Link
        to={`/shop?category=${category.slug}`}
        className="flex items-center gap-2 text-sm font-medium text-heading border-b border-heading pb-0.5 hover:opacity-70 transition-opacity"
      >
        Collections <ArrowRight size={16} />
      </Link>
    </div>
  </div>
);

const ShopCollection = () => {
  // Helper to find category by name/slug logic
  const clutchKits =
    categories.find((c) => c.name === "Spark Plugs") || categories[0];
  const brakePads =
    categories.find((c) => c.name === "Oil Filters") || categories[1];
  const sparkPlugs =
    categories.find((c) => c.name === "Wheel Bearings") || categories[2];

  return (
    <section className="container mx-auto px-6 md:px-12 lg:px-28 py-16">
      <h2 className="font-heading text-3xl md:text-4xl font-medium text-heading mb-10 text-left">
        Shop Collection
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 h-auto md:h-[600px]">
        {/* Left Col - Large Card */}
        <CollectionCard
          category={clutchKits}
          className="h-[400px] md:h-full"
          imageClassName="w-3/4 max-h-[300px]"
        />

        {/* Right Col - Stacked Cards */}
        <div className="flex flex-col gap-4 md:gap-6 h-full">
          <CollectionCard
            category={brakePads}
            className="flex-1 min-h-[280px]"
            imageClassName="w-1/2 max-h-[150px]"
          />
          <CollectionCard
            category={sparkPlugs}
            className="flex-1 min-h-[280px]"
            imageClassName="w-1/2 max-h-[150px]"
          />
        </div>
      </div>
    </section>
  );
};

export default ShopCollection;
