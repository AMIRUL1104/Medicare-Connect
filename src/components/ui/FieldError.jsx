export function FieldError({ error }) {
  if (!error) return null;
  return (
    <p className="flex items-center gap-1 text-[#EF4444] text-xs mt-1">
      <span>⚠</span> {error.message}
    </p>
  );
}
