import api from "./api";

// Maps category slug → lucide-react icon name
// Add new entries here as the API grows
const CATEGORY_ICON_MAP = {
  "shock-absorber": "ArrowDownUp",
  "accessories": "Package",
};

// GET /get_category
// Returns: [{ parent_id, parent_category_name, sub_category[] }]
export const getCategories = async () => {
  const { data } = await api.get("/get_category");
  return data;
};

// Normalize raw API categories to app shape: { id, name, slug, icon }
export const getNormalizedCategories = async () => {
  const raw = await getCategories();
  return raw.map((cat) => {
    const slug = cat.parent_category_name.toLowerCase().replace(/\s+/g, "-");
    return {
      id: cat.parent_id,
      name: cat.parent_category_name,
      slug,
      icon: CATEGORY_ICON_MAP[slug] ?? "Settings",
      subCategories: cat.sub_category ?? [],
    };
  });
};

// GET /get_subcategory?id={parentId}
// Returns: [{ id, name, parent_id }]
export const getSubcategories = async (parentId) => {
  const { data } = await api.get(`/get_subcategory?id=${parentId}`);
  return data.sub_category;
};
