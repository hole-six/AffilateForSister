export function PageHeader({
  title,
  subtitle,
  action,
  icon,
  stats,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  icon?: string;
  stats?: { label: string; value: string }[];
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-lg fade-in">
      <div className="flex items-center gap-md">
        {icon && (
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary-neutral ring-1 ring-primary/10">
            <img src={icon} alt="" className="h-8 w-8 object-contain" />
          </div>
        )}
        <div>
          <h1 className="text-[22px] font-black tracking-tight text-ink">{title}</h1>
          {subtitle && (
            <p className="mt-1 text-[14px] text-mute font-medium">{subtitle}</p>
          )}
          {stats && stats.length > 0 && (
            <div className="mt-sm flex flex-wrap items-center gap-sm">
              {stats.map((s) => (
                <span
                  key={s.label}
                  className="inline-flex items-center gap-xs rounded-pill bg-canvas-soft px-md py-[3px] text-[12px] font-bold text-ink ring-1 ring-black/[0.05]"
                >
                  <span className="text-mute font-medium">{s.label}</span>
                  {s.value}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      {action && <div className="flex items-center gap-sm shrink-0">{action}</div>}
    </div>
  );
}
