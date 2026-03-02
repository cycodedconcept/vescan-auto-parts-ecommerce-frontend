import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";
import Values from "../components/home/Values";

/* ───────── Contact Info Card ───────── */
const InfoCard = ({ icon, label, value }) => (
  <div className="flex-1 bg-[#F3F5F7] rounded-lg px-6 py-8 flex flex-col items-center gap-3 text-center">
    <div className="text-heading">{icon}</div>
    <p className="font-sans text-xs uppercase tracking-widest font-bold text-[#030206]">
      {label}
    </p>
    <p className="font-sans text-sm font-medium text-[#030206]">{value}</p>
  </div>
);

/* ───────── Contact Page ───────── */
const Contact = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: wire to API
  };

  return (
    <div>
      <div className="container mx-auto px-6 md:px-12 lg:px-28 py-8 md:py-12">

        {/* ── Breadcrumb ── */}
        <nav className="flex items-center gap-2 text-sm text-body mb-8">
          <Link to="/" className="hover:text-heading transition-colors">
            Home
          </Link>
          <span>›</span>
          <span className="text-heading font-medium">Contact Us</span>
        </nav>

        {/* ── Intro ── */}
        <div className="mb-10 md:mb-14">
          <h1 className="font-heading text-3xl md:text-5xl font-bold text-[#030206] leading-tight mb-5 max-w-2xl">
            We believe in sustainable products. We&apos;re passionate about you
            and your vehicle lives.
          </h1>
          <p className="font-sans text-sm md:text-base text-[#030206] leading-relaxed max-w-xl">
            As Vescan continues to expand its offerings, the company is poised
            to become a leader in the automotive repair industry. Future
            developments include the introduction of advanced analytics tools
            that will allow users to track their purchasing patterns and
            optimize their inventory management. Vescan also plans to launch a
            mobile app, further enhancing accessibility and convenience for its
            users.
          </p>
        </div>

        {/* ── Image + About Us ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 mb-12 md:mb-16 rounded-lg overflow-hidden">
          {/* Image */}
          <div className="bg-[#F3F5F7] h-64 md:h-auto overflow-hidden">
            <img
              src="https://res.cloudinary.com/dmymwlqqw/image/upload/v1770636236/different-car-accessories-composition_vla4ku.jpg"
              alt="Auto parts"
              className="w-full h-full object-cover"
            />
          </div>

          {/* About Us panel */}
          <div className="bg-white border border-gray-100 flex flex-col justify-center px-8 md:px-12 py-8 md:py-12">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-[#030206] mb-4">
              About Us
            </h2>
            <p className="font-sans text-sm md:text-base text-[#030206] leading-relaxed mb-6">
              <span className="text-[#F86624] font-medium">Vescan</span> is a
              leading provider of automotive spare parts, dedicated to
              empowering mechanics and towing companies with high-quality,
              reliable products.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-1 font-sans text-sm font-bold text-heading hover:underline"
            >
              Shop Now →
            </Link>
          </div>
        </div>

        {/* ── Contact Us heading ── */}
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-[#030206] text-center mb-8">
          Contact Us
        </h2>

        {/* ── Info Cards ── */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <InfoCard
            icon={<MapPin size={28} strokeWidth={1.5} />}
            label="Address"
            value="234, Maryland, Ikeja, Lagos State."
          />
          <InfoCard
            icon={<Phone size={28} strokeWidth={1.5} />}
            label="Contact Us"
            value="+234 8177 960 456"
          />
          <InfoCard
            icon={<Mail size={28} strokeWidth={1.5} />}
            label="Email"
            value="hello@vescan.com"
          />
        </div>

        {/* ── Form + Map ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="font-sans text-xs font-bold uppercase tracking-wide text-body">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 font-sans text-sm text-heading placeholder:text-gray-400 focus:outline-none focus:border-heading transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-sans text-xs font-bold uppercase tracking-wide text-body">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 font-sans text-sm text-heading placeholder:text-gray-400 focus:outline-none focus:border-heading transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-sans text-xs font-bold uppercase tracking-wide text-body">
                Message
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Your message"
                rows={6}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 font-sans text-sm text-heading placeholder:text-gray-400 focus:outline-none focus:border-heading transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-heading text-white font-sans font-bold text-sm py-3.5 rounded-lg hover:bg-black/90 transition-colors"
            >
              Send Message
            </button>
          </form>

          {/* Map */}
          <div className="w-full h-64 md:h-full min-h-[320px] rounded-lg overflow-hidden">
            <iframe
              title="Vescan Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.0!2d3.3642!3d6.5756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2e4a9c7b1f%3A0x1d7f9c8d6e5a4b3c!2sMaryland%2C%20Ikeja%2C%20Lagos!5e0!3m2!1sen!2sng!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "320px" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

      {/* ── Values ── */}
      <Values />
    </div>
  );
};

export default Contact;
