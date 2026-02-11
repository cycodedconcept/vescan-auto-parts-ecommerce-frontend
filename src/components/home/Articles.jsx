import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { articles } from "../../data/articles";

const Articles = () => {
  return (
    <section className="container mx-auto px-6 md:px-12 lg:px-28 py-12 md:py-20">
      {/* Header */}
      <div className="flex justify-between items-end mb-8 md:mb-12">
        <h2 className="font-heading text-3xl md:text-4xl font-medium text-heading">
          Latest Articles
        </h2>
        <Link
          to="/blog"
          className="flex items-center gap-2 text-sm md:text-base font-medium text-heading border-b border-heading pb-0.5 hover:opacity-70 transition-opacity"
        >
          View More <ArrowRight size={16} />
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {articles.map((article) => (
          <div key={article.id} className="group cursor-pointer">
            {/* Image Container */}
            <div className="rounded-lg overflow-hidden bg-gray-100 aspect-[4/3] mb-4 md:mb-6">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Content */}
            <h3 className="font-heading text-lg md:text-xl font-medium text-heading mb-2 group-hover:text-gray-600 transition-colors">
              {article.title}
            </h3>

            <Link
              to={article.link}
              className="inline-flex items-center gap-1 text-sm font-medium text-heading border-b border-gray-300 hover:border-heading transition-colors"
            >
              Read More <ArrowRight size={14} />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Articles;
