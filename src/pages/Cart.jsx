import { useState } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, X, Ticket } from "lucide-react";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, subtotal } = useCart();
  const [shipping, setShipping] = useState("free");
  const [coupon, setCoupon] = useState("");

  const shippingCosts = {
    free: 0,
    express: 15,
    pickup: 21,
  };

  const total = subtotal + shippingCosts[shipping];

  return (
    <div className="container mx-auto px-6 md:px-12 lg:px-28 py-8 md:py-12">
      {/* Heading */}
      <h1 className="font-heading text-4xl md:text-5xl text-center mb-8">
        Cart
      </h1>

      {/* Progress Stepper */}
      <div className="flex items-center justify-center gap-0 mb-12 max-w-xl mx-auto">
        {/* Step 1 */}
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-heading text-white text-sm font-bold flex items-center justify-center">
            1
          </span>
          <span className="font-sans text-sm font-medium text-heading">
            Shopping cart
          </span>
        </div>
        <div className="flex-1 h-px bg-heading mx-2" />

        {/* Step 2 */}
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-gray-200 text-gray-400 text-sm font-bold flex items-center justify-center">
            2
          </span>
          <span className="font-sans text-sm text-gray-400">
            Checkout details
          </span>
        </div>
        <div className="flex-1 h-px bg-gray-200 mx-2" />

        {/* Step 3 */}
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-gray-200 text-gray-400 text-sm font-bold flex items-center justify-center">
            3
          </span>
          <span className="font-sans text-sm text-gray-400">
            Order complete
          </span>
        </div>
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-16">
          <p className="font-sans text-lg text-body mb-4">
            Your cart is empty.
          </p>
          <Link
            to="/shop"
            className="inline-block bg-heading text-white font-sans font-bold text-sm px-8 py-3 rounded-lg hover:bg-black/90 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* ── Left: Cart Items ── */}
          <div className="flex-1">
            {/* Desktop Table Header */}
            <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-gray-200">
              <span className="col-span-5 font-sans text-sm font-medium text-heading">
                Product
              </span>
              <span className="col-span-2 font-sans text-sm font-medium text-heading">
                Quantity
              </span>
              <span className="col-span-2 font-sans text-sm font-medium text-heading">
                Price
              </span>
              <span className="col-span-3 font-sans text-sm font-medium text-heading text-right">
                Subtotal
              </span>
            </div>

            {/* Cart Items */}
            {cart.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-12 gap-4 items-center py-6 border-b border-gray-100"
              >
                {/* Product Info */}
                <div className="col-span-12 md:col-span-5 flex items-center gap-4">
                  <div className="w-20 h-20 bg-[#F3F5F7] rounded-md flex items-center justify-center flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain mix-blend-multiply p-2"
                    />
                  </div>
                  <div>
                    <h3 className="font-sans text-sm font-bold text-heading">
                      {item.name}
                    </h3>
                    <p className="text-xs text-body mt-0.5">
                      Quality: {item.quality}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="flex items-center gap-1 text-xs text-body hover:text-red-500 mt-1 transition-colors"
                    >
                      <X size={12} /> Remove
                    </button>
                  </div>
                </div>

                {/* Quantity */}
                <div className="col-span-4 md:col-span-2">
                  <div className="inline-flex items-center border border-gray-300 rounded-md">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center text-heading hover:bg-gray-50"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 h-8 flex items-center justify-center text-sm font-medium text-heading border-x border-gray-300">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-heading hover:bg-gray-50"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                {/* Price */}
                <div className="col-span-4 md:col-span-2">
                  <span className="font-sans text-sm text-heading">
                    ${item.price.toFixed(2)}
                  </span>
                </div>

                {/* Subtotal */}
                <div className="col-span-4 md:col-span-3 text-right">
                  <span className="font-sans text-sm font-bold text-heading">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* ── Right: Cart Summary ── */}
          <div className="w-full lg:w-[340px] flex-shrink-0">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-heading text-xl mb-5">Cart Summary</h3>

              {/* Shipping Options */}
              <div className="flex flex-col divide-y divide-gray-100">
                <label className="flex items-center justify-between py-3 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping"
                      value="free"
                      checked={shipping === "free"}
                      onChange={() => setShipping("free")}
                      className="w-4 h-4 accent-heading"
                    />
                    <span className="font-sans text-sm text-heading">
                      Free Shipping
                    </span>
                  </div>
                  <span className="font-sans text-sm text-heading">$0.00</span>
                </label>

                <label className="flex items-center justify-between py-3 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping"
                      value="express"
                      checked={shipping === "express"}
                      onChange={() => setShipping("express")}
                      className="w-4 h-4 accent-heading"
                    />
                    <span className="font-sans text-sm text-heading">
                      Express Shipping
                    </span>
                  </div>
                  <span className="font-sans text-sm text-heading">
                    +$15.00
                  </span>
                </label>

                <label className="flex items-center justify-between py-3 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping"
                      value="pickup"
                      checked={shipping === "pickup"}
                      onChange={() => setShipping("pickup")}
                      className="w-4 h-4 accent-heading"
                    />
                    <span className="font-sans text-sm text-heading">
                      Pick Up
                    </span>
                  </div>
                  <span className="font-sans text-sm text-heading">%21.00</span>
                </label>
              </div>

              {/* Subtotal */}
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                <span className="font-sans text-sm text-heading">Subtotal</span>
                <span className="font-sans text-sm text-heading">
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center mt-3 mb-5">
                <span className="font-sans text-base font-bold text-heading">
                  Total
                </span>
                <span className="font-sans text-base font-bold text-heading">
                  ${total.toFixed(2)}
                </span>
              </div>

              <button className="w-full  bg-[#001F3F] text-white font-sans font-bold text-sm py-3.5 rounded-lg hover:bg-black/90 transition-colors">
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Coupon Section ── */}
      {cart.length > 0 && (
        <div className="mt-12 max-w-md">
          <h3 className="font-heading text-xl mb-1">Have a Coupon?</h3>
          <p className="font-sans text-sm text-body mb-4">
            Add your code for an instant cart discount
          </p>
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <div className="flex items-center gap-2 px-4 flex-1">
              <Ticket size={18} className="text-body" />
              <input
                type="text"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="Coupon Code"
                className="w-full py-3 font-sans text-sm text-heading placeholder:text-body focus:outline-none"
              />
            </div>
            <button className="px-6 py-3 font-sans text-sm font-bold text-heading hover:bg-gray-50 transition-colors border-l border-gray-300">
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
