import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const TimerBox = ({ value, label }) => (
  <div className="flex flex-col items-center">
    <div className="w-12 h-12 md:w-16 md:h-16 bg-white flex items-center justify-center mb-2">
      <span className="font-heading text-xl md:text-3xl font-bold text-heading">
        {String(value).padStart(2, "0")}
      </span>
    </div>
    <span className="text-[10px] md:text-xs text-white/80 uppercase tracking-wide">
      {label}
    </span>
  </div>
);

const LimitedEdition = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 12,
    minutes: 45,
    seconds: 5,
  });

  useEffect(() => {
    // Simple countdown simulation that resets or loops for demo purposes
    // In a real app, this would calculate difference from a specific target date
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0)
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0)
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0)
          return {
            ...prev,
            days: prev.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };
        return prev; // Expired
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full bg-[#001326]">
      <div className="w-full flex flex-col md:flex-row-reverse h-auto md:h-[532px]">
        {/* Right Content (Desktop) / Top Content (Mobile) -> Text Panel */}
        {/* On mobile this comes first naturally. On desktop flex-row-reverse puts it on the right. */}
        <div className="w-full md:w-1/2 p-8 md:p-16 lg:p-24 flex flex-col justify-center items-start text-white bg-[#001326]">
          <span className="font-bold text-[#00C2FF] text-sm md:text-base mb-2 md:mb-4 uppercase tracking-wider">
            Limited Edition
          </span>
          <h2 className="font-heading text-3xl md:text-5xl font-medium mb-4 leading-tight">
            Hurry Up! 30% OFF.
          </h2>
          <p className="font-sans text-gray-300 text-sm md:text-base mb-8">
            Find clubs that are right for your game
          </p>

          <p className="text-sm text-gray-400 mb-3">Offer expires in:</p>

          {/* Timer */}
          <div className="flex gap-3 md:gap-4 mb-8 md:mb-10">
            <TimerBox value={timeLeft.days} label="" />
            <TimerBox value={timeLeft.hours} label="" />
            <TimerBox value={timeLeft.minutes} label="" />
            <TimerBox value={timeLeft.seconds} label="" />
          </div>

          <Link
            to="/shop"
            className="bg-[#00C2FF] hover:bg-[#00A0D6] text-white font-sans font-bold text-sm md:text-base px-8 py-3 md:py-4 rounded-lg transition-colors shadow-lg"
          >
            Shop Now
          </Link>
        </div>

        {/* Left Image (Desktop) / Bottom Image (Mobile) */}
        <div className="w-full md:w-1/2 relative bg-gray-900">
          <img
            src="https://res.cloudinary.com/dmymwlqqw/image/upload/v1770636236/different-car-accessories-composition_vla4ku.jpg"
            alt="Limited Edition Auto Parts"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default LimitedEdition;
