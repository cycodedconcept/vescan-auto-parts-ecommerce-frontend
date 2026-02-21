import { Link } from "react-router-dom";
import logo from "../../assets/logo4.png";

const Footer = () => {
  return (
    <footer className="bg-footer-bg text-footer-text font-sans text-sm w-full border-t border-gray-800">
      <div className="container mx-auto px-4 md:px-8 lg:px-28 py-12 min-h-[289px] flex flex-col justify-between items-center md:items-start">
        {/* Top Row: Logo & Nav */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-12 md:gap-6">
          {/* Left: Logo & Tagline */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 text-center md:text-left">
            <Link to="/" className="flex-shrink-0">
              <img
                src={logo}
                alt="Vescan Auto Parts"
                className="h-8 md:h-10 w-auto"
              />
            </Link>

            {/* Vertical Separator - Hidden on Mobile */}
            <div className="h-5 w-px bg-gray-600 hidden md:block"></div>

            {/* Tagline separator visual for mobile if needed, currently just spacing */}

            <span className="text-footer-text">
              Spare Parts | Towing Materials
            </span>
          </div>

          {/* Right: Navigation */}
          <nav className="flex flex-col md:flex-row items-center gap-8 font-medium">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <Link to="/shop" className="hover:text-white transition-colors">
              Shop
            </Link>
            <Link to="/product" className="hover:text-white transition-colors">
              Product
            </Link>
            <Link to="/blog" className="hover:text-white transition-colors">
              Blog
            </Link>
            <Link to="/contact" className="hover:text-white transition-colors">
              Contact Us
            </Link>
          </nav>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-[#7C797A] my-8"></div>

        {/* Bottom Row: Legal & Payments */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-12 md:gap-6 text-center md:text-left">
          {/* Left: Copyright & Links */}
          <div className="flex flex-col-reverse md:flex-row items-center gap-8 text-xs text-footer-text order-2 md:order-1 mt-4 md:mt-0">
            <span>Copyright © 2024 Vescan. All Rights Reserved.</span>
            <div className="hidden md:block h-3 w-px bg-gray-600"></div>
            <div className="flex gap-6 text-[#7C797A]">
              <Link
                to="/privacy"
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="hover:text-white text-[] transition-colors"
              >
                Terms of Use
              </Link>
            </div>
          </div>

          {/* Right: Payment Icons */}
          <div className="flex items-center gap-2 order-1 md:order-2">
            {[
              { name: "Visa", src: "/src/assets/icons/visa.png" },
              { name: "AMEX", src: "/src/assets/icons/AMEX.png" },
              { name: "Mastercard", src: "/src/assets/icons/Mastercard.png" },
              { name: "Stripe", src: "/src/assets/icons/Stripe.png" },
              { name: "PayPal", src: "/src/assets/icons/PayPal.png" },
              { name: "ApplePay", src: "/src/assets/icons/ApplePay.png" },
            ].map((payment) => (
              <div
                key={payment.name}
                className="bg-white rounded h-[32px] w-[48px] flex items-center justify-center overflow-hidden border border-gray-200"
              >
                <img
                  src={payment.src}
                  alt={payment.name}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
