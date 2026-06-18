"use client";

const levels = [
  { label: "Weak", color: "#EF4444" },
  { label: "Fair", color: "#F59E0B" },
  { label: "Good", color: "#0EA5E9" },
  { label: "Strong", color: "#10B981" },
];

function getScore(password) {
  if (!password) return 0;
  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/\d/.test(password)) score++;
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/.test(password)) score++;
  return score;
}

export default function PasswordStrength({ password }) {
  if (!password) return null;
  const score = getScore(password);
  const current = levels[score - 1] || levels[0];

  return (
    <div className="mt-2">
      <div className="flex gap-1.5 mb-1">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-1 flex-1 rounded-full transition-all duration-300"
            style={{ background: i < score ? current.color : "#E2E8F0" }}
          />
        ))}
      </div>
      <p className="text-xs" style={{ color: current.color }}>
        Password strength: <span className="font-semibold">{current.label}</span>
      </p>
    </div>
  );
}
