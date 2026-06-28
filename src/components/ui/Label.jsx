export function Label({ htmlFor, children }) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-[13px] font-semibold text-gray-200 mb-1.5"
    >
      {children}
    </label>
  );
}
