import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";
import { alertSuccess } from "../utils/alert";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await login(email, password);
      if (data.status === "success") {
        alertSuccess("Welcome back!");
        navigate("/account");
      } else {
        await Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Invalid email or password. Please try again.",
          confirmButtonColor: "#001F3F",
        });
      }
    } catch {
      await Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Something went wrong. Please check your credentials and try again.",
        confirmButtonColor: "#001F3F",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full">
        <h1 className="text-4xl font-heading mb-3 text-heading font-normal mb-2">
          Sign In
        </h1>
        <p className="font-sans text-body mb-8">
          Don't have an account yet?{" "}
          <Link to="/signup" className="text-[#00BFFF] font-bold hover:underline">
            Sign Up
          </Link>
        </p>

        <form onSubmit={handleSubmit} className="space-y-7">
          <Input
            id="login-email"
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            id="login-password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="flex items-center justify-between text-sm py-1">
            <label className="flex items-center gap-2 cursor-pointer text-body">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 text-[#001F3F] focus:ring-[#001F3F]"
              />
              Remember me
            </label>

            <Link
              to="/forgot-password"
              className="font-bold text-heading hover:underline text-[#001F3F]"
            >
              Forgot Password?
            </Link>
          </div>

          <Button
            type="submit"
            loading={loading}
            className="!bg-[#001F3F] hover:!bg-[#001F3F]/90 text-white w-full disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign In"}
          </Button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
