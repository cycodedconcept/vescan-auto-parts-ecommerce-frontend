import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowDownUp, Package, Settings } from "lucide-react";
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

const CategoryGrid = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getNormalizedCategories()
      .then(setCategories)
      .catch(() => {});
  }, []);

  return (
    <section className="container mx-auto px-6 md:px-12 lg:px-24 py-16">
      <h2 className="font-heading text-3xl md:text-4xl font-medium text-heading text-center mb-10 md:mb-12">
        Shop by <br className="md:hidden" /> Categories
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 lg:gap-12">
        {categories.slice(0, 8).map((category) => {
          const imageEntry = CATEGORY_IMAGE_MAP[category.slug];
          const Icon = ICON_MAP[category.icon] ?? Settings;
          return (
            <Link
              key={category.id}
              to={`/shop?category=${category.slug}`}
              className="group flex flex-col items-center gap-4"
            >
              <div className="w-full aspect-[357/309] md:w-[357px] md:h-[309px] bg-[#F3F5F7] rounded-[8px] overflow-hidden flex items-center justify-center transition-transform duration-300 group-hover:shadow-md">
                {imageEntry ? (
                  <img
                    src={imageEntry.src}
                    alt={category.name}
                    className={`w-full h-full ${imageEntry.fit} transition-transform duration-500 group-hover:scale-110`}
                  />
                ) : (
                  <Icon
                    size={80}
                    strokeWidth={1.2}
                    className="text-[#001F3F] transition-transform duration-500 group-hover:scale-110"
                  />
                )}
              </div>
              <span className="font-semibold text-base md:text-xl text-heading text-center capitalize">
                {category.name}
              </span>
            </Link>
          );
        })}

        {/* View More Card */}
        <Link to="/shop" className="group flex flex-col items-center gap-4">
          <div className="w-full aspect-[357/309] md:w-[357px] md:h-[309px] bg-[#001F3F] rounded-[8px] overflow-hidden flex items-center justify-center p-6 transition-transform duration-300 group-hover:shadow-md group-hover:scale-105">
            <span className="font-heading font-medium text-xl md:text-2xl text-white">
              View More +
            </span>
          </div>
          <span className="font-semibold text-base md:text-xl text-transparent select-none">
            View More
          </span>
        </Link>
      </div>
    </section>
  );
};

export default CategoryGrid;
