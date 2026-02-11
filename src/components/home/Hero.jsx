import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative w-full bg-black overflow-hidden flex flex-col md:block h-[90vh] md:h-[700px]">
      {/* Mobile Image (Top Half) */}
      <div className="w-full h-1/2 md:hidden relative bg-black">
        {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black z-10"></div> */}
        <img
          src="https://res.cloudinary.com/dmymwlqqw/image/upload/v1770758307/car-accessories-with-copy-space_mwgbf0.jpg"
          alt="Automotive Parts Background"
          className="w-full h-full object-cover object-center translate-y-4 scale-110"
        />
      </div>

      {/* Desktop Image (Full Background) */}
      <div className="hidden md:block absolute inset-0 z-0">
        <img
          src="https://res.cloudinary.com/dmymwlqqw/image/upload/v1770750099/heroimg_vtdyko.png"
          alt="Automotive Parts Background"
          className="w-full h-full object-cover opacity-60"
        />
        {/* <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div> */}
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-28 h-1/2 md:h-full flex flex-col justify-center items-center md:flex-row md:justify-start md:items-center text-center md:text-left bg-black md:bg-transparent">
        <div className="max-w-full md:max-w-xl w-full">
          <h1
            className="font-heading text-4xl md:text-6xl lg:text-[72px] text-white font-normal tracking-[-2px] leading-[1.1] lg:leading-[80px] mb-6 drop-shadow-xl"
            style={{
              maskImage:
                "linear-gradient(to bottom, transparent 0%, black 35%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 0%, black 35%)",
            }}
          >
            Get the Best <br />
            Vehicle Spare <br />
            Parts from Us
          </h1>

          <p className="font-sans text-gray-300 text-sm md:text-xl max-w-xs mx-auto md:mx-0 md:max-w-lg mb-8 md:mb-10 leading-relaxed drop-shadow-md">
            Reliable, Quality, and Affordable Automotive
            <br /> Parts for Mechanics and Towing Companies.
          </p>

          <Link
            to="/shop"
            className="inline-block bg-[#00C2FF] hover:bg-[#00A0D6] text-white font-sans font-bold text-sm md:text-lg px-8 py-3 md:py-4 rounded-lg transition-all transform hover:scale-105 shadow-lg shadow-blue-500/30"
          >
            Shopping Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
