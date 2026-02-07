import { Link } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

const Signup = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup logic here");
  };

  return (
    <AuthLayout>
      <div className="w-full">
        <h1 className="text-4xl font-heading mb-3 text-heading font-bold mb-4">Sign Up</h1>
        <p className="text-body mb-8">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-green-500 font-bold hover:underline"
          >
            Sign In
          </Link>
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input id="signup-name" type="text" placeholder="Your name" />

          <Input id="signup-username" type="text" placeholder="Username" />

          <Input id="signup-email" type="email" placeholder="Email address" />

          <Input id="signup-password" type="password" placeholder="Password" />

          <div className="flex items-center gap-2 text-sm py-2 text-body">
            <input
              type="checkbox"
              id="agree-terms"
              className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
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

          <Button type="submit">Sign Up</Button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Signup;
