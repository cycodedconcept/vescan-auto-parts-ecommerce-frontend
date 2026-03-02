import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { User, Calendar, ArrowLeft } from "lucide-react";
import { getArticleBySlug, getRelatedArticles } from "../services/blogService";

/* ───────── Related Article Card ───────── */
const RelatedCard = ({ article }) => (
  <Link to={`/blog/${article.slug}`} className="group block">
    <div className="w-full aspect-video rounded-lg overflow-hidden mb-3 bg-[#F3F5F7]">
      <img
        src={article.image}
        alt={article.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
    </div>
    <h4 className="font-sans text-sm font-bold text-heading leading-snug mb-1 line-clamp-2 group-hover:underline">
      {article.title}
    </h4>
    <p className="font-sans text-xs text-body">{article.date}</p>
  </Link>
);

/* ───────── Blog Post Page ───────── */
const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [article, setArticle] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [art, rel] = await Promise.all([
          getArticleBySlug(slug),
          getRelatedArticles(slug, 3),
        ]);
        setArticle(art);
        setRelated(rel);
      } catch {
        navigate("/blog", { replace: true });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="container mx-auto px-6 md:px-12 lg:px-28 py-20 flex justify-center">
        <div className="w-8 h-8 border-2 border-heading border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!article) return null;

  return (
    <div className="container mx-auto px-6 md:px-12 lg:px-28 py-8 md:py-12">
      {/* ── Mobile: Back link ── */}
      <button
        onClick={() => navigate(-1)}
        className="md:hidden flex items-center gap-1.5 text-sm text-body mb-6 hover:text-heading transition-colors"
      >
        <ArrowLeft size={14} />
        back
      </button>

      {/* ── Breadcrumb (desktop) ── */}
      <nav className="hidden md:flex items-center gap-2 text-sm text-body mb-6">
        <Link to="/" className="hover:text-heading transition-colors">
          Home
        </Link>
        <span>›</span>
        <Link to="/blog" className="hover:text-heading transition-colors">
          Blog
        </Link>
        <span>›</span>
        <span className="text-heading font-medium line-clamp-1">
          {article.title}
        </span>
      </nav>

      {/* ── Article wrapper ── */}
      <article>
        {/* ARTICLE chip */}
        <p className="font-sans text-xs uppercase tracking-widest text-body font-bold mb-3">
          Article
        </p>

        {/* Title */}
        <h1 className="font-sans text-2xl md:text-4xl font-bold text-heading leading-tight mb-4">
          {article.title}
        </h1>

        {/* Author + Date */}
        <div className="flex items-center gap-5 mb-6">
          <span className="flex items-center gap-1.5 font-sans text-sm text-body">
            <User size={14} className="text-body" />
            {article.author}
          </span>
          <span className="flex items-center gap-1.5 font-sans text-sm text-body">
            <Calendar size={14} className="text-body" />
            {article.date}
          </span>
        </div>

        {/* Hero image */}
        <div className="w-full aspect-video rounded-lg overflow-hidden mb-8 bg-[#F3F5F7]">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content blocks */}
        <div className="flex flex-col gap-6">
          {article.content.map((block, i) => {
            if (block.type === "paragraph") {
              return (
                <p
                  key={i}
                  className="font-sans text-sm md:text-base text-body leading-relaxed"
                >
                  {block.text}
                </p>
              );
            }

            if (block.type === "image") {
              return (
                <div
                  key={i}
                  className="w-full h-64 md:h-80 rounded-lg bg-[#F3F5F7] flex items-center justify-center overflow-hidden p-6"
                >
                  <img
                    src={block.src}
                    alt={block.alt}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              );
            }

            if (block.type === "image-text") {
              return (
                <div
                  key={i}
                  className="flex flex-col md:flex-row gap-6 md:gap-10"
                >
                  {/* Image — left on desktop, top on mobile */}
                  <div className="w-full md:w-2/5 flex-shrink-0 h-64 md:h-auto rounded-lg bg-[#F3F5F7] flex items-center justify-center overflow-hidden p-6">
                    <img
                      src={block.image.src}
                      alt={block.image.alt}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  {/* Paragraphs — right on desktop, below on mobile */}
                  <div className="flex flex-col gap-4 md:w-3/5">
                    {block.paragraphs.map((text, j) => (
                      <p
                        key={j}
                        className="font-sans text-sm md:text-base text-body leading-relaxed"
                      >
                        {text}
                      </p>
                    ))}
                  </div>
                </div>
              );
            }

            return null;
          })}
        </div>
      </article>

      {/* ── You might also like ── */}
      {related.length > 0 && (
        <section className="mt-16 md:mt-20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-sans text-lg md:text-xl font-bold text-heading">
              You might also like
            </h2>
            <Link
              to="/blog"
              className="font-sans text-sm font-medium text-heading hover:underline flex items-center gap-1"
            >
              More Articles →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((rel) => (
              <RelatedCard key={rel.id} article={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default BlogPost;
