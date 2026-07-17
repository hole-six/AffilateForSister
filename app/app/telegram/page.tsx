import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { TelegramLinkCard } from "@/components/customer/TelegramLinkCard";
import { Send, Zap, Bell, MessageCircle } from "lucide-react";

export default async function CustomerTelegramPage() {
  const session = await getSession();
  if (!session?.customerId) redirect("/admin");

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-xl pb-2xl fade-in">
      {/* ══ HERO ══ */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-400 via-cyan-500 to-blue-500 px-xl py-2xl shadow-xl shadow-sky-400/20">
        <div className="pointer-events-none absolute -top-10 -right-10 h-44 w-44 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-6 left-1/3 h-28 w-28 rounded-full bg-white/10 blur-2xl" />
        <img
          src="/nhimtinnhan.png"
          alt=""
          aria-hidden="true"
          className="absolute right-4 bottom-0 h-28 w-28 object-contain opacity-25 pointer-events-none select-none"
        />
        <div className="relative z-10">
          <p className="text-white/60 text-[11px] font-bold uppercase tracking-widest mb-xs">Bot Telegram</p>
          <h1 className="font-black text-[28px] md:text-[34px] text-white leading-tight tracking-tight mb-sm">
            Liên kết Telegram
          </h1>
          <p className="text-white/75 text-[14px] leading-relaxed max-w-lg mb-lg">
            Gửi link Shopee vào bot — nhận link hoàn tiền trong 1 giây. Thông báo tự động khi đơn được duyệt.
          </p>
          <div className="flex flex-wrap gap-sm">
            {[
              { icon: Zap, label: "Đổi link tức thì" },
              { icon: Bell, label: "Thông báo đơn hàng" },
              { icon: MessageCircle, label: "Chat trực tiếp" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-xs bg-white/15 backdrop-blur-sm border border-white/20 text-white text-[12px] font-semibold px-md py-[5px] rounded-full">
                <Icon size={12} strokeWidth={2.5} />
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ HOW IT WORKS ══ */}
      <div className="grid grid-cols-3 gap-md">
        {[
          { step: "1", icon: Send, title: "Liên kết", desc: "Tạo mã & xác nhận trong bot", color: "from-sky-400 to-cyan-500" },
          { step: "2", icon: MessageCircle, title: "Gửi link", desc: "Paste link Shopee vào chat", color: "from-primary to-pink-400" },
          { step: "3", icon: Zap, title: "Nhận ngay", desc: "Bot trả về link hoàn tiền", color: "from-emerald-400 to-teal-500" },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.step} className="flex flex-col items-center text-center gap-sm p-lg rounded-2xl bg-white shadow-sm ring-1 ring-black/[0.05]">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${s.color} shadow-sm`}>
                <Icon size={18} strokeWidth={2} className="text-white" />
              </div>
              <div>
                <div className="font-black text-[14px] text-ink">{s.title}</div>
                <div className="text-[11px] text-mute mt-[2px] leading-snug">{s.desc}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ══ LINK CARD ══ */}
      <TelegramLinkCard />
    </div>
  );
}
