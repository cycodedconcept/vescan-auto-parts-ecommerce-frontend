import { useEffect } from "react";
import { useLocation, useNavigate, Link, Navigate } from "react-router-dom";
import { Check, ChevronLeft } from "lucide-react";
import { useCart } from "../context/CartContext";

// ── DEV PREVIEW MOCK ────────────────────────────────────────────────────────
// Swap PREVIEW_MODE to false when done reviewing the design.
const PREVIEW_MODE = true;

const previewData = {
  orderCode: "#12345_67890",
  date: "February 23, 2026",
  total: 234.0,
  paymentMethod: "card",
  items: [
    {
      id: 2,
      name: "VoltMaster - Alternator Unit",
      image:
        "https://res.cloudinary.com/dmymwlqqw/image/upload/v1770634967/10875-removebg-preview_zmh3kd.png",
      quantity: 2,
      quality: "Excellent",
    },
    {
      id: 1,
      name: "ClutchForce - Clutch Kit",
      image:
        "https://res.cloudinary.com/dmymwlqqw/image/upload/v1770634714/different-car-accessories-composition-removebg-preview_pxiuwp.png",
      quantity: 2,
      quality: "Excellent",
    },
  ],
};
// ────────────────────────────────────────────────────────────────────────────

const OrderComplete = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart();

  // Clear the cart once when this page mounts — avoids race conditions
  // with Checkout's empty-cart guard when navigating here.
  useEffect(() => {
    clearCart();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Guard: if accessed directly with no order data, go home
  // (bypassed in PREVIEW_MODE for design review)
  if (!PREVIEW_MODE && (!state || !state.items)) {
    return <Navigate to="/" replace />;
  }

  const { items, total, paymentMethod, orderCode, date } =
    PREVIEW_MODE ? previewData : state;

  return (
    <div className="container mx-auto px-6 md:px-12 lg:px-28 py-8 md:py-12">
      {/* Back button – mobile only, sits above the heading */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center md:hidden text-gray-500 font-sans text-sm mb-4"
      >
        <ChevronLeft size={16} className="mr-0.5" /> back to home
      </button>

      {/* Heading */}
      <div className="text-center mb-8">
        <h1 className="font-heading text-4xl md:text-5xl">Complete!</h1>
      </div>

      {/* ── Progress Stepper ── */}
      <div className="flex items-center justify-center mb-12 max-w-xl mx-auto px-2 md:px-0">
        {/* Step 1 – Complete (desktop only) */}
        <div className="hidden md:flex items-center gap-2 flex-shrink-0">
          <span className="w-8 h-8 rounded-full bg-[#00C2FF] flex items-center justify-center text-white flex-shrink-0">
            <Check size={14} strokeWidth={3} />
          </span>
          <span className="font-sans text-sm text-body whitespace-nowrap">
            Shopping Cart
          </span>
        </div>

        {/* Connector 1→2 (desktop only) */}
        <div className="hidden md:block flex-1 h-px bg-[#00C2FF] mx-2" />

        {/* Step 2 – Complete (desktop only) */}
        <div className="hidden md:flex items-center gap-2 flex-shrink-0">
          <span className="w-8 h-8 rounded-full bg-[#00C2FF] flex items-center justify-center text-white flex-shrink-0">
            <Check size={14} strokeWidth={3} />
          </span>
          <span className="font-sans text-sm text-body whitespace-nowrap">
            Checkout Details
          </span>
        </div>

        {/* Connector 2→3 (desktop only) */}
        <div className="hidden md:block flex-1 h-px bg-heading mx-2" />

        {/* Step 3 – Active */}
        <div className="flex items-center gap-2 border-b-2 border-heading pb-3 md:pb-0 md:border-none flex-shrink-0">
          <span className="w-8 h-8 rounded-full bg-heading flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
            3
          </span>
          <span className="font-sans text-sm font-bold text-heading whitespace-nowrap">
            Order Complete
          </span>
        </div>
      </div>

      {/* ── Order Card ── */}
      <div className="max-w-lg mx-auto border border-gray-200 rounded-xl p-8 text-center">
        {/* Thank you message */}
        <p className="font-sans text-sm text-body mb-2">Thank you! 🎉</p>
        <h2 className="font-heading text-2xl md:text-3xl text-heading mb-6">
          Your order has been received!
        </h2>

        {/* Product image strip */}
        <div className="flex items-center justify-center gap-3 mb-8">
          {items.map((item) => (
            <div key={item.id} className="relative flex-shrink-0">
              <div className="w-20 h-20 bg-[#F3F5F7] rounded-lg flex items-center justify-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-contain mix-blend-multiply p-2"
                />
              </div>
              {/* Quantity badge */}
              <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-heading text-white text-[11px] font-bold flex items-center justify-center">
                {item.quantity}
              </span>
            </div>
          ))}
        </div>

        {/* Order details */}
        <div className="flex flex-col divide-y divide-gray-100 text-left mb-8">
          <div className="flex justify-between py-3">
            <span className="font-sans text-sm text-body">Order Code:</span>
            <span className="font-sans text-sm font-semibold text-heading">
              {orderCode}
            </span>
          </div>
          <div className="flex justify-between py-3">
            <span className="font-sans text-sm text-body">Date:</span>
            <span className="font-sans text-sm font-semibold text-heading">
              {date}
            </span>
          </div>
          <div className="flex justify-between py-3">
            <span className="font-sans text-sm text-body">Total:</span>
            <span className="font-sans text-sm font-semibold text-heading">
              ${total.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between py-3">
            <span className="font-sans text-sm text-body">Payment Method:</span>
            <span className="font-sans text-sm font-semibold text-heading">
              {paymentMethod === "card" ? "Credit Card" : "PayPal"}
            </span>
          </div>
        </div>

        {/* Purchase History button */}
        <Link
          to="/"
          className="block w-full bg-[#001F3F] text-white font-sans font-bold text-sm py-3.5 rounded-full hover:bg-black/90 transition-colors text-center"
        >
          Purchase History
        </Link>
      </div>
    </div>
  );
};

export default OrderComplete;
