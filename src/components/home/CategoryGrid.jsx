import { Link } from "react-router-dom";
import { categories } from "../../data/categories";

const CategoryGrid = () => {
  return (
    <section className="container mx-auto px-6 md:px-12 lg:px-24 py-16">
      {/* Heading */}
      <h2 className="font-heading text-3xl md:text-4xl font-medium text-heading text-center mb-10 md:mb-12">
        Shop by <br className="md:hidden" /> Categories
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 lg:gap-12">
        {categories.slice(0, 8).map((category) => (
          <Link
            key={category.id}
            to={`/shop?category=${category.slug}`}
            className="group flex flex-col items-center gap-4"
          >
            {/* Image Container */}
            <div className="w-full aspect-[357/309] md:w-[357px] md:h-[309px] bg-[#F3F5F7] rounded-[8px] overflow-hidden flex items-center justify-center p-6 md:p-10 transition-transform duration-300 group-hover:shadow-md">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            {/* Label */}
            <span className="font-semibold text-base md:text-xl text-heading text-center">
              {category.name}
            </span>
          </Link>
        ))}

        {/* View More Card */}
        <Link to="/shop" className="group flex flex-col items-center gap-4">
          <div className="w-full aspect-[357/309] md:w-[357px] md:h-[309px] bg-[#001F3F] rounded-[8px] overflow-hidden flex items-center justify-center p-6 transition-transform duration-300 group-hover:shadow-md group-hover:scale-105">
            <span className="font-heading font-medium text-xl md:text-2xl text-white">
              View More +
            </span>
          </div>
          {/* Empty Label Spacer to maintain grid alignment if needed, or just omit */}
          <span className="font-semibold text-base md:text-xl text-transparent select-none">
            View More
          </span>
        </Link>
      </div>
    </section>
  );
};

export default CategoryGrid;
