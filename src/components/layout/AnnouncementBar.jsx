import { useState } from "react";
import { Link } from "react-router-dom";
import { TicketPercent, ArrowRight, X } from "lucide-react";

const AnnouncementBar = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-footer-bg text-white px-4 py-2 relative text-xs font-sans font-medium">
      <div className="container mx-auto flex items-center justify-center gap-4">
        {/* Content Wrapper */}
        <div className="flex items-center gap-2">
          <TicketPercent size={16} className="text-white" />
          <span>30% Off Storewide — Limited Time!</span>

          <Link
            to="/shop"
            className="flex items-center gap-1 border-b border-blue-400 pb-0.5 hover:text-blue-300 hover:border-blue-300 transition-colors ml-2"
          >
            Shop Now <ArrowRight size={12} />
          </Link>
        </div>
      </div>

      {/* Close Button - Absolute right */}
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
        aria-label="Close announcement"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default AnnouncementBar;
