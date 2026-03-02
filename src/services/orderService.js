import api, { USE_MOCK_DATA } from "./api";

/**
 * Place a new order.
 *
 * Mock mode  → resolves immediately with a generated order object.
 * Production → POST /orders  (swap USE_MOCK_DATA to false in api.js)
 *
 * Expected payload shape:
 * {
 *   items:           CartItem[]   – products + quantities
 *   total:           number       – final amount after discount + shipping
 *   paymentMethod:   "card" | "paypal"
 *   shippingAddress: { firstName, lastName, phone, email,
 *                      streetAddress, country, city, state, zipCode }
 * }
 *
 * Returned order shape (mirrors what the backend will return):
 * {
 *   orderCode:     string   – e.g. "#12345_67890"
 *   date:          string   – human-readable date
 *   items:         CartItem[]
 *   total:         number
 *   paymentMethod: string
 * }
 */
export const placeOrder = async (payload) => {
  if (USE_MOCK_DATA) {
    // Simulate network latency so the component behaves identically to production
    await new Promise((resolve) => setTimeout(resolve, 600));

    return {
      orderCode: `#${Math.floor(10000 + Math.random() * 90000)}_${Math.floor(
        10000 + Math.random() * 90000
      )}`,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      items: payload.items,
      total: payload.total,
      paymentMethod: payload.paymentMethod,
    };
  }

  // ── Real API call ──────────────────────────────────────────────────────────
  // When your backend is ready, set USE_MOCK_DATA = false in api.js.
  // The backend should accept this payload and return the order object above.
  const { data } = await api.post("/orders", payload);
  return data;
};
