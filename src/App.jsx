import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import CartLayout from "./layouts/CartLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/ProductDetail";
import { CartProvider } from "./context/CartContext";
import FlyoutCart from "./components/cart/FlyoutCart";

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
          <Routes>
            {/* Auth Routes - Standalone */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Main App Routes - With Header, Newsletter & Footer */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="shop" element={<Shop />} />
              <Route path="product/:id" element={<ProductDetail />} />
            </Route>

            {/* Cart Route - No Newsletter */}
            <Route path="/" element={<CartLayout />}>
              <Route path="cart" element={<Cart />} />
            </Route>

            {/* Catch all - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          {/* Global Flyout Cart */}
          <FlyoutCart />
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
