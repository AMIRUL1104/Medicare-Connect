import { useState } from "react";
import { Input } from "./Input";

export function PasswordInput({
  id,
  hasError,
  register,
  name,
  validationRules,
  ...props
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <Input
        id={id}
        type={show ? "text" : "password"}
        hasError={hasError}
        className="pr-10"
        {...register(name, validationRules)}
        {...props}
      />
      <button
        type="button"
        onClick={() => setShow((v) => !v)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#0EA5E9] transition-colors text-base"
        tabIndex={-1}
        aria-label={show ? "Hide password" : "Show password"}
      >
        {show ? "🙈" : "👁"}
      </button>
    </div>
  );
}
