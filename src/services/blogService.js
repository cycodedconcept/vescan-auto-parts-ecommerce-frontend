import api, { USE_MOCK_DATA } from "./api";
import { articles } from "../data/articles";

const delay = () => new Promise((r) => setTimeout(r, 400));

/** Fetch all articles (list page) */
export const getArticles = async () => {
  if (USE_MOCK_DATA) {
    await delay();
    return articles;
  }
  const { data } = await api.get("/blog");
  return data;
};

/** Fetch a single article by slug */
export const getArticleBySlug = async (slug) => {
  if (USE_MOCK_DATA) {
    await delay();
    const article = articles.find((a) => a.slug === slug);
    if (!article) throw new Error("Article not found");
    return article;
  }
  const { data } = await api.get(`/blog/${slug}`);
  return data;
};

/** Fetch related articles (excludes the current article) */
export const getRelatedArticles = async (slug, limit = 3) => {
  if (USE_MOCK_DATA) {
    await delay();
    return articles.filter((a) => a.slug !== slug).slice(0, limit);
  }
  const { data } = await api.get(`/blog/${slug}/related?limit=${limit}`);
  return data;
};
