import { useState } from "react";
import { Star, ChevronDown, ChevronRight, Send } from "lucide-react";
import { reviews } from "../../../data/reviews";

const ReviewCard = ({ review }) => (
  <div className="flex gap-4 py-6 border-b border-gray-100 last:border-0">
    {/* Avatar */}
    <div className="flex-shrink-0">
      <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
        <img
          src={review.avatar}
          alt={review.name}
          className="w-full h-full object-cover"
        />
      </div>
    </div>

    {/* Content */}
    <div className="flex-1 min-w-0">
      <h4 className="font-sans text-sm font-bold text-heading mb-1">
        {review.name}
      </h4>

      {/* Stars */}
      <div className="flex items-center gap-0.5 mb-3">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={12}
            className={`${
              i < review.rating
                ? "fill-[#F86624] text-[#F86624]"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Review Text */}
      <p className="font-sans text-sm text-[#030206] leading-relaxed mb-3">
        {review.text}
      </p>

      {/* Actions */}
      <div className="flex items-center gap-4 text-xs font-medium text-body">
        <button className="hover:text-heading transition-colors">Like</button>
        <button className="hover:text-heading transition-colors">Reply</button>
      </div>
    </div>
  </div>
);

const CustomerReviews = ({ product }) => {
  const [activeTab, setActiveTab] = useState("reviews");
  const [visibleCount, setVisibleCount] = useState(3);
  const [sortBy, _setSortBy] = useState("newest");

  const totalReviews = product?.reviews || reviews.length;
  const overallRating = product?.rating || 4;
  const category = product?.category || "Oil Filters";

  const visibleReviews = reviews.slice(0, visibleCount);
  const hasMore = visibleCount < reviews.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, reviews.length));
  };

  const tabs = [
    { id: "info", label: "Additional Info" },
    { id: "questions", label: "Questions" },
    { id: "reviews", label: `Reviews (${totalReviews})` },
  ];

  return (
    <div className="py-8 md:py-12">
      {/* Tabs — Desktop: Horizontal row, Mobile: Vertical stacked */}

      {/* Desktop Tabs */}
      <div className="hidden md:flex items-center gap-10 border-b border-gray-200 mb-10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3 font-sans text-sm font-medium transition-colors relative ${
              activeTab === tab.id
                ? "text-heading after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-heading"
                : "text-body hover:text-heading"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Mobile Tabs — Accordion Style */}
      <div className="md:hidden flex flex-col mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center justify-between py-3 border-b border-gray-200 font-sans text-sm transition-colors ${
              activeTab === tab.id ? "text-heading font-medium" : "text-body"
            }`}
          >
            {tab.label}
            <ChevronDown
              size={14}
              className={`transition-transform ${
                activeTab === tab.id ? "rotate-180" : ""
              }`}
            />
          </button>
        ))}
      </div>

      {/* Reviews Content — Only shown when Reviews tab is active */}
      {activeTab === "reviews" && (
        <div>
          {/* Section Title */}
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-heading mb-3">
            Customer Reviews
          </h2>

          {/* Rating Summary */}
          <div className="flex items-center gap-2 mb-1">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={`${
                    i < overallRating
                      ? "fill-[#F86624] text-[#F86624]"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-[#030206]">
              {totalReviews} Reviews
            </span>
          </div>
          <p className="text-sm text-body mb-6">{category}</p>

          {/* Write Review */}
          <div className="mb-8">
            {/* Emoji Rating Bar — right-aligned above write review */}
            <div className="flex items-center justify-end mb-4">
              <span className="text-lg">❤️</span>
              <span className="text-lg">😢</span>
              <span className="text-lg">👍</span>
              <span className="text-lg">😊</span>
              <span className="text-lg">🤩</span>
              <span className="text-lg">😍</span>
            </div>

            {/* Desktop */}
            <div className="hidden md:flex flex-1 items-center gap-3">
              <input
                type="text"
                placeholder=""
                className="flex-1 border border-gray-300 rounded-full px-5 py-3 font-sans text-sm text-heading placeholder:text-body focus:outline-none focus:border-heading transition-colors"
              />
              <button className="bg-heading text-white font-sans font-bold text-sm px-8 py-3 rounded-full hover:bg-black/90 transition-colors">
                Write Review
              </button>
            </div>

            {/* Mobile */}
            <div className="flex md:hidden flex-1 items-center gap-2">
              <input
                type="text"
                placeholder="Share your thoughts"
                className="flex-1 border border-gray-300 rounded-full px-4 py-2.5 font-sans text-sm text-heading placeholder:text-body focus:outline-none focus:border-heading transition-colors"
              />
              <button className="w-10 h-10 bg-heading text-white rounded-full flex items-center justify-center hover:bg-black/90 transition-colors flex-shrink-0">
                <Send size={16} />
              </button>
            </div>
          </div>

          {/* Sort Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
            <h3 className="font-heading text-xl md:text-2xl font-medium text-heading">
              {totalReviews} Reviews
            </h3>
            <div className="relative">
              <select
                value={sortBy}
                className="appearance-none border-2 border-[#E8ECEF] w-56 h-12 px-5 pr-10 rounded-[2px] font-sans text-base text-[#030206] bg-white focus:outline-none transition-colors cursor-pointer"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
              <ChevronDown
                size={14}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-heading pointer-events-none"
              />
            </div>
          </div>

          {/* Review Cards */}
          <div className="mb-8">
            {visibleReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>

          {/* Load More */}
          {hasMore && (
            <div className="flex justify-center">
              <button
                onClick={handleLoadMore}
                className="px-10 py-3 border border-heading rounded-full font-sans font-bold text-sm text-heading hover:bg-heading hover:text-white transition-colors"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      )}

      {/* Placeholder for other tabs */}
      {activeTab === "info" && (
        <div className="py-8 text-center text-body text-sm">
          Additional product information coming soon.
        </div>
      )}
      {activeTab === "questions" && (
        <div className="py-8 text-center text-body text-sm">
          Product questions coming soon.
        </div>
      )}
    </div>
  );
};

export default CustomerReviews;
