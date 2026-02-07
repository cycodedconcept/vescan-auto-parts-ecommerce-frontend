const AuthLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row">
      {/* Image Section - Stacked on mobile, Left side on Desktop */}
      <div className="relative h-[300px] w-full lg:h-auto lg:w-[736px] lg:shrink-0 bg-gray-200 overflow-hidden">
        {/* Placeholder for the 736x1080 image */}
        <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-300">
          {/* Replace with actual image later */}
          <span className="font-heading text-2xl">
            Image Placeholder (736x1080)
          </span>
        </div>

        {/* Logo Overlay (Optional based on design) */}
        <div className="absolute top-6 left-6 lg:top-8 lg:left-8">
          <span className="font-heading text-2xl font-bold text-white drop-shadow-md">
            VESCAN
          </span>
        </div>
      </div>

      {/* Content Section - Bottom on mobile, Right side on Desktop */}
      <div className="flex flex-1 flex-col items-center justify-center p-6 lg:p-12 bg-white">
        <div className="w-full max-w-[450px]">
          {/* Mobile-only Header (if needed, otherwise relying on page content) */}
          {/* Content Injection */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
