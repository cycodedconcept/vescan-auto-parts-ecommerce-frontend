import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  Heart,
  Minus,
  Plus,
} from "lucide-react";
import { products } from "../data/products";
import CustomerReviews from "../components/features/product/CustomerReviews";
import YouMightAlsoLike from "../components/features/product/YouMightAlsoLike";
import { useCart } from "../context/CartContext";

const TimerBox = ({ value, label }) => (
  <div className="flex flex-col items-center">
    <div className="w-14 h-14 md:w-16 md:h-16 bg-[#F3F5F7] flex items-center justify-center">
      <span className="font-heading text-2xl md:text-3xl font-bold text-[#141718]">
        {String(value).padStart(2, "0")}
      </span>
    </div>
    <span className="text-[10px] md:text-xs text-body mt-1">{label}</span>
  </div>
);

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart, openFlyout } = useCart();
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 12,
    minutes: 45,
    seconds: 5,
  });

  // Scroll to top when product changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0)
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0)
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0)
          return {
            ...prev,
            days: prev.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Handle product not found
  if (!product) {
    return (
      <div className="container mx-auto px-6 md:px-12 lg:px-28 py-20 text-center">
        <h1 className="font-heading text-3xl text-heading mb-4">
          Product Not Found
        </h1>
        <p className="text-body mb-8">
          The product you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="inline-block bg-heading text-white font-sans font-bold px-8 py-3 rounded-lg hover:bg-black/90 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  const gallery = product.gallery || [product.image];
  const colors = product.colors || [];

  const handlePrevImage = () => {
    setSelectedImage((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setSelectedImage((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="container mx-auto px-4 md:px-12 lg:px-28 py-6 md:py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-body mb-6 md:mb-10 flex-wrap">
        <Link to="/" className="hover:text-heading transition-colors">
          Home
        </Link>
        <span className="text-gray-400">›</span>
        <Link to="/shop" className="hover:text-heading transition-colors">
          Shop
        </Link>
        <span className="text-gray-400">›</span>
        <span className="hover:text-heading transition-colors">
          {product.category}
        </span>
        <span className="text-gray-400">›</span>
        <span className="text-heading font-medium">Product</span>
      </nav>

      {/* Main Content: 2-col desktop, stacked mobile */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
        {/* LEFT: Image Gallery */}
        <div className="w-full lg:w-1/2">
          {/* Main Image */}
          <div className="relative bg-[#F3F5F7] rounded-lg overflow-hidden aspect-square flex items-center justify-center p-8 md:p-12 mb-4">
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
              <span className="bg-white text-heading font-sans text-sm font-bold px-3 py-1 rounded-sm">
                NEW
              </span>
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

            {/* Navigation Arrows */}
            <button
              onClick={handlePrevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors z-10"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors z-10"
            >
              <ChevronRight size={18} />
            </button>

            <img
              src={gallery[selectedImage]}
              alt={product.name}
              className="w-full h-full object-contain mix-blend-multiply"
            />
          </div>

          {/* Thumbnail Strip — Desktop Only */}
          <div className="hidden md:flex gap-3">
            {gallery.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-[120px] h-[100px] bg-[#F3F5F7] rounded-md overflow-hidden p-3 border-2 transition-colors ${
                  selectedImage === index
                    ? "border-heading"
                    : "border-transparent hover:border-gray-300"
                }`}
              >
                <img
                  src={img}
                  alt={`${product.name} view ${index + 1}`}
                  className="w-full h-full object-contain mix-blend-multiply"
                />
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT: Product Info */}
        <div className="w-full lg:w-1/2">
          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={`${
                    i < product.rating
                      ? "fill-[#F86624] text-[#F86624]"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-[#030206]">
              {product.reviews} Reviews
            </span>
          </div>

          {/* Title */}
          <h1 className="font-heading text-3xl md:text-[40px] text-heading font-normal leading-tight mb-4">
            {product.name}
          </h1>

          {/* Description */}
          <p className="font-sans text-body text-sm md:text-base leading-relaxed mb-6">
            {product.description}
          </p>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-6">
            <span className="font-sans text-2xl md:text-3xl font-medium text-[#121212]">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice > product.price && (
              <span className="font-sans text-lg text-gray-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-200 mb-6" />

          {/* Countdown Timer */}
          <p className="text-sm text-body mb-3">Offer expires in:</p>
          <div className="flex gap-3 mb-6">
            <TimerBox value={timeLeft.days} label="Days" />
            <TimerBox value={timeLeft.hours} label="Hours" />
            <TimerBox value={timeLeft.minutes} label="Minutes" />
            <TimerBox value={timeLeft.seconds} label="Seconds" />
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-200 mb-6" />

          {/* Measurements */}
          <div className="mb-6">
            <p className="text-sm font-medium text-heading mb-1">
              Measurements
            </p>
            <p className="font-sans text-base text-[#000000]">
              {product.measurements}
            </p>
          </div>

          {/* Color Selector */}
          {colors.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium text-heading">
                  Choose Color
                </span>
                <ChevronRight size={14} className="text-heading" />
              </div>
              <p className="text-sm text-heading font-medium mb-3">
                {colors[selectedColor].name}
              </p>
              <div className="flex gap-3">
                {colors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(index)}
                    className={`w-10 h-10 rounded-sm border-2 transition-colors ${
                      selectedColor === index
                        ? "border-heading"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                    style={{ backgroundColor: color.hex }}
                    aria-label={`Select ${color.name}`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Divider */}
          <div className="h-px bg-gray-200 mb-6" />

          {/* Quantity + Wishlist */}
          <div className="flex items-center gap-4 mb-4">
            {/* Quantity Selector */}
            <div className="flex items-center bg-[#F5F5F5] rounded-lg overflow-hidden">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-12 h-12 flex items-center justify-center text-body hover:text-heading transition-colors"
              >
                <Minus size={16} />
              </button>
              <span className="w-10 h-12 flex items-center justify-center font-sans font-medium text-heading">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-12 h-12 flex items-center justify-center text-body hover:text-heading transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>

            {/* Wishlist */}
            <button className="flex-1 h-12 flex items-center justify-center gap-2 border border-heading rounded-lg font-sans font-medium text-heading hover:bg-gray-50 transition-colors">
              <Heart size={18} />
              Wishlist
            </button>
          </div>

          {/* Add to Cart */}
          <button
            onClick={() => {
              addToCart(product, quantity);
              openFlyout();
            }}
            className="w-full h-12 bg-[#001F3F] text-white font-sans font-bold rounded-lg hover:bg-black/90 transition-colors mb-6"
          >
            Add to Cart
          </button>

          {/* Meta: SKU + Category */}
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex items-center gap-4">
              <span className="text-body uppercase tracking-wider text-xs">
                SKU
              </span>
              <span className="text-heading">{product.sku}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-body uppercase tracking-wider text-xs">
                Category
              </span>
              <span className="text-heading">{product.category}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <CustomerReviews product={product} />

      {/* You Might Also Like Section */}
      <YouMightAlsoLike currentProductId={product.id} />
    </div>
  );
};

export default ProductDetail;
