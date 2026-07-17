import { LucideIcon } from "lucide-react";

const toneConfig = {
  default: {
    gradient: "from-slate-400 to-gray-500",
    bg: "bg-slate-50",
    text: "text-slate-600",
    value: "text-slate-800",
    nhim: "/nhimchodoi.png",
  },
  positive: {
    gradient: "from-emerald-400 to-teal-500",
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    value: "text-emerald-700",
    nhim: "/nhimmagiamgia.png",
  },
  warning: {
    gradient: "from-amber-400 to-orange-400",
    bg: "bg-amber-50",
    text: "text-amber-600",
    value: "text-amber-700",
    nhim: "/nhimthongbao.png",
  },
  negative: {
    gradient: "from-red-400 to-rose-500",
    bg: "bg-red-50",
    text: "text-red-600",
    value: "text-red-700",
    nhim: "/nhimchaomung.png",
  },
};

export function StatCard({
  icon: Icon,
  label,
  value,
  tag,
  tone = "default",
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  tag?: string;
  tone?: "default" | "positive" | "warning" | "negative";
}) {
  const cfg = toneConfig[tone];

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white p-lg shadow-sm ring-1 ring-black/[0.05] transition-all hover:-translate-y-0.5 hover:shadow-md">
      {/* Top accent strip */}
      <div className={`absolute inset-x-0 top-0 h-[3px] rounded-t-2xl bg-gradient-to-r ${cfg.gradient}`} />

      <div className="flex items-start justify-between mb-md pt-xs">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl overflow-hidden bg-white shadow-sm ring-1 ring-black/[0.06]">
          <img src={cfg.nhim} alt="" className="h-9 w-9 object-contain" />
        </div>
        {tag && (
          <span className={`rounded-full ${cfg.bg} ${cfg.text} px-sm py-[3px] text-[10px] font-bold`}>
            {tag}
          </span>
        )}
      </div>

      <div className="text-[11px] font-semibold uppercase tracking-wider text-ink/40 mb-xs">{label}</div>
      <div className={`text-[20px] font-black tabular-nums leading-tight ${cfg.value}`}>{value}</div>
    </div>
  );
}
