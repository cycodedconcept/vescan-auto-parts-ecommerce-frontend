import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const Input = ({
  label,
  type = "text",
  placeholder,
  id,
  error,
  className = "",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="text-body text-xs font-bold uppercase tracking-wider mb-1"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <input
          id={id}
          type={isPassword && showPassword ? "text" : type}
          placeholder={placeholder}
          className={`
            w-full border-b border-gray-300 py-3 text-heading placeholder:text-body focus:border-primary focus:outline-none transition-colors
            ${error ? "border-red-500" : ""}
            ${isPassword ? "pr-10" : ""}
          `}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-0 top-1/2 -translate-y-1/2 text-body hover:text-heading"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>

      {error && <span className="text-sm text-red-500 mt-1">{error}</span>}
    </div>
  );
};

export default Input;
