import { redirect } from "next/navigation";
import { ShieldCheck, Smartphone, Lock } from "lucide-react";
import { getSession } from "@/lib/auth";
import { ChangePasswordForm } from "@/components/account/ChangePasswordForm";
import { PwaInstallSettingsCard } from "@/components/pwa/PwaInstallPrompt";

export default async function CustomerSettingsPage() {
  const session = await getSession();
  if (!session?.customerId) redirect("/admin");

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-xl pb-2xl fade-in">
      {/* ══ HERO ══ */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-600 via-slate-700 to-gray-800 px-xl py-2xl shadow-xl shadow-slate-700/20">
        <div className="pointer-events-none absolute -top-10 -right-10 h-44 w-44 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-6 left-1/3 h-28 w-28 rounded-full bg-white/10 blur-2xl" />
        <img
          src="/nhimbaomat.png"
          alt=""
          aria-hidden="true"
          className="absolute right-4 bottom-0 h-28 w-28 object-contain opacity-20 pointer-events-none select-none"
        />
        <div className="relative z-10">
          <p className="text-white/60 text-[11px] font-bold uppercase tracking-widest mb-xs">Tài khoản</p>
          <h1 className="font-black text-[28px] md:text-[34px] text-white leading-tight tracking-tight mb-sm">
            Cài đặt & Bảo mật
          </h1>
          <p className="text-white/75 text-[14px] leading-relaxed max-w-lg">
            Quản lý bảo mật và tuỳ chọn ứng dụng của bạn.
          </p>
        </div>
      </div>

      {/* ══ PWA ══ */}
      <div className="rounded-3xl bg-white shadow-sm ring-1 ring-black/[0.05] overflow-hidden">
        <div className="flex items-center gap-md px-xl pt-xl pb-lg border-b border-gray-50">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-400 to-purple-500 shadow-sm">
            <Smartphone size={18} strokeWidth={2} className="text-white" />
          </div>
          <div>
            <h2 className="font-black text-[15px] text-ink">Cài đặt ứng dụng</h2>
            <p className="text-[12px] text-mute">Thêm Nhím vào màn hình chính</p>
          </div>
        </div>
        <div className="p-xl">
          <PwaInstallSettingsCard />
        </div>
      </div>

      {/* ══ PASSWORD ══ */}
      <div className="rounded-3xl bg-white shadow-sm ring-1 ring-black/[0.05] overflow-hidden">
        <div className="flex items-center gap-md px-xl pt-xl pb-lg border-b border-gray-50">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-pink-400 shadow-sm">
            <Lock size={18} strokeWidth={2} className="text-white" />
          </div>
          <div>
            <h2 className="font-black text-[15px] text-ink">Đổi mật khẩu</h2>
            <p className="text-[12px] text-mute">Cập nhật mật khẩu để bảo vệ tài khoản</p>
          </div>
        </div>
        <div className="p-xl">
          <ChangePasswordForm />
        </div>
      </div>

      {/* ══ SECURITY TIPS ══ */}
      <div className="rounded-3xl bg-white shadow-sm ring-1 ring-black/[0.05] p-xl">
        <div className="flex items-center gap-sm mb-lg">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 shadow-sm">
            <ShieldCheck size={16} strokeWidth={2} className="text-white" />
          </div>
          <h3 className="font-black text-[15px] text-ink">Mẹo bảo mật</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
          {[
            { icon: "🔑", tip: "Dùng mật khẩu dài hơn 8 ký tự, kết hợp chữ hoa, số và ký tự đặc biệt." },
            { icon: "🔒", tip: "Không chia sẻ mật khẩu với bất kỳ ai, kể cả nhân viên hỗ trợ." },
            { icon: "📱", tip: "Liên kết Telegram để nhận thông báo bảo mật tức thời." },
            { icon: "🛡️", tip: "Đăng xuất khi sử dụng thiết bị công cộng hoặc máy tính chung." },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-sm rounded-2xl bg-gray-50 border border-gray-100 p-md">
              <span className="text-[18px] shrink-0">{item.icon}</span>
              <p className="text-[13px] text-mute/80 leading-relaxed font-medium">{item.tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
