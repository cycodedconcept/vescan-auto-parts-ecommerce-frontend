import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowDownUp, Package, Settings } from "lucide-react";
import { getNormalizedCategories } from "../../services/categoryService";
import tyrethumb from "../../assets/tyrethumb.png";
import jackthumb from "../../assets/jack.png";
import breaksthumb from "../../assets/breaks1.jpg";
import accessoriesthumb from "../../assets/car-accessories.jpg";

const ICON_MAP = { ArrowDownUp, Package, Settings };
const CATEGORY_IMAGE_MAP = {
  "tyre":          { src: tyrethumb, fit: "object-contain" },
  "shock-absorber":{ src: "https://res.cloudinary.com/dmymwlqqw/image/upload/v1770634967/10875-removebg-preview_zmh3kd.png", fit: "object-contain" },
  "jack":          { src: jackthumb, fit: "object-contain" },
  "breaks":        { src: breaksthumb, fit: "object-cover" },
  "accessories":   { src: accessoriesthumb, fit: "object-cover" },
};

const CollectionCard = ({ category, className, iconSize }) => {
  const imageEntry = CATEGORY_IMAGE_MAP[category.slug];
  const Icon = ICON_MAP[category.icon] ?? Settings;
  return (
    <div
      className={`relative bg-[#F3F5F7] rounded-lg overflow-hidden group flex flex-col justify-between p-6 md:p-8 ${className}`}
    >
      <div className="flex-1 flex items-center justify-center w-full">
        {imageEntry ? (
          <img
            src={imageEntry.src}
            alt={category.name}
            className={`absolute inset-0 w-full h-full ${imageEntry.fit} transition-transform duration-500 group-hover:scale-110`}
          />
        ) : (
          <Icon
            size={iconSize}
            strokeWidth={1.2}
            className="text-[#001F3F] transition-transform duration-500 group-hover:scale-110"
          />
        )}
      </div>

      <div className="mt-4 md:mt-0 flex flex-col items-start gap-2 z-10">
        <h3 className="font-heading text-2xl md:text-3xl font-medium text-heading capitalize">
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
};

const ShopCollection = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getNormalizedCategories()
      .then(setCategories)
      .catch(() => {});
  }, []);

  if (categories.length < 3) return null;

  const [large, top, bottom] = categories;

  return (
    <section className="container mx-auto px-6 md:px-12 lg:px-28 py-16">
      <h2 className="font-heading text-3xl md:text-4xl font-medium text-heading mb-10 text-left">
        Shop Collection
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 h-auto md:h-[600px]">
        <CollectionCard
          category={large}
          className="h-[400px] md:h-full"
          iconSize={120}
        />

        <div className="flex flex-col gap-4 md:gap-6 h-full">
          <CollectionCard
            category={top}
            className="flex-1 min-h-[280px]"
            iconSize={80}
          />
          <CollectionCard
            category={bottom}
            className="flex-1 min-h-[280px]"
            iconSize={80}
          />
        </div>
      </div>
    </section>
  );
};

export default ShopCollection;
