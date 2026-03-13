import api from "./api";

// Normalize API product shape → app product shape
const normalizeProduct = (p) => ({
  id: p.id,
  name: p.product_name,
  price: parseFloat(p.product_price),
  image: p.product_image,
  rating: p.rating ?? 0,
  stock: p.stock,
  badges: [],
  originalPrice: null,
});

// GET /get_user_product?page=X[&parent_cat_id=X|&sub_category=X]
// Returns: { products, currentPage, lastPage, total }
export const getProducts = async (page = 1, { parentCatId, subCategoryId } = {}) => {
  let url = `/get_user_product?page=${page}`;
  if (subCategoryId) url += `&sub_category=${subCategoryId}`;
  else if (parentCatId) url += `&parent_cat_id=${parentCatId}`;
  const { data } = await api.get(url);
  return {
    products: data.data.map(normalizeProduct),
    currentPage: data.current_page,
    lastPage: data.last_page,
    total: data.total,
  };
};
