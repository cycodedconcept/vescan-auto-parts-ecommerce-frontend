import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { verifyOtp, confirmEmail } from "../services/authService";
import { alertSuccess, alertError } from "../utils/alert";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await verifyOtp(email, otp);
      if (data.status === "success") {
        navigate("/reset-password", { state: { email } });
      } else {
        alertError(data.message || "Invalid or expired OTP. Please try again.");
      }
    } catch {
      alertError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    try {
      await confirmEmail(email);
      alertSuccess("OTP resent successfully.");
    } catch {
      alertError("Failed to resend OTP. Please try again.");
    } finally {
      setResending(false);
    }
  };

  // Guard: if no email in state, redirect back
  if (!email) {
    return (
      <AuthLayout>
        <div className="w-full">
          <p className="font-sans text-body mb-4">Session expired. Please start again.</p>
          <Link to="/forgot-password" className="text-[#00BFFF] font-bold hover:underline font-sans text-sm">
            ← Back to Forgot Password
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <div className="w-full">
        <h1 className="text-4xl font-heading text-heading font-normal mb-2">
          Enter OTP
        </h1>
        <p className="font-sans text-body mb-8">
          We sent a code to <span className="font-bold text-heading">{email}</span>. Enter it below.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            id="otp"
            type="text"
            placeholder="Enter OTP code"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />

          <Button
            type="submit"
            loading={loading}
            className="!bg-[#001F3F] hover:!bg-[#001F3F]/90 text-white w-full disabled:opacity-60"
          >
            {loading ? "Verifying…" : "Verify OTP"}
          </Button>
        </form>

        <p className="font-sans text-body text-sm mt-6">
          Didn't receive a code?{" "}
          <button
            onClick={handleResend}
            disabled={resending}
            className="text-[#00BFFF] font-bold hover:underline disabled:opacity-60"
          >
            {resending ? "Resending…" : "Resend OTP"}
          </button>
        </p>
      </div>
    </AuthLayout>
  );
};

export default VerifyOtp;
