import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "./LoginForm";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Đăng Nhập — Nhím Hoàn Tiền Shopee",
  description: "Đăng nhập vào Nhím để quản lý ví hoàn tiền, đơn hàng và rút tiền dễ dàng.",
  alternates: { canonical: "/login" },
};

export default function LoginPage({
  searchParams,
}: {
  searchParams: { next?: string };
}) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#fdf4f8] flex items-center justify-center px-md py-3xl">
      {/* Blobs */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-[500px] w-[500px] rounded-full bg-[#f48fb1]/15 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] rounded-full bg-primary/5 blur-[80px]" />

      {/* Back */}
      <Link
        href="/"
        className="absolute left-lg top-lg z-20 flex items-center gap-xs rounded-full bg-white/80 px-md py-sm text-[13px] font-bold text-ink backdrop-blur-md shadow-sm transition-all hover:bg-white hover:shadow-md"
      >
        <ArrowLeft size={15} />
        Trang chủ
      </Link>

      {/* Card */}
      <div className="relative z-10 w-full max-w-[440px] fade-in">
        {/* Logo mark */}
        <div className="mb-xl flex flex-col items-center gap-sm text-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-lg scale-110" />
            <img
              src="/nhimchaomung.png"
              alt="Nhím"
              className="relative h-16 w-16 rounded-full object-cover shadow-lg ring-4 ring-white"
            />
          </div>
          <div>
            <h1 className="text-[26px] font-black text-ink tracking-tight">Chào mừng trở lại</h1>
            <p className="text-[14px] text-mute mt-xs">Đăng nhập để tiếp tục nhận hoàn tiền</p>
          </div>
        </div>

        {/* Form card */}
        <div className="rounded-[28px] bg-white/90 backdrop-blur-xl p-2xl shadow-2xl shadow-primary/10 border border-white">
          <LoginForm next={searchParams.next} />
        </div>

        {/* Register link */}
        <p className="mt-xl text-center text-[14px] text-mute">
          Chưa có tài khoản?{" "}
          <Link href="/register" className="font-black text-primary hover:text-primary-active transition-colors">
            Đăng ký miễn phí →
          </Link>
        </p>
      </div>
    </main>
  );
}
