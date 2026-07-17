"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LogOut,
  X,
  Menu,
  Home,
  RotateCcw,
  Sparkles,
  Wallet,
  ShoppingBag,
  Send,
  Settings,
  BookOpen,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  icon?: React.ReactNode;
  pigIcon?: string;
  badge?: number;
};

export type NavSection = {
  title?: string;
  items: NavItem[];
};

// Icon map for prettier icons
const ICON_MAP: Record<string, { icon: LucideIcon; gradient: string; iconColor: string }> = {
  "/app":           { icon: Home,       gradient: "from-rose-400 to-pink-500",   iconColor: "text-white" },
  "/app/refunds":   { icon: RotateCcw,  gradient: "from-primary to-pink-400",    iconColor: "text-white" },
  "/app/deals":     { icon: Sparkles,   gradient: "from-amber-400 to-orange-400",iconColor: "text-white" },
  "/app/wallet":    { icon: Wallet,     gradient: "from-emerald-400 to-teal-500",iconColor: "text-white" },
  "/app/orders":    { icon: ShoppingBag,gradient: "from-blue-400 to-indigo-500", iconColor: "text-white" },
  "/app/telegram":  { icon: Send,       gradient: "from-sky-400 to-cyan-500",    iconColor: "text-white" },
  "/app/settings":  { icon: Settings,   gradient: "from-slate-400 to-gray-500",  iconColor: "text-white" },
  "/app/guide":     { icon: BookOpen,   gradient: "from-violet-400 to-purple-500",iconColor: "text-white" },
};

export function Sidebar({
  brandName,
  brandSubtitle,
  sections,
}: {
  brandName: string;
  brandSubtitle: string;
  sections: NavSection[];
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => { setIsOpen(false); }, [pathname]);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  function isActive(href: string) {
    if (href === "/admin" || href === "/app") return pathname === href;
    return pathname === href || pathname.startsWith(href + "/");
  }

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      {/* ── Brand header ── */}
      <div className="flex items-center justify-between px-5 pt-5 pb-4">
        <Link href="/app" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-primary/30 blur-md scale-110" />
            <img
              src="/nhimchaomung.png"
              alt="Nhím"
              className="relative h-9 w-9 rounded-full object-cover ring-2 ring-primary/30 shadow-md"
            />
          </div>
          <div>
            <div className="font-black text-[15px] text-primary tracking-tight leading-tight">Nhím</div>
            <div className="text-[10px] font-semibold text-mute/60 tracking-wide uppercase leading-tight">Cashback</div>
          </div>
        </Link>
        <button
          className="md:hidden p-1.5 rounded-xl bg-ink/5 text-mute hover:text-ink hover:bg-ink/10 transition-colors"
          onClick={() => setIsOpen(false)}
        >
          <X size={16} strokeWidth={2.5} />
        </button>
      </div>

      {/* ── User card ── */}
      <div className="mx-4 mb-5 rounded-2xl bg-gradient-to-br from-primary/8 to-primary/4 border border-primary/10 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-pink-400 flex items-center justify-center shadow-sm">
              <span className="text-white font-black text-[14px]">
                {brandName.split(" ").at(-1)?.[0]?.toUpperCase() ?? "U"}
              </span>
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 border-2 border-white shadow-sm" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-[13px] font-bold text-ink leading-tight">{brandName}</div>
            <div className="text-[11px] text-mute/70 font-medium mt-0.5">{brandSubtitle}</div>
          </div>
          <ChevronRight size={14} className="shrink-0 text-mute/40" />
        </div>
      </div>

      {/* ── Nav ── */}
      <nav className="flex-1 overflow-y-auto px-3 pb-4 space-y-5">
        {sections.map((section, si) => (
          <div key={si}>
            {section.title && (
              <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-[0.1em] text-mute/50">
                {section.title}
              </div>
            )}
            <div className="space-y-1">
              {section.items.map((item) => {
                const active = isActive(item.href);
                const meta = ICON_MAP[item.href];
                const IconComp = meta?.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group relative flex items-center gap-3 rounded-2xl px-3 py-2.5 transition-all duration-200 ${
                      active
                        ? "bg-white shadow-sm shadow-primary/10 ring-1 ring-primary/10"
                        : "hover:bg-white/60 hover:shadow-sm"
                    }`}
                  >
                    {/* Icon box */}
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl shadow-sm transition-all duration-200 ${
                        meta
                          ? `bg-gradient-to-br ${meta.gradient}`
                          : active
                          ? "bg-primary"
                          : "bg-ink/8 group-hover:bg-ink/12"
                      } ${active ? "shadow-md" : ""}`}
                    >
                      {meta && IconComp ? (
                        <IconComp size={16} strokeWidth={2.25} className="text-white" />
                      ) : item.pigIcon ? (
                        <img src={item.pigIcon} alt="" className="h-5 w-5 object-contain" />
                      ) : (
                        <span className={active ? "text-white" : "text-mute"}>
                          {item.icon}
                        </span>
                      )}
                    </div>

                    {/* Label */}
                    <span
                      className={`flex-1 text-[13.5px] font-semibold leading-tight truncate transition-colors ${
                        active ? "text-ink font-bold" : "text-mute/80 group-hover:text-ink"
                      }`}
                    >
                      {item.label}
                    </span>

                    {/* Badge or active dot */}
                    {item.badge && item.badge > 0 ? (
                      <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-black text-white shadow-sm">
                        {item.badge > 99 ? "99+" : item.badge}
                      </span>
                    ) : active ? (
                      <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-sm shadow-primary/50" />
                    ) : (
                      <ChevronRight
                        size={13}
                        className="text-mute/30 opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* ── Footer ── */}
      <div className="px-3 pb-5 pt-3 border-t border-ink/5">
        <button
          onClick={handleLogout}
          className="group flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-all duration-200 hover:bg-red-50"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-50 group-hover:bg-red-100 transition-colors">
            <LogOut size={16} strokeWidth={2.25} className="text-red-400" />
          </div>
          <span className="text-[13.5px] font-semibold text-red-400 group-hover:text-red-500 transition-colors">
            Đăng xuất
          </span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile trigger */}
      <div className="md:hidden fixed top-3 right-3 z-30">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-1.5 rounded-full bg-white pl-2.5 pr-3.5 py-2 shadow-lg ring-1 ring-black/[0.06] text-[13px] font-bold text-ink"
        >
          <Menu size={16} strokeWidth={2.5} />
          Menu
        </button>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`
          fixed inset-y-0 right-0 z-50 w-[268px] bg-canvas/95 backdrop-blur-xl border-l border-ink/5 shadow-2xl
          md:relative md:inset-auto md:right-auto md:left-0 md:w-[240px] md:border-l-0 md:border-r md:shadow-none md:backdrop-blur-none md:bg-[#fafafa]
          transition-transform duration-300 flex flex-col
          ${isOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"}
        `}
      >
        <SidebarContent />
      </aside>
    </>
  );
}
