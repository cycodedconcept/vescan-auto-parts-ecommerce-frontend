import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { resetPassword } from "../services/authService";
import Swal from "sweetalert2";
import { alertSuccess, alertError } from "../utils/alert";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      alertError("Passwords do not match.");
      return;
    }

    const result = await Swal.fire({
      title: "Reset your password?",
      text: "This will permanently replace your current password.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#001F3F",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Yes, reset it",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    setLoading(true);
    try {
      const data = await resetPassword(email, password, passwordConfirmation);
      if (data.status === "success") {
        alertSuccess("Password reset successfully. Please log in.");
        navigate("/login");
      } else {
        alertError(data.message || "Failed to reset password. Please try again.");
      }
    } catch {
      alertError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
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
          Reset Password
        </h1>
        <p className="font-sans text-body mb-8">
          Enter your new password below.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            id="new-password"
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Input
            id="confirm-password"
            type="password"
            placeholder="Confirm new password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required
          />

          <Button
            type="submit"
            loading={loading}
            className="!bg-[#001F3F] hover:!bg-[#001F3F]/90 text-white w-full disabled:opacity-60"
          >
            {loading ? "Resetting…" : "Reset Password"}
          </Button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default ResetPassword;
