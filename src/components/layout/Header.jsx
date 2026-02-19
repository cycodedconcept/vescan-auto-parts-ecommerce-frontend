import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  CircleUser,
  ShoppingBag,
  ChevronDown,
  Menu,
} from "lucide-react";
import logo from "../../assets/logo3.png";
import { useCart } from "../../context/CartContext";

const Header = () => {
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount, openFlyout } = useCart();

  const navLinkStyles =
    "text-sm font-sans text-heading leading-6 hover:text-gray-600 transition-colors flex items-center gap-1";

  // Mobile Nav Link Styles - larger touch targets
  const mobileNavLinkStyles =
    "text-lg font-sans text-heading font-medium py-2 border-b border-gray-100 w-full";

  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-6 md:px-12 lg:px-28 h-16 flex items-center justify-between">
        {/* Mobile Menu Icon */}
        <button
          className="md:hidden text-heading focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu size={24} />
        </button>

        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img src={logo} alt="Vescan Logo" className="h-8 md:h-10 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className={navLinkStyles}>
            Home
          </Link>

          {/* Shop Dropdown */}
          <div
            className="relative group"
            onMouseEnter={() => setIsShopOpen(true)}
            onMouseLeave={() => setIsShopOpen(false)}
          >
            <Link to="/shop" className={navLinkStyles}>
              Shop <ChevronDown size={14} />
            </Link>

            {/* Dropdown Menu - 2 Columns */}
            <div
              className={`absolute top-full left-0 w-[340px] bg-white shadow-lg border border-gray-100 rounded-md p-5 transition-all duration-200 ${
                isShopOpen
                  ? "opacity-100 visible translate-y-0"
                  : "opacity-0 invisible translate-y-2"
              }`}
            >
              <div className="grid grid-cols-2 gap-8">
                {/* Column 1 */}
                <div className="flex flex-col gap-3">
                  {["Oil Filters", "Spark Plugs", "Control Arms"].map(
                    (item) => (
                      <Link
                        key={item}
                        to={`/shop?category=${item
                          .toLowerCase()
                          .replace(" ", "-")}`}
                        className="text-sm text-body hover:text-heading font-medium"
                      >
                        {item}
                      </Link>
                    )
                  )}
                </div>

                {/* Column 2 */}
                <div className="flex flex-col gap-3">
                  {["Fuel Pumps", "Wheel Bearings", "Clutch Kits"].map(
                    (item) => (
                      <Link
                        key={item}
                        to={`/shop?category=${item
                          .toLowerCase()
                          .replace(" ", "-")}`}
                        className="text-sm text-body hover:text-heading font-medium"
                      >
                        {item}
                      </Link>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          <Link to="/shop" className={navLinkStyles}>
            Product
          </Link>
          <Link to="/blog" className={navLinkStyles}>
            Blog
          </Link>
          <Link to="/contact" className={navLinkStyles}>
            Contact Us
          </Link>
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-4 text-heading">
          <button className="hidden md:block hover:text-gray-600 transition-colors">
            <Search size={20} strokeWidth={1.5} />
          </button>
          <Link
            to="/login"
            className="hidden md:block hover:text-gray-600 transition-colors"
          >
            <CircleUser size={20} strokeWidth={1.5} />
          </Link>
          <button
            onClick={openFlyout}
            className="relative hover:text-gray-600 transition-colors"
          >
            <ShoppingBag size={20} strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-heading text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-lg flex flex-col px-4 py-4 transition-all duration-300 ease-in-out origin-top ${
          isMobileMenuOpen
            ? "opacity-100 visible scale-y-100"
            : "opacity-0 invisible scale-y-0 h-0"
        }`}
      >
        <Link
          to="/"
          className={mobileNavLinkStyles}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Home
        </Link>
        <Link
          to="/shop"
          className={mobileNavLinkStyles}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Shop
        </Link>
        <Link
          to="/product"
          className={mobileNavLinkStyles}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Product
        </Link>
        <Link
          to="/blog"
          className={mobileNavLinkStyles}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Blog
        </Link>
        <Link
          to="/contact"
          className={mobileNavLinkStyles}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Contact Us
        </Link>

        {/* Mobile Icons Row */}
        <div className="flex items-center gap-6 mt-4 pt-4 border-t border-gray-100">
          <button className="flex items-center gap-2 text-heading font-medium">
            <Search size={20} /> Search
          </button>
          <Link
            to="/login"
            className="flex items-center gap-2 text-heading font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <CircleUser size={20} /> Login
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
