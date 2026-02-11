import { Mail } from "lucide-react";

const Newsletter = () => {
  return (
    <section className="w-full flex justify-center bg-[#141718]">
      <div className="w-full max-w-[1440px] h-[360px] relative flex items-center justify-center overflow-hidden">
        {/* Placeholder Background Image */}
        <img
          src="https://res.cloudinary.com/dmymwlqqw/image/upload/v1770637600/3d-rendering-hydraulic-elements_bleiba.jpg"
          alt="Newsletter Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/80 mix-blend-multiply" />

        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col items-center text-center px-4">
          <h2 className="font-heading font-medium text-4xl md:text-5xl text-[#FEFEFE] mb-4 tracking-wide">
            Join Our Newsletter
          </h2>

          <p className="font-sans text-[#E8ECEF] text-sm md:text-base mb-8">
            Sign up for deals, new products and promotions
          </p>

          <form className="w-full max-w-md flex items-center border-b border-gray-400 pb-2 focus-within:border-white transition-colors">
            <Mail className="text-[#E8ECEF] mr-3" size={20} />
            <input
              type="email"
              placeholder="Email Address"
              className="bg-transparent border-none outline-none text-white placeholder-gray-400 flex-grow font-sans text-sm"
            />
            <button
              type="button"
              className="text-[#E8ECEF] font-sans text-sm font-medium hover:text-white transition-colors uppercase tracking-wider ml-2"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
