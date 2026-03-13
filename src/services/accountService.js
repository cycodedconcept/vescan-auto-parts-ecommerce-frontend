import api from "./api";

// Account endpoints are not yet available on the real API.
// Keep this true until the backend provides profile/addresses/orders/wishlist endpoints.
const USE_MOCK_DATA = true;

/**
 * Account service – handles all user-account-related API calls.
 *
 * Mock mode  → resolves immediately with static data.
 * Production → real REST endpoints (set USE_MOCK_DATA = false in api.js).
 */

// ── Mock data ────────────────────────────────────────────────────────────────

const mockUser = {
  firstName: "John",
  lastName: "Doe",
  displayName: "John Doe",
  email: "john.doe@example.com",
  avatar: null, // null = show initials fallback
};

const mockAddresses = {
  billing: {
    firstName: "Sofia",
    lastName: "Havertz",
    phone: "(+234) 814 567 8908",
    email: "sofia.havertz@example.com",
    streetAddress: "125, Maryland",
    country: "Nigeria",
    city: "Ikeja",
    state: "Lagos State",
    zipCode: "100001",
  },
  shipping: {
    firstName: "Sofia",
    lastName: "Havertz",
    phone: "(+234) 814 567 8908",
    email: "sofia.havertz@example.com",
    streetAddress: "125, Maryland",
    country: "Nigeria",
    city: "Ikeja",
    state: "Lagos State",
    zipCode: "100001",
  },
};

const mockOrders = [
  { orderCode: "#3456_768", date: "August 17th, 2024", status: "Delivered", total: 1234.0 },
  { orderCode: "#3456_980", date: "August 17th, 2024", status: "Delivered", total: 345.0 },
  { orderCode: "#3456_120", date: "August 17th, 2024", status: "Delivered", total: 2345.0 },
  { orderCode: "#3456_030", date: "August 17th, 2024", status: "Delivered", total: 845.0 },
];

const mockWishlist = [
  {
    id: 1,
    name: "Alternator Unit",
    price: 19.19,
    quality: "Excellent",
    image: "https://res.cloudinary.com/dmymwlqqw/image/upload/v1770634967/10875-removebg-preview_zmh3kd.png",
  },
  {
    id: 2,
    name: "Shock Absorbers",
    price: 345.0,
    quality: "Excellent",
    image: "https://res.cloudinary.com/dmymwlqqw/image/upload/v1770634714/different-car-accessories-composition-removebg-preview_pxiuwp.png",
  },
  {
    id: 3,
    name: "Wheel Bearings",
    price: 8.8,
    quality: "Excellent",
    image: "https://res.cloudinary.com/dmymwlqqw/image/upload/v1770634967/10875-removebg-preview_zmh3kd.png",
  },
  {
    id: 4,
    name: "Wheel Bearings",
    price: 8.8,
    quality: "Excellent",
    image: "https://res.cloudinary.com/dmymwlqqw/image/upload/v1770634714/different-car-accessories-composition-removebg-preview_pxiuwp.png",
  },
];

// ── Service functions ─────────────────────────────────────────────────────────

const delay = () => new Promise((r) => setTimeout(r, 400));

/** Fetch the logged-in user's profile */
export const getProfile = async () => {
  // Read real user data stored in localStorage on login
  const stored = localStorage.getItem("vescan_user");
  if (stored) {
    const u = JSON.parse(stored);
    const nameParts = (u.name ?? "").trim().split(" ");
    const firstName = nameParts[0] ?? "";
    const lastName = nameParts.slice(1).join(" ") ?? "";
    return {
      firstName,
      lastName,
      displayName: u.name ?? "",
      email: u.email ?? "",
      country: u.country ?? "",
      phone_number: u.phone_number ?? "",
      avatar: null,
    };
  }
  // Fallback to mock if not logged in (shouldn't normally happen on this page)
  await delay();
  return mockUser;
};

/** Update account details (name, email, phone, password) */
export const updateProfile = async (payload) => {
  if (USE_MOCK_DATA) {
    await delay();
    return { ...mockUser, ...payload };
  }
  const { data } = await api.put("/account/profile", payload);
  return data;
};

/** Fetch both billing and shipping addresses */
export const getAddresses = async () => {
  if (USE_MOCK_DATA) {
    await delay();
    return mockAddresses;
  }
  const { data } = await api.get("/account/addresses");
  return data;
};

/** Update billing address */
export const updateBillingAddress = async (payload) => {
  if (USE_MOCK_DATA) {
    await delay();
    return { ...mockAddresses.billing, ...payload };
  }
  const { data } = await api.put("/account/addresses/billing", payload);
  return data;
};

/** Update shipping address */
export const updateShippingAddress = async (payload) => {
  if (USE_MOCK_DATA) {
    await delay();
    return { ...mockAddresses.shipping, ...payload };
  }
  const { data } = await api.put("/account/addresses/shipping", payload);
  return data;
};

/** Fetch order history */
export const getOrders = async () => {
  if (USE_MOCK_DATA) {
    await delay();
    return mockOrders;
  }
  const { data } = await api.get("/account/orders");
  return data;
};

/** Fetch wishlist items */
export const getWishlist = async () => {
  if (USE_MOCK_DATA) {
    await delay();
    return mockWishlist;
  }
  const { data } = await api.get("/account/wishlist");
  return data;
};

/** Remove a product from the wishlist */
export const removeFromWishlist = async (productId) => {
  if (USE_MOCK_DATA) {
    await delay();
    return { success: true };
  }
  const { data } = await api.delete(`/account/wishlist/${productId}`);
  return data;
};
