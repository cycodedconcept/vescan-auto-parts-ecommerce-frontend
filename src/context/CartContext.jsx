/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useEffect,
} from "react";

const CartContext = createContext();
const CART_STORAGE_KEY = "vescan_cart";

const loadCart = () => {
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find((i) => i.id === action.item.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === action.item.id
              ? { ...i, quantity: i.quantity + (action.qty || 1) }
              : i
          ),
        };
      }
      return {
        ...state,
        items: [
          ...state.items,
          { ...action.item, quantity: action.qty || 1, quality: "Excellent" },
        ],
      };
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.id),
      };
    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.id
            ? { ...i, quantity: Math.max(1, action.quantity) }
            : i
        ),
      };
    case "TOGGLE_FLYOUT":
      return { ...state, flyoutOpen: !state.flyoutOpen };
    case "CLOSE_FLYOUT":
      return { ...state, flyoutOpen: false };
    case "OPEN_FLYOUT":
      return { ...state, flyoutOpen: true };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: loadCart(),
    flyoutOpen: false,
  });

  // Persist cart to localStorage on every change
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
  }, [state.items]);

  const addToCart = useCallback(
    (item, qty) => dispatch({ type: "ADD_ITEM", item, qty }),
    []
  );
  const removeFromCart = useCallback(
    (id) => dispatch({ type: "REMOVE_ITEM", id }),
    []
  );
  const updateQuantity = useCallback(
    (id, quantity) => dispatch({ type: "UPDATE_QUANTITY", id, quantity }),
    []
  );
  const toggleFlyout = useCallback(
    () => dispatch({ type: "TOGGLE_FLYOUT" }),
    []
  );
  const closeFlyout = useCallback(() => dispatch({ type: "CLOSE_FLYOUT" }), []);
  const openFlyout = useCallback(() => dispatch({ type: "OPEN_FLYOUT" }), []);

  const cartCount = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = state.items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart: state.items,
        flyoutOpen: state.flyoutOpen,
        cartCount,
        subtotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleFlyout,
        closeFlyout,
        openFlyout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
