import { Link } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login logic here");
  };

  return (
    <AuthLayout>
      <div className="w-full">
        <h1 className="text-4xl font-heading mb-3 text-heading font-bold mb-8 md:mb-4">Sign In</h1>
        <p className="text-body mb-8">
          Don’t have an account yet?{" "}
          <Link
            to="/signup"
            className="text-green-500 font-bold hover:underline"
          >
            Sign Up
          </Link>
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            id="login-identifier"
            type="text"
            placeholder="Your username or email address"
          />

          <Input id="login-password" type="password" placeholder="Password" />

          <div className="flex items-center justify-between text-sm py-2">
            <label className="flex items-center gap-2 cursor-pointer text-body">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              Remember me
            </label>

            <Link
              to="/forgot-password"
              className="font-bold text-heading hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <Button type="submit">Sign In</Button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
