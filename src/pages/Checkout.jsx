import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  Minus,
  Plus,
  X,
  Check,
  CreditCard,
  ChevronDown,
  ChevronLeft,
  Ticket,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { placeOrder } from "../services/orderService";

const Checkout = () => {
  const { cart, removeFromCart, updateQuantity, subtotal } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    streetAddress: "",
    country: "",
    city: "",
    state: "",
    zipCode: "",
    differentBilling: false,
  });

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvc: "",
  });

  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  // Redirect to cart if empty — hooks must all be called before this
  if (cart.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  const MOCK_COUPONS = { VESCAN25: 25, SAVE10: 10 };

  const handleApplyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    const discount = MOCK_COUPONS[code];
    if (discount) {
      setAppliedCoupon({ code, discount });
      setCouponInput("");
      setCouponError(false);
    } else {
      setCouponError(true);
    }
  };

  const shippingCost = 0;
  const discount = appliedCoupon?.discount || 0;
  const total = subtotal - discount + shippingCost;

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const inputClass =
    "w-full border border-gray-300 rounded-md px-3 py-2.5 font-sans text-sm text-heading placeholder:text-body focus:outline-none focus:border-gray-500 bg-white";

  const labelClass =
    "block font-sans text-[11px] font-semibold text-heading uppercase tracking-wider mb-1.5";

  const handlePlaceOrder = async () => {
    if (isPlacingOrder) return;
    setIsPlacingOrder(true);
    try {
      const orderData = await placeOrder({
        items: cart,
        total,
        paymentMethod,
        shippingAddress: form,
      });
      navigate("/order-complete", { state: orderData });
    } catch (error) {
      console.error("Failed to place order:", error);
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const PlaceOrderButton = ({ className = "" }) => (
    <button
      onClick={handlePlaceOrder}
      disabled={isPlacingOrder}
      className={`w-full bg-[#001F3F] text-white font-sans font-bold text-sm py-4 rounded-lg transition-colors ${
        isPlacingOrder
          ? "opacity-70 cursor-not-allowed"
          : "hover:bg-black/90"
      } ${className}`}
    >
      {isPlacingOrder ? "Placing Order..." : "Place Order"}
    </button>
  );

  return (
    <div className="container mx-auto px-6 md:px-12 lg:px-28 py-8 md:py-12">
      {/* Heading */}
      <div className="relative mb-8 text-center flex items-center justify-center">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-0 flex items-center md:hidden text-gray-500 font-sans text-sm"
        >
          <ChevronLeft size={16} className="mr-0.5" /> back
        </button>
        <h1 className="font-heading text-4xl md:text-5xl">Check Out</h1>
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
        <div className="hidden md:block flex-1 h-px bg-heading mx-2" />

        {/* Step 2 – Active */}
        <div className="flex items-center gap-2 border-b-2 border-heading pb-3 md:pb-0 md:border-none flex-shrink-0">
          <span className="w-8 h-8 rounded-full bg-heading flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
            2
          </span>
          <span className="font-sans text-sm font-bold text-heading whitespace-nowrap">
            Checkout Details
          </span>
        </div>

        {/* Connector 2→3 (visible on all screens) */}
        <div className="flex-shrink-0 w-8 md:flex-1 h-px bg-gray-200 mx-2" />

        {/* Step 3 – Inactive */}
        <div className="flex items-center gap-2 pb-3 md:pb-0 flex-shrink-0">
          <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-sm font-bold flex-shrink-0">
            3
          </span>
          <span className="hidden md:inline font-sans text-sm text-gray-400 whitespace-nowrap">
            Order Complete
          </span>
        </div>
      </div>

      {/* ── Two-column layout ── */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* ── Left: Forms ── */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Contact Information */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="font-sans text-sm font-bold text-heading mb-4">
              Contact Information
            </h3>
            <div className="flex flex-col gap-4">
              {/* First + Last name */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleFormChange}
                    placeholder="First name"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleFormChange}
                    placeholder="Last name"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className={labelClass}>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleFormChange}
                  placeholder="Phone number"
                  className={inputClass}
                />
              </div>

              {/* Email */}
              <div>
                <label className={labelClass}>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleFormChange}
                  placeholder="Your Email"
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="font-sans text-sm font-bold text-heading mb-4">
              Shipping Address
            </h3>
            <div className="flex flex-col gap-4">
              {/* Street Address */}
              <div>
                <label className={labelClass}>
                  Street Address{" "}
                  <span className="text-red-500 normal-case tracking-normal">
                    *
                  </span>
                </label>
                <input
                  type="text"
                  name="streetAddress"
                  value={form.streetAddress}
                  onChange={handleFormChange}
                  placeholder="Street Address"
                  className={inputClass}
                />
              </div>

              {/* Country */}
              <div>
                <label className={labelClass}>
                  Country{" "}
                  <span className="text-red-500 normal-case tracking-normal">
                    *
                  </span>
                </label>
                <div className="relative">
                  <select
                    name="country"
                    value={form.country}
                    onChange={handleFormChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2.5 font-sans text-sm text-heading focus:outline-none focus:border-gray-500 bg-white appearance-none pr-8"
                  >
                    <option value="">Country</option>
                    <option value="NG">Nigeria</option>
                    <option value="US">United States</option>
                    <option value="GB">United Kingdom</option>
                    <option value="CA">Canada</option>
                    <option value="AU">Australia</option>
                    <option value="GH">Ghana</option>
                    <option value="ZA">South Africa</option>
                  </select>
                  <ChevronDown
                    size={14}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-body pointer-events-none"
                  />
                </div>
              </div>

              {/* Town / City */}
              <div>
                <label className={labelClass}>
                  Town / City{" "}
                  <span className="text-red-500 normal-case tracking-normal">
                    *
                  </span>
                </label>
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleFormChange}
                  placeholder="Town / City"
                  className={inputClass}
                />
              </div>

              {/* State + Zip */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>State</label>
                  <input
                    type="text"
                    name="state"
                    value={form.state}
                    onChange={handleFormChange}
                    placeholder="State"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Zip Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={form.zipCode}
                    onChange={handleFormChange}
                    placeholder="Zip Code"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Different billing */}
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  name="differentBilling"
                  checked={form.differentBilling}
                  onChange={handleFormChange}
                  className="w-4 h-4 accent-heading rounded"
                />
                <span className="font-sans text-sm text-body">
                  Use a different billing address (optional)
                </span>
              </label>
            </div>
          </div>

          {/* Payment Method */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="font-sans text-sm font-bold text-heading mb-4">
              Payment Method
            </h3>
            <div className="flex flex-col gap-3">
              {/* Card option */}
              <label className="flex items-center justify-between border border-gray-300 rounded-lg px-4 py-3 cursor-pointer">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                    className="w-4 h-4 accent-heading"
                  />
                  <span className="font-sans text-sm font-medium text-heading">
                    Pay by Card Credit
                  </span>
                </div>
                <CreditCard size={18} className="text-body flex-shrink-0" />
              </label>

              {/* PayPal option */}
              <label className="flex items-center border border-gray-300 rounded-lg px-4 py-3 cursor-pointer">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="paypal"
                    checked={paymentMethod === "paypal"}
                    onChange={() => setPaymentMethod("paypal")}
                    className="w-4 h-4 accent-heading"
                  />
                  <span className="font-sans text-sm font-medium text-heading">
                    Paypal
                  </span>
                </div>
              </label>

              {/* Card fields */}
              {paymentMethod === "card" && (
                <div className="flex flex-col gap-3 mt-1">
                  <div>
                    <label className={labelClass}>Card Number</label>
                    <input
                      type="text"
                      placeholder="1234 1234 1234"
                      value={cardDetails.number}
                      onChange={(e) =>
                        setCardDetails((p) => ({
                          ...p,
                          number: e.target.value,
                        }))
                      }
                      className={inputClass}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Expiration Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={cardDetails.expiry}
                        onChange={(e) =>
                          setCardDetails((p) => ({
                            ...p,
                            expiry: e.target.value,
                          }))
                        }
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>CVC</label>
                      <input
                        type="text"
                        placeholder="CVC Code"
                        value={cardDetails.cvc}
                        onChange={(e) =>
                          setCardDetails((p) => ({
                            ...p,
                            cvc: e.target.value,
                          }))
                        }
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Place Order – desktop only */}
          <PlaceOrderButton className="hidden lg:block" />
        </div>

        {/* ── Right: Order Summary ── */}
        <div className="w-full lg:w-[380px] flex-shrink-0">
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="font-heading text-xl mb-5">Order Summary</h3>

            {/* Items */}
            <div className="flex flex-col divide-y divide-gray-100">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-3 py-4">
                  {/* Image */}
                  <div className="w-14 h-14 bg-[#F3F5F7] rounded-md flex items-center justify-center flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain mix-blend-multiply p-1.5"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-sans text-sm font-bold text-heading leading-tight truncate">
                      {item.name}
                    </h4>
                    <p className="font-sans text-xs text-body mt-0.5">
                      Quality: {item.quality}
                    </p>
                    <div className="inline-flex items-center border border-gray-300 rounded-md mt-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="w-7 h-7 flex items-center justify-center text-heading hover:bg-gray-50"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-7 h-7 flex items-center justify-center text-xs font-medium text-heading border-x border-gray-300">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-7 h-7 flex items-center justify-center text-heading hover:bg-gray-50"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>

                  {/* Price + Remove */}
                  <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                    <span className="font-sans text-sm font-bold text-heading">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-body hover:text-red-500 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Coupon input */}
            <div className="flex items-center gap-2 mt-4">
              <div
                className={`flex items-center border rounded-md flex-1 min-w-0 ${
                  couponError ? "border-red-400" : "border-gray-300"
                }`}
              >
                <Ticket size={15} className="ml-3 text-body flex-shrink-0" />
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => {
                    setCouponInput(e.target.value);
                    setCouponError(false);
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
                  placeholder="Input"
                  className="flex-1 py-2.5 px-2 font-sans text-sm text-heading placeholder:text-body focus:outline-none bg-transparent"
                />
              </div>
              <button
                onClick={handleApplyCoupon}
                className="px-5 py-2.5 bg-[#001F3F] text-white font-sans text-sm font-bold rounded-md hover:bg-black/90 transition-colors flex-shrink-0"
              >
                Apply
              </button>
            </div>
            {couponError && (
              <p className="font-sans text-xs text-red-500 mt-1.5">
                Invalid coupon code.
              </p>
            )}

            {/* Applied coupon line */}
            {appliedCoupon && (
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-1.5">
                  <Ticket size={14} className="text-body" />
                  <span className="font-sans text-sm text-heading">
                    {appliedCoupon.code}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-sans text-sm font-medium text-[#00C2FF]">
                    ${appliedCoupon.discount.toFixed(2)}
                  </span>
                  <button
                    onClick={() => setAppliedCoupon(null)}
                    className="font-sans text-sm text-[#00C2FF] hover:underline"
                  >
                    [Remove]
                  </button>
                </div>
              </div>
            )}

            {/* Shipping */}
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
              <span className="font-sans text-sm text-heading">Shipping</span>
              <span className="font-sans text-sm text-heading">Free</span>
            </div>

            {/* Subtotal */}
            <div className="flex justify-between items-center mt-3">
              <span className="font-sans text-sm text-heading">Subtotal</span>
              <span className="font-sans text-sm text-heading">
                ${subtotal.toFixed(2)}
              </span>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center mt-3">
              <span className="font-sans text-base font-bold text-heading">
                Total
              </span>
              <span className="font-sans text-base font-bold text-heading">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Place Order – mobile only (after Order Summary) */}
      <PlaceOrderButton className="lg:hidden mt-6" />
    </div>
  );
};

export default Checkout;
