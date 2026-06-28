import { useState } from "react";
import { Input } from "./Input";

export function PasswordInput({
  id,
  hasError,
  register,
  name,
  validationRules,
  className,
  ...props
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <Input
        id={id}
        type={show ? "text" : "password"}
        hasError={hasError}
        className={`pr-10 ${className || ""}`}
        {...register(name, validationRules)}
        {...props}
      />
      <button
        type="button"
        onClick={() => setShow((v) => !v)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#38BDF8] transition-colors text-base"
        tabIndex={-1}
        aria-label={show ? "Hide password" : "Show password"}
      >
        {show ? "🙈" : "👁"}
      </button>
    </div>
  );
}
