import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { useAuth } from "../context/AuthContext";
import { alertSuccess, alertError } from "../utils/alert";

const Signup = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    country: "",
    phone_number: "",
    password: "",
    password_confirmation: "",
  });
  const [loading, setLoading] = useState(false);

  const set = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.password_confirmation) {
      alertError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const data = await register(form);
      if (data.status === "success") {
        alertSuccess("Account created successfully!");
        navigate("/account");
      } else {
        alertError("Registration failed. Please check your details and try again.");
      }
    } catch {
      alertError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full">
        <h1 className="text-4xl font-heading mb-3 text-heading font-normal mb-4">
          Sign Up
        </h1>
        <p className="font-sans text-body mb-8">
          Already have an account?{" "}
          <Link to="/login" className="text-[#00BFFF] font-bold hover:underline">
            Sign In
          </Link>
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            id="signup-name"
            type="text"
            placeholder="Full name"
            value={form.name}
            onChange={set("name")}
            required
          />

          <Input
            id="signup-email"
            type="email"
            placeholder="Email address"
            value={form.email}
            onChange={set("email")}
            required
          />

          <Input
            id="signup-country"
            type="text"
            placeholder="Country"
            value={form.country}
            onChange={set("country")}
            required
          />

          <Input
            id="signup-phone"
            type="tel"
            placeholder="Phone number"
            value={form.phone_number}
            onChange={set("phone_number")}
            required
          />

          <Input
            id="signup-password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={set("password")}
            required
          />

          <Input
            id="signup-confirm-password"
            type="password"
            placeholder="Confirm password"
            value={form.password_confirmation}
            onChange={set("password_confirmation")}
            required
          />

          <div className="flex items-center gap-2 text-sm py-2 text-body">
            <input
              type="checkbox"
              id="agree-terms"
              className="w-4 h-4 rounded border-gray-300 text-[#001F3F] focus:ring-[#001F3F]"
              required
            />
            <label htmlFor="agree-terms" className="cursor-pointer">
              I agree with{" "}
              <Link to="/privacy" className="font-bold text-heading">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link to="/terms" className="font-bold text-heading">
                Terms of Use
              </Link>
            </label>
          </div>

          <Button
            type="submit"
            loading={loading}
            className="!bg-[#001F3F] hover:!bg-[#001F3F]/90 text-white w-full text-base disabled:opacity-60"
          >
            {loading ? "Creating account…" : "Sign Up"}
          </Button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Signup;
