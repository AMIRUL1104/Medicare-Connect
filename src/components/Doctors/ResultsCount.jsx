// Pure Server Component. Just displays a number — no interactivity.
export default function ResultsCount({ total }) {
  return (
    <p className="text-sm text-[#64748B]">
      <span className="font-semibold text-[#1E293B]">{total}</span>{" "}
      {total === 1 ? "doctor" : "doctors"} found
    </p>
  );
}
