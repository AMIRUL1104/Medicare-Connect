export function Label({ htmlFor, children }) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-[13px] font-semibold text-[#1E293B] mb-1.5"
    >
      {children}
    </label>
  );
}
