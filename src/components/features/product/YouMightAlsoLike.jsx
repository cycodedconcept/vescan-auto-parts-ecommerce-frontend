import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Star, Heart, ArrowRight } from "lucide-react";
import { products } from "../../../data/products";

const RecommendationCard = ({ product }) => (
  <Link
    to={`/product/${product.id}`}
    className="group flex-shrink-0 w-[260px] md:w-[280px] flex flex-col gap-3"
  >
    {/* Image Container */}
    <div className="relative w-full aspect-square bg-[#F3F5F7] rounded-lg overflow-hidden flex items-center justify-center p-4">
      {/* Badges — Top Left */}
      <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
        {product.isNew && (
          <span className="bg-white text-heading font-sans text-sm font-bold px-3 py-1 rounded-sm">
            NEW
          </span>
        )}
        {product.badges
          .filter((b) => b !== "HOT")
          .map((badge, index) => (
            <span
              key={index}
              className="bg-[#00C2FF] text-white font-sans text-sm font-bold px-3 py-1 rounded-sm"
            >
              {badge}
            </span>
          ))}
      </div>

      {/* Heart Icon — Top Right */}
      <button
        onClick={(e) => e.preventDefault()}
        className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow z-10"
      >
        <Heart size={16} className="text-body" />
      </button>

      {/* Product Image */}
      <img
        src={product.image}
        alt={product.category}
        className="w-full h-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
      />
    </div>

    {/* Stars */}
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={14}
          className={`${
            i < product.rating
              ? "fill-[#F59E0B] text-[#F59E0B]"
              : "text-gray-300"
          }`}
        />
      ))}
    </div>

    {/* Category Name */}
    <h3 className="font-sans text-base font-medium text-heading">
      {product.category}
    </h3>

    {/* Price */}
    <div className="flex items-baseline gap-2">
      <span className="font-sans font-bold text-heading">
        ${product.price.toFixed(2)}
      </span>
      {product.originalPrice > product.price && (
        <span className="font-sans text-sm text-gray-400 line-through">
          ${product.originalPrice.toFixed(2)}
        </span>
      )}
    </div>
  </Link>
);

const YouMightAlsoLike = ({ currentProductId }) => {
  const scrollRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const recommended = products.filter((p) => p.id !== currentProductId);

  const handleScroll = () => {
    const container = scrollRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      const maxScroll = scrollWidth - clientWidth;
      const progress = maxScroll > 0 ? scrollLeft / maxScroll : 0;
      setScrollProgress(progress);
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      const rafId = requestAnimationFrame(() => {
        const { scrollLeft, scrollWidth, clientWidth } = container;
        const maxScroll = scrollWidth - clientWidth;
        setScrollProgress(maxScroll > 0 ? scrollLeft / maxScroll : 0);
      });
      return () => {
        container.removeEventListener("scroll", handleScroll);
        cancelAnimationFrame(rafId);
      };
    }
  }, []);

  // Progress bar width: min 20%, max 100%
  const barWidth = 20 + scrollProgress * 80;

  return (
    <section className="py-8 md:py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-heading text-2xl md:text-3xl font-medium text-heading">
          You Might Also Like
        </h2>

        {/* Desktop: More Products link */}
        <Link
          to="/shop"
          className="hidden md:flex items-center gap-2 text-sm font-medium text-heading border-b border-heading pb-0.5 hover:opacity-70 transition-opacity"
        >
          More Products <ArrowRight size={16} />
        </Link>
      </div>

      {/* Scrollable Cards */}
      <div
        ref={scrollRef}
        className="flex gap-4 md:gap-6 overflow-x-auto pb-6"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {recommended.map((product) => (
          <RecommendationCard key={product.id} product={product} />
        ))}
      </div>

      {/* Hide webkit scrollbar */}
      <style>{`
        div[class*="overflow-x-auto"]::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Scroll Progress Bar */}
      <div className="w-full h-[3px] bg-gray-200 rounded-full mb-6">
        <div
          className="h-full bg-heading rounded-full transition-all duration-150"
          style={{ width: `${barWidth}%` }}
        />
      </div>

      {/* Mobile: More Products link — Below scroll bar */}
      <Link
        to="/shop"
        className="md:hidden flex items-center gap-2 text-sm font-medium text-heading border-b border-heading pb-0.5 hover:opacity-70 transition-opacity w-fit"
      >
        More Products <ArrowRight size={16} />
      </Link>
    </section>
  );
};

export default YouMightAlsoLike;
