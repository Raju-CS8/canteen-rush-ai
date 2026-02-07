import { RushLevel } from "@/lib/data";

const config: Record<RushLevel, { bg: string; text: string; dot: string }> = {
  Low: { bg: "bg-rush-low-bg", text: "text-rush-low", dot: "bg-rush-low" },
  Medium: { bg: "bg-rush-medium-bg", text: "text-rush-medium", dot: "bg-rush-medium" },
  High: { bg: "bg-rush-high-bg", text: "text-rush-high", dot: "bg-rush-high" },
};

export function RushBadge({ level }: { level: RushLevel }) {
  const c = config[level];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${c.bg} ${c.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {level} Rush
    </span>
  );
}
