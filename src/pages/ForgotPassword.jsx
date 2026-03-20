import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { confirmEmail } from "../services/authService";
import { alertSuccess, alertError } from "../utils/alert";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await confirmEmail(email);
      if (data.status === "success") {
        alertSuccess("OTP sent to your email.");
        navigate("/verify-otp", { state: { email } });
      } else {
        alertError("No account found with that email address.");
      }
    } catch {
      alertError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full">
        <h1 className="text-4xl font-heading text-heading font-normal mb-2">
          Forgot Password
        </h1>
        <p className="font-sans text-body mb-8">
          Enter your email and we'll send you an OTP to reset your password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            id="forgot-email"
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Button
            type="submit"
            loading={loading}
            className="!bg-[#001F3F] hover:!bg-[#001F3F]/90 text-white w-full disabled:opacity-60"
          >
            {loading ? "Sending OTP…" : "Send OTP"}
          </Button>
        </form>

        <p className="font-sans text-body text-sm mt-6">
          Remember your password?{" "}
          <Link to="/login" className="text-[#00BFFF] font-bold hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
