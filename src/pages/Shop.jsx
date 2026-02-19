import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Star,
  Heart,
  ChevronDown,
  Grid2X2,
  Grid3X3,
  LayoutGrid,
  List,
} from "lucide-react";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";

/* ───────── Shop Product Card ───────── */
const ShopCard = ({ product }) => {
  const [liked, setLiked] = useState(false);
  const { addToCart, openFlyout } = useCart();

  return (
    <div className="group relative">
      <Link to={`/product/${product.id}`}>
        {/* Image */}
        <div className="relative bg-[#F3F5F7] rounded-lg overflow-hidden aspect-square flex items-center justify-center p-6 mb-3">
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            <span className="bg-white text-heading font-sans text-xs font-bold px-2.5 py-1 rounded-sm">
              NEW
            </span>
            {product.badges
              .filter((b) => b !== "HOT")
              .map((badge, i) => (
                <span
                  key={i}
                  className="bg-[#00C2FF] text-white font-sans text-xs font-bold px-2.5 py-1 rounded-sm"
                >
                  {badge}
                </span>
              ))}
          </div>

          {/* Heart */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setLiked((l) => !l);
            }}
            className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Heart
              size={20}
              className={`${
                liked
                  ? "fill-red-500 text-red-500"
                  : "text-gray-500 hover:text-heading"
              } transition-colors`}
            />
          </button>

          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain mix-blend-multiply"
          />

          {/* Add to Cart — hover overlay */}
          <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 p-3">
            <button
              onClick={(e) => {
                e.preventDefault();
                addToCart(product);
                openFlyout();
              }}
              className="w-full bg-heading text-white font-sans font-bold text-sm py-2.5 rounded-lg hover:bg-black/90 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </Link>

      {/* Info */}
      <div className="flex items-center gap-0.5 mb-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={12}
            className={`${
              i < product.rating
                ? "fill-[#F86624] text-[#F86624]"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
      <Link to={`/product/${product.id}`}>
        <h3 className="font-sans text-sm text-heading font-medium mb-0.5 hover:underline">
          {product.category}
        </h3>
      </Link>
      <div className="flex items-center gap-2">
        <span className="font-sans text-sm font-bold text-heading">
          ${product.price.toFixed(2)}
        </span>
        {product.originalPrice > product.price && (
          <span className="font-sans text-xs text-gray-400 line-through">
            ${product.originalPrice.toFixed(2)}
          </span>
        )}
      </div>
    </div>
  );
};

/* ───────── Custom Filter Dropdown ───────── */
const FilterDropdown = ({
  label,
  displayLabel,
  options,
  value,
  onChange,
  width,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:flex-none relative" style={{ width: undefined }}>
      <label className="block text-xs uppercase tracking-wider text-[#7C797A] mb-1.5 font-bold">
        {label}
      </label>
      <button
        onClick={() => setIsOpen((o) => !o)}
        className="flex items-center justify-between border-2 border-[#7C797A] rounded-lg px-5 py-2.5 font-sans text-sm text-heading bg-white"
        style={{ width: width || "100%" }}
      >
        <span>{displayLabel}</span>
        <ChevronDown
          size={14}
          className={`text-heading transition-transform ml-4 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div
          className="mt-1 md:absolute md:top-full md:left-0 md:bg-white md:shadow-lg md:border md:border-gray-100 md:rounded-lg md:z-20"
          style={{ width: width || "100%" }}
        >
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                onChange(opt);
                setIsOpen(false);
              }}
              className={`w-full text-left px-5 py-2.5 font-sans text-sm transition-colors ${
                value === opt
                  ? "bg-gray-100 text-heading font-medium"
                  : "text-body hover:bg-gray-50"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

/* ───────── Shop Page ───────── */
const Shop = () => {
  const [typeFilter, setTypeFilter] = useState("New");
  const [categoryFilter, setCategoryFilter] = useState("Spare Parts");
  const [priceFilter, setPriceFilter] = useState("All Price");
  const [sortBy, setSortBy] = useState("default");
  const [gridCols, setGridCols] = useState(4);
  const [visibleCount, setVisibleCount] = useState(8);

  // Duplicate products to fill the grid (simulating more items)
  const allProducts = [...products, ...products, ...products];
  const displayedProducts = allProducts.slice(0, visibleCount);
  const hasMore = visibleCount < allProducts.length;

  const handleShowMore = () => {
    setVisibleCount((prev) => Math.min(prev + 8, allProducts.length));
  };

  const categories = [
    "All Spare Parts",
    "Oil Filters",
    "Fuel Pumps",
    "Spark Plugs",
    "Clutch Kits",
    "Control Arms",
  ];

  return (
    <div>
      {/* ── Hero Banner ── */}
      <div className="container mx-auto px-6 md:px-12 lg:px-28 pt-6 md:pt-8">
        <section className="relative w-full h-[280px] md:h-[340px] overflow-hidden rounded-lg">
          <img
            src="https://res.cloudinary.com/dmymwlqqw/image/upload/v1770637600/3d-rendering-hydraulic-elements_bleiba.jpg"
            alt="Shop hero"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm mb-4 opacity-80">
              <Link to="/" className="hover:underline">
                Home
              </Link>
              <span>›</span>
              <span>Shop</span>
            </nav>
            <h1 className="font-heading text-6xl md:text-5xl font-normal mb-2">
              Shop Page
            </h1>
            <p className="font-sans text-xl md:text-base opacity-80 max-w-md">
              Let&apos;s get the best spare parts you want.
            </p>
          </div>
        </section>
      </div>

      {/* ── Filter + Grid Area ── */}
      <div className="container mx-auto px-6 md:px-12 lg:px-28 py-8 md:py-12">
        {/* ── Filter Bar ── */}
        <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-6 mb-6">
          {/* TYPE */}
          <FilterDropdown
            label="Type"
            displayLabel="New"
            options={["New", "Tokunbo"]}
            value={typeFilter}
            onChange={setTypeFilter}
            width="140px"
          />

          {/* CATEGORIES */}
          <FilterDropdown
            label="Categories"
            displayLabel="Spare Parts"
            options={categories}
            value={categoryFilter}
            onChange={setCategoryFilter}
            width="240px"
          />

          {/* PRICE */}
          <FilterDropdown
            label="Price"
            displayLabel="All Price"
            options={[
              "All Price",
              "$0 - $50",
              "$50 - $100",
              "$100 - $200",
              "$200+",
            ]}
            value={priceFilter}
            onChange={setPriceFilter}
            width="240px"
          />
        </div>

        {/* ── Sort + View Toggle ── */}
        <div className="flex items-center justify-between mb-8">
          {/* Sort By */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-heading font-medium">Sort by</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none text-sm text-heading font-medium bg-transparent focus:outline-none cursor-pointer pr-4"
              >
                <option value="default">Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>
              <ChevronDown
                size={12}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-heading pointer-events-none"
              />
            </div>
          </div>

          {/* Grid View Toggles */}
          <div className="flex items-center gap-1">
            {/* 4-col — desktop only */}
            <button
              onClick={() => setGridCols(4)}
              className={`hidden md:flex w-8 h-8 items-center justify-center rounded transition-colors ${
                gridCols === 4
                  ? "text-heading"
                  : "text-gray-400 hover:text-heading"
              }`}
            >
              <LayoutGrid size={18} />
            </button>
            {/* 3-col — desktop only */}
            <button
              onClick={() => setGridCols(3)}
              className={`hidden md:flex w-8 h-8 items-center justify-center rounded transition-colors ${
                gridCols === 3
                  ? "text-heading"
                  : "text-gray-400 hover:text-heading"
              }`}
            >
              <Grid3X3 size={18} />
            </button>
            {/* 2-col */}
            <button
              onClick={() => setGridCols(2)}
              className={`w-8 h-8 flex items-center justify-center rounded transition-colors ${
                gridCols === 2
                  ? "text-heading"
                  : "text-gray-400 hover:text-heading"
              }`}
            >
              <Grid2X2 size={18} />
            </button>
            {/* List */}
            <button
              onClick={() => setGridCols(1)}
              className={`w-8 h-8 flex items-center justify-center rounded transition-colors ${
                gridCols === 1
                  ? "text-heading"
                  : "text-gray-400 hover:text-heading"
              }`}
            >
              <List size={18} />
            </button>
          </div>
        </div>

        {/* ── Product Grid ── */}
        <div
          className={`grid gap-x-4 gap-y-8 mb-10 ${
            gridCols === 4
              ? "grid-cols-2 md:grid-cols-4"
              : gridCols === 3
              ? "grid-cols-2 md:grid-cols-3"
              : gridCols === 2
              ? "grid-cols-2"
              : "grid-cols-1"
          }`}
        >
          {displayedProducts.map((product, index) => (
            <ShopCard key={`${product.id}-${index}`} product={product} />
          ))}
        </div>

        {/* ── Show More ── */}
        {hasMore && (
          <div className="flex justify-center">
            <button
              onClick={handleShowMore}
              className="px-10 py-3 border border-heading rounded-full font-sans font-bold text-sm text-heading hover:bg-heading hover:text-white transition-colors"
            >
              Show More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
