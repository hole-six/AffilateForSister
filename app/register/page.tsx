import type { Metadata } from "next";
import Link from "next/link";
import { RegisterForm } from "./RegisterForm";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Đăng ký tài khoản — Nhím",
  description: "Tạo tài khoản Nhím miễn phí để bắt đầu nhận hoàn tiền tự động khi mua sắm trên Shopee.",
  alternates: { canonical: "/register" },
  openGraph: {
    title: "Đăng ký tài khoản — Nhím",
    description: "Tạo tài khoản Nhím miễn phí để bắt đầu nhận hoàn tiền tự động khi mua sắm trên Shopee.",
    type: "website",
    locale: "vi_VN",
    url: "/register",
    siteName: "Nhím",
  },
};

export default function RegisterPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#fdf4f8] flex items-center justify-center px-md py-3xl">
      {/* Blobs */}
      <div className="pointer-events-none absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full bg-[#f48fb1]/15 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/3 right-1/3 h-[200px] w-[200px] rounded-full bg-purple-200/20 blur-[80px]" />

      {/* Back */}
      <Link
        href="/"
        className="absolute left-lg top-lg z-20 flex items-center gap-xs rounded-full bg-white/80 px-md py-sm text-[13px] font-bold text-ink backdrop-blur-md shadow-sm transition-all hover:bg-white hover:shadow-md"
      >
        <ArrowLeft size={15} />
        Trang chủ
      </Link>

      {/* Card */}
      <div className="relative z-10 w-full max-w-[480px] fade-in">
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
            <h1 className="text-[26px] font-black text-ink tracking-tight">Tạo tài khoản mới</h1>
            <p className="text-[14px] text-mute mt-xs">Miễn phí · Không ràng buộc · Hoàn tiền ngay</p>
          </div>
        </div>

        {/* Form card */}
        <div className="rounded-[28px] bg-white/90 backdrop-blur-xl p-2xl shadow-2xl shadow-primary/10 border border-white">
          <RegisterForm />
        </div>

        {/* Login link */}
        <p className="mt-xl text-center text-[14px] text-mute">
          Đã có tài khoản?{" "}
          <Link href="/login" className="font-black text-primary hover:text-primary-active transition-colors">
            Đăng nhập →
          </Link>
        </p>
      </div>
    </main>
  );
}
