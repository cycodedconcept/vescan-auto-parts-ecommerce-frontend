import { useState, useEffect } from "react";
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
import { useCart } from "../context/CartContext";
import { getProducts } from "../services/productService";
import { getNormalizedCategories } from "../services/categoryService";
import { alertSuccess } from "../utils/alert";

/* ───────── Shop Product Card ───────── */
const ShopCard = ({ product }) => {
  const [liked, setLiked] = useState(false);
  const { addToCart, openFlyout } = useCart();

  return (
    <div className="group relative">
      <Link to={`/product/${product.id}`}>
        {/* Image */}
        <div className="relative bg-[#F3F5F7] rounded-lg overflow-hidden aspect-square flex items-center justify-center p-6 mb-3">
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
                liked ? "fill-red-500 text-red-500" : "text-gray-500 hover:text-heading"
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
                alertSuccess("Added to cart!");
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
            className={`${i < product.rating ? "fill-[#F86624] text-[#F86624]" : "text-gray-300"}`}
          />
        ))}
      </div>
      <Link to={`/product/${product.id}`}>
        <h3 className="font-sans text-sm text-heading font-medium mb-0.5 hover:underline line-clamp-2">
          {product.name}
        </h3>
      </Link>
      <span className="font-sans text-sm font-bold text-heading">
        ₦{product.price.toLocaleString()}
      </span>
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
  widthClass = "w-full md:w-[140px]",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`relative ${widthClass}`}>
      <label className="block text-xs uppercase tracking-wider text-[#7C797A] mb-1.5 font-bold">
        {label}
      </label>
      <button
        onClick={() => setIsOpen((o) => !o)}
        className="flex w-full items-center justify-between border-2 border-[#7C797A] rounded-lg px-5 py-2.5 font-sans text-sm text-heading bg-white"
      >
        <span>{displayLabel}</span>
        <ChevronDown
          size={14}
          className={`text-heading transition-transform ml-4 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <div className="mt-1 w-full md:absolute md:top-full md:left-0 md:bg-white md:shadow-lg md:border md:border-gray-100 md:rounded-lg md:z-20">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                onChange(opt);
                setIsOpen(false);
              }}
              className={`w-full text-left px-5 py-2.5 font-sans text-sm transition-colors ${
                value === opt.value
                  ? "bg-gray-100 text-heading font-medium"
                  : "text-body hover:bg-gray-50"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

/* ───────── Shop Page ───────── */
const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  const [typeFilter, setTypeFilter] = useState(null);
  const [priceFilter, setPriceFilter] = useState(null);
  const [sortBy, setSortBy] = useState("default");
  const [gridCols, setGridCols] = useState(4);

  const typeOptions = [
    { value: null, label: "New" },
    { value: "tokunbo", label: "Tokunbo" },
  ];

  const priceOptions = [
    { value: null, label: "All Price" },
    { value: "0-1000", label: "₦0 - ₦1,000" },
    { value: "1000-5000", label: "₦1,000 - ₦5,000" },
    { value: "5000-15000", label: "₦5,000 - ₦15,000" },
    { value: "15000+", label: "₦15,000+" },
  ];

  // Fetch categories once on mount
  useEffect(() => {
    getNormalizedCategories()
      .then(setCategories)
      .catch((err) => console.error("Failed to load categories:", err));
  }, []);

  // Re-fetch products whenever category/subcategory filter changes
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setProducts([]);
      try {
        const filters = {};
        if (selectedSubCategory) filters.subCategoryId = selectedSubCategory.value;
        else if (selectedCategory) filters.parentCatId = selectedCategory.value;
        const result = await getProducts(1, filters);
        setProducts(result.products);
        setCurrentPage(result.currentPage);
        setLastPage(result.lastPage);
      } catch (err) {
        console.error("Failed to load products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [selectedCategory, selectedSubCategory]);


  const handleShowMore = async () => {
    if (currentPage >= lastPage) return;
    setLoadingMore(true);
    try {
      const filters = {};
      if (selectedSubCategory) filters.subCategoryId = selectedSubCategory.value;
      else if (selectedCategory) filters.parentCatId = selectedCategory.value;
      const result = await getProducts(currentPage + 1, filters);
      setProducts((prev) => [...prev, ...result.products]);
      setCurrentPage(result.currentPage);
      setLastPage(result.lastPage);
    } catch (err) {
      console.error("Failed to load more products:", err);
    } finally {
      setLoadingMore(false);
    }
  };

  const categoryOptions = [
    { value: null, label: "All Categories" },
    ...categories.map((c) => ({ value: c.id, label: c.name })),
  ];

  const selectedCategoryData = categories.find((c) => c.id === selectedCategory?.value);
  const subCategoryOptions =
    selectedCategoryData?.subCategories?.length > 0
      ? [
          { value: null, label: "All Subcategories" },
          ...selectedCategoryData.subCategories.map((sc) => ({ value: sc.id, label: sc.name })),
        ]
      : [];

  // Client-side price filtering
  const displayedProducts = priceFilter
    ? products.filter((p) => {
        const price = p.price;
        switch (priceFilter.value) {
          case "0-1000":     return price >= 0 && price <= 1000;
          case "1000-5000":  return price > 1000 && price <= 5000;
          case "5000-15000": return price > 5000 && price <= 15000;
          case "15000+":     return price > 15000;
          default:           return true;
        }
      })
    : products;

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
            <nav className="flex items-center gap-2 text-sm mb-4 opacity-80">
              <Link to="/" className="hover:underline">Home</Link>
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
            displayLabel={typeFilter ? typeFilter.label : "New"}
            options={typeOptions}
            value={typeFilter?.value ?? null}
            onChange={(opt) => setTypeFilter(opt.value ? opt : null)}
            widthClass="w-full md:w-[140px]"
          />

          {/* CATEGORIES */}
          <FilterDropdown
            label="Categories"
            displayLabel={selectedCategory ? selectedCategory.label : "All Categories"}
            options={categoryOptions}
            value={selectedCategory?.value ?? null}
            onChange={(opt) => {
              setSelectedCategory(opt.value ? opt : null);
              setSelectedSubCategory(null);
            }}
            widthClass="w-full md:w-[200px]"
          />

          {/* SUBCATEGORIES — only shown when a parent category with subcategories is selected */}
          {subCategoryOptions.length > 0 && (
            <FilterDropdown
              label="Subcategory"
              displayLabel={selectedSubCategory ? selectedSubCategory.label : "All Subcategories"}
              options={subCategoryOptions}
              value={selectedSubCategory?.value ?? null}
              onChange={(opt) => setSelectedSubCategory(opt.value ? opt : null)}
              widthClass="w-full md:w-[220px]"
            />
          )}

          {/* PRICE */}
          <FilterDropdown
            label="Price"
            displayLabel={priceFilter ? priceFilter.label : "All Price"}
            options={priceOptions}
            value={priceFilter?.value ?? null}
            onChange={(opt) => setPriceFilter(opt.value ? opt : null)}
            widthClass="w-full md:w-[200px]"
          />

        </div>

        {/* ── Sort + View Toggle ── */}
        <div className="flex items-center justify-between mb-8">
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
              </select>
              <ChevronDown
                size={12}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-heading pointer-events-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setGridCols(4)}
              className={`hidden md:flex w-8 h-8 items-center justify-center rounded transition-colors ${gridCols === 4 ? "text-heading" : "text-gray-400 hover:text-heading"}`}
            >
              <LayoutGrid size={18} />
            </button>
            <button
              onClick={() => setGridCols(3)}
              className={`hidden md:flex w-8 h-8 items-center justify-center rounded transition-colors ${gridCols === 3 ? "text-heading" : "text-gray-400 hover:text-heading"}`}
            >
              <Grid3X3 size={18} />
            </button>
            <button
              onClick={() => setGridCols(2)}
              className={`w-8 h-8 flex items-center justify-center rounded transition-colors ${gridCols === 2 ? "text-heading" : "text-gray-400 hover:text-heading"}`}
            >
              <Grid2X2 size={18} />
            </button>
            <button
              onClick={() => setGridCols(1)}
              className={`w-8 h-8 flex items-center justify-center rounded transition-colors ${gridCols === 1 ? "text-heading" : "text-gray-400 hover:text-heading"}`}
            >
              <List size={18} />
            </button>
          </div>
        </div>

        {/* ── Product Grid ── */}
        {loading ? (
          <div className="flex justify-center py-20">
            <p className="font-sans text-sm text-body">Loading products…</p>
          </div>
        ) : (
          <>
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
              {displayedProducts.map((product) => (
                <ShopCard key={product.id} product={product} />
              ))}
            </div>

            {/* ── Show More ── */}
            {currentPage < lastPage && (
              <div className="flex justify-center">
                <button
                  onClick={handleShowMore}
                  disabled={loadingMore}
                  className="px-10 py-3 border border-heading rounded-full font-sans font-bold text-sm text-heading hover:bg-heading hover:text-white transition-colors disabled:opacity-60"
                >
                  {loadingMore ? "Loading…" : "Show More"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Shop;
