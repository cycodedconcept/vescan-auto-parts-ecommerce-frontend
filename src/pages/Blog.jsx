import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  Grid2X2,
  Grid3X3,
  LayoutGrid,
  List,
} from "lucide-react";
import { articles } from "../data/articles";

/* ───────── Blog Card ───────── */
const BlogCard = ({ article }) => {
  return (
    <Link to={article.link} className="group block">
      {/* Image */}
      <div className="w-full aspect-video rounded-lg overflow-hidden mb-4 bg-[#F3F5F7]">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Text */}
      <h3 className="font-sans text-base font-bold text-heading leading-snug mb-2 line-clamp-2 group-hover:underline">
        {article.title}
      </h3>
      <p className="font-sans text-sm text-body">{article.date}</p>
    </Link>
  );
};

/* ───────── Blog Page ───────── */
const Blog = () => {
  const [activeFilter, setActiveFilter] = useState("All Blog");
  const [sortBy, setSortBy] = useState("default");
  const [gridCols, setGridCols] = useState(3);
  const [visibleCount, setVisibleCount] = useState(6);

  const filters = ["All Blog", "Featured"];

  const filteredArticles =
    activeFilter === "All Blog"
      ? articles
      : articles.filter((a) => a.category === activeFilter);

  const displayedArticles = filteredArticles.slice(0, visibleCount);
  const hasMore = visibleCount < filteredArticles.length;

  const handleShowMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, filteredArticles.length));
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setVisibleCount(6);
  };

  return (
    <div>
      {/* ── Hero Banner ── */}
      <div className="container mx-auto px-6 md:px-12 lg:px-28 pt-6 md:pt-8">
        <section className="relative w-full h-[280px] md:h-[340px] overflow-hidden rounded-lg">
          <img
            src="https://res.cloudinary.com/dmymwlqqw/image/upload/v1770637600/3d-rendering-hydraulic-elements_bleiba.jpg"
            alt="Blog hero"
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
              <span>Blog</span>
            </nav>
            <h1 className="font-heading text-6xl md:text-5xl font-normal mb-2">
              Our Blog
            </h1>
            <p className="font-sans text-xl md:text-base opacity-80 max-w-md">
              Tips, guides, and insights on auto parts and vehicle care.
            </p>
          </div>
        </section>
      </div>

      {/* ── Filter + Grid Area ── */}
      <div className="container mx-auto px-6 md:px-12 lg:px-28 py-8 md:py-12">

        {/* ── Mobile Filter Dropdown ── */}
        <div className="md:hidden mb-6">
          <div className="relative">
            <select
              value={activeFilter}
              onChange={(e) => handleFilterChange(e.target.value)}
              className="w-full appearance-none border-2 border-[#7C797A] rounded-lg px-5 py-2.5 font-sans text-sm text-heading bg-white focus:outline-none cursor-pointer pr-10"
            >
              {filters.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-heading pointer-events-none"
            />
          </div>
        </div>

        {/* ── Desktop: Filter Tabs + Sort + View Toggle ── */}
        <div className="hidden md:flex items-center justify-between mb-8">
          {/* Filter Tabs */}
          <div className="flex items-center gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => handleFilterChange(f)}
                className={`px-5 py-2 rounded-full font-sans text-sm font-medium transition-colors ${
                  activeFilter === f
                    ? "bg-heading text-white"
                    : "border border-[#7C797A] text-heading hover:bg-gray-50"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Sort + View Toggle */}
          <div className="flex items-center gap-4">
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
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                </select>
                <ChevronDown
                  size={12}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-heading pointer-events-none"
                />
              </div>
            </div>

            {/* Grid View Toggles */}
            <div className="flex items-center gap-1">
              {/* 3-col */}
              <button
                onClick={() => setGridCols(3)}
                className={`w-8 h-8 flex items-center justify-center rounded transition-colors ${
                  gridCols === 3
                    ? "text-heading"
                    : "text-gray-400 hover:text-heading"
                }`}
              >
                <LayoutGrid size={18} />
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
                <Grid3X3 size={18} />
              </button>
              {/* 1-col with image */}
              <button
                onClick={() => setGridCols(1)}
                className={`w-8 h-8 flex items-center justify-center rounded transition-colors ${
                  gridCols === 1
                    ? "text-heading"
                    : "text-gray-400 hover:text-heading"
                }`}
              >
                <Grid2X2 size={18} />
              </button>
              {/* List */}
              <button
                onClick={() => setGridCols(0)}
                className={`w-8 h-8 flex items-center justify-center rounded transition-colors ${
                  gridCols === 0
                    ? "text-heading"
                    : "text-gray-400 hover:text-heading"
                }`}
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* ── Article Grid ── */}
        <div
          className={`grid gap-x-6 gap-y-10 mb-10 ${
            gridCols === 3
              ? "grid-cols-1 md:grid-cols-3"
              : gridCols === 2
              ? "grid-cols-1 md:grid-cols-2"
              : gridCols === 1
              ? "grid-cols-1 md:grid-cols-1"
              : "grid-cols-1"
          }`}
        >
          {displayedArticles.map((article) => (
            <BlogCard key={article.id} article={article} />
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

export default Blog;
