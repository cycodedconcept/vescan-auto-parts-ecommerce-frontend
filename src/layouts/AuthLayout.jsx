import loginImage from "../assets/loginimage.jpg";
import logo from "../assets/logo4.png";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row">
      {/* Image Section - 50% width on Desktop */}
      <div className="relative h-[430px]  w-full lg:h-auto lg:w-1/2 lg:shrink-0 bg-gray-900 overflow-hidden">
        <img
          src={loginImage}
          alt="Authentication Background"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>{" "}
        {/* Dark Overlay */}
        {/* Logo Overlay */}
        <div className="absolute top-8 left-0 right-0 flex justify-center">
          <img src={logo} alt="Vescan Logo" className="h-12 w-auto" />
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
