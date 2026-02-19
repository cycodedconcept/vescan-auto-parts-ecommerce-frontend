import { useRef, useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import ProductCard from "../common/ProductCard";
import { products } from "../../data/products";

const FeaturedProducts = () => {
  const scrollContainerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Calculate number of dots based on items (assuming 4 items per view, or just fixed 5 for now as per design)
  const totalDots = 5;

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollLeft = container.scrollLeft;
      const width = container.offsetWidth;
      // Simple calculation to determine "page"
      const newIndex = Math.round(scrollLeft / (width / 2)); // improved sensitivity
      // Clamp index
      const clampedIndex = Math.min(Math.max(newIndex, 0), totalDots - 1);
      setActiveIndex(clampedIndex);
    }
  };

  const scrollToDot = (index) => {
    const container = scrollContainerRef.current;
    if (container) {
      const width = container.offsetWidth;
      const scrollAmount = index * (width / 2); // simplistic scroll mapping
      container.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <section className="container mx-auto px-6 md:px-12 lg:px-28 py-16">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <h2 className="font-heading text-3xl md:text-4xl font-medium text-heading">
            Featured
          </h2>
          <div className="relative">
            <select className="appearance-none border border-[#001F3F] rounded px-3 py-2 pr-6 w-[85px] font-sans font-bold text-sm text-[#001F3F] bg-white focus:outline-none cursor-pointer truncate">
              <option value="new">New</option>
              <option value="popular">Popular</option>
              <option value="best-selling">Best Selling</option>
            </select>
            <ChevronDown
              size={14}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-[#001F3F] pointer-events-none"
            />
          </div>
        </div>

        {/* Custom Navigation Dots - Radio Style */}
        <div className="flex items-center gap-2">
          {[...Array(totalDots)].map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToDot(index)}
              className="group focus:outline-none"
              aria-label={`Go to slide ${index + 1}`}
            >
              {activeIndex === index ? (
                // Active Dot: Ring + Inner Circle
                <div className="w-5 h-5 rounded-full border border-heading flex items-center justify-center transition-all duration-300">
                  <div className="w-2.5 h-2.5 bg-heading rounded-full" />
                </div>
              ) : (
                // Inactive Dot: Grey Circle
                <div className="w-5 h-5 flex items-center justify-center">
                  <div className="w-2 h-2 bg-gray-300 rounded-full group-hover:bg-gray-400 transition-colors" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Products Carousel / Horizontal Scroll */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {products.map((product) => (
          <div key={product.id} className="snap-start">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* CSS to hide scrollbar for Webkit browsers */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default FeaturedProducts;
