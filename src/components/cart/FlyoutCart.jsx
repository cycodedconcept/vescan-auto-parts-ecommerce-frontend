import { Link } from "react-router-dom";
import { X, Minus, Plus } from "lucide-react";
import { useCart } from "../../context/CartContext";
import Swal from "sweetalert2";

const FlyoutCart = () => {
  const {
    cart,
    flyoutOpen,
    closeFlyout,
    removeFromCart,
    updateQuantity,
    subtotal,
  } = useCart();

  const total = subtotal + (subtotal > 0 ? 135 : 0);

  const handleRemove = (item) => {
    Swal.fire({
      title: "Remove item?",
      text: `Remove "${item.name}" from your cart?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#001F3F",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Yes, remove it",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) removeFromCart(item.id);
    });
  };

  return (
    <>
      {/* Overlay */}
      {flyoutOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[60] transition-opacity"
          onClick={closeFlyout}
        />
      )}

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-[380px] bg-white z-[70] shadow-2xl transition-transform duration-300 flex flex-col overflow-hidden ${
          flyoutOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h2 className="font-heading text-2xl">Cart</h2>
          <button
            onClick={closeFlyout}
            className="text-heading hover:text-gray-600 transition-colors"
          >
            <X size={22} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cart.length === 0 ? (
            <p className="text-body text-sm text-center py-10">
              Your cart is empty.
            </p>
          ) : (
            <div className="flex flex-col divide-y divide-gray-100">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-3 py-4 first:pt-0">
                  {/* Image */}
                  <div className="w-16 h-16 bg-[#F3F5F7] rounded-md flex items-center justify-center flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain mix-blend-multiply p-1"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0 overflow-hidden">
                    {/* Name + Price row */}
                    <div className="flex items-baseline justify-between gap-2">
                      <h4 className="font-sans text-sm font-medium text-heading truncate">
                        {item.name}
                      </h4>
                      <span className="font-sans text-sm font-medium text-heading flex-shrink-0">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-xs text-body mt-0.5">
                      Quality: {item.quality}
                    </p>

                    {/* Remove + Quantity row */}
                    <div className="flex items-center justify-between mt-2">
                      <button
                        onClick={() => handleRemove(item)}
                        className="text-body hover:text-red-500 transition-colors"
                      >
                        <X size={14} />
                      </button>

                      <div className="flex items-center border border-gray-300 rounded-md">
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
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="px-6 py-5 border-t border-gray-100">
            <div className="flex justify-between mb-1">
              <span className="text-sm text-body">Subtotal</span>
              <span className="text-sm text-heading font-medium">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between mb-5">
              <span className="text-sm font-bold text-heading">Total</span>
              <span className="text-sm font-bold text-heading">
                ${total.toFixed(2)}
              </span>
            </div>

            <Link
              to="/cart"
              onClick={closeFlyout}
              className="hidden"
              aria-hidden
            >
              cart
            </Link>

            <button className="w-full bg-heading text-white font-sans font-bold text-sm py-3 rounded-lg hover:bg-black/90 transition-colors mb-3">
              Checkout
            </button>

            <Link
              to="/cart"
              onClick={closeFlyout}
              className="block text-center font-sans text-sm text-heading underline hover:no-underline"
            >
              View Cart
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default FlyoutCart;
