import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { alertSuccess } from "../../utils/alert";

const ProductCard = ({ product }) => {
  const { addToCart, openFlyout } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
    openFlyout();
    alertSuccess("Added to cart!");
  };

  return (
    <div className="group relative flex flex-col gap-3 min-w-[260px] md:min-w-[280px]">
      {/* Image Container */}
      <Link
        to={`/product/${product.id}`}
        className="relative w-full aspect-square bg-[#F3F5F7] rounded-lg overflow-hidden flex items-center justify-center p-4"
      >
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
          {product.badges.map((badge, index) => (
            <span
              key={index}
              className={`font-sans text-[16px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider ${
                badge === "HOT"
                  ? "bg-white text-heading"
                  : "bg-[#00C2FF] text-white"
              }`}
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
        />

        {/* Hover Action - Add to Cart */}
        <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
          <button
            onClick={handleAddToCart}
            className="w-full bg-heading text-white font-sans font-medium py-3 rounded-md hover:bg-black transition-colors shadow-lg"
          >
            Add To Cart
          </button>
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col gap-1">
        {/* Rating */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={12}
              className={`${
                i < product.rating
                  ? "fill-[#F59E0B] text-[#F59E0B]"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Title */}
        <Link
          to={`/product/${product.id}`}
          className=" text-sm md:text-base font-semibold text-heading hover:text-gray-600 line-clamp-2 min-h-[44px]"
        >
          {product.name}
        </Link>

        {/* Price */}
        <div className="flex items-center gap-2 mt-1">
          <span className="font-sans font-bold text-sm text-heading">
            ₦{product.price.toLocaleString()}
          </span>
          {product.originalPrice > product.price && (
            <span className="font-sans text-xs text-gray-400 line-through">
              ₦{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
