"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, ShieldCheck, Wallet } from "lucide-react";
import { GoogleIcon } from "@/components/icons/PlatformIcons";

const GOOGLE_ERROR_MESSAGES: Record<string, string> = {
  google_state_mismatch: "Phiên đăng nhập Google đã hết hạn, vui lòng thử lại.",
  google_not_configured: "Đăng nhập Google chưa được cấu hình trên hệ thống.",
  google_token_exchange_failed: "Không thể xác thực với Google, vui lòng thử lại.",
  google_userinfo_failed: "Không lấy được thông tin tài khoản Google.",
  google_email_not_verified: "Email Google của bạn chưa được xác minh.",
  account_inactive: "Tài khoản của bạn đã bị khoá.",
};

export function LoginForm({ next }: { next?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const googleError = searchParams.get("error");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(
    googleError ? GOOGLE_ERROR_MESSAGES[googleError] ?? "Đăng nhập Google thất bại." : null
  );
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Email không đúng định dạng.");
      return;
    }
    if (password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự.");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    setLoading(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Đăng nhập thất bại");
      return;
    }

    const data = await res.json();
    router.push(next || data.redirectTo);
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-md">
      {/* Google first */}
      <a
        href="/api/auth/google"
        className="group flex h-[52px] w-full items-center justify-center gap-sm rounded-2xl border-2 border-ink/10 bg-white text-[14px] font-bold text-ink transition-all hover:border-primary/30 hover:bg-primary/[0.03] hover:shadow-md"
      >
        <GoogleIcon size={20} />
        Tiếp tục với Google
      </a>

      <div className="flex items-center gap-md">
        <div className="h-px flex-1 bg-ink/8" />
        <span className="text-[12px] font-semibold text-mute/60 uppercase tracking-wider">hoặc email</span>
        <div className="h-px flex-1 bg-ink/8" />
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-md">
        {/* Email */}
        <div className="group flex flex-col gap-xs">
          <label className="text-[12px] font-bold uppercase tracking-wider text-mute/70">Email</label>
          <div className="relative">
            <Mail
              size={16}
              strokeWidth={2}
              className="pointer-events-none absolute left-md top-1/2 -translate-y-1/2 text-mute/50 group-focus-within:text-primary transition-colors"
            />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ban@email.com"
              autoComplete="email"
              className="h-[52px] w-full rounded-xl border-2 border-ink/10 bg-white pl-10 pr-md text-[15px] font-medium text-ink placeholder:text-mute/40 transition-all focus:border-primary focus:outline-none focus:shadow-[0_0_0_4px_rgba(236,64,122,0.08)]"
            />
          </div>
        </div>

        {/* Password */}
        <div className="group flex flex-col gap-xs">
          <div className="flex items-center justify-between">
            <label className="text-[12px] font-bold uppercase tracking-wider text-mute/70">Mật khẩu</label>
            <a
              href="/forgot-password"
              className="text-[12px] font-bold text-primary hover:text-primary-active transition-colors"
            >
              Quên mật khẩu?
            </a>
          </div>
          <div className="relative">
            <Lock
              size={16}
              strokeWidth={2}
              className="pointer-events-none absolute left-md top-1/2 -translate-y-1/2 text-mute/50 group-focus-within:text-primary transition-colors"
            />
            <input
              type={showPassword ? "text" : "password"}
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              className="h-[52px] w-full rounded-xl border-2 border-ink/10 bg-white pl-10 pr-12 text-[15px] font-medium text-ink placeholder:text-mute/40 transition-all focus:border-primary focus:outline-none focus:shadow-[0_0_0_4px_rgba(236,64,122,0.08)]"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-md top-1/2 -translate-y-1/2 text-mute/50 hover:text-ink transition-colors"
              tabIndex={-1}
              aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
            >
              {showPassword ? <EyeOff size={16} strokeWidth={2} /> : <Eye size={16} strokeWidth={2} />}
            </button>
          </div>
        </div>

        {error && (
          <div className="flex items-start gap-sm rounded-xl bg-red-50 border border-red-200 px-md py-sm text-[13px] font-semibold text-red-700">
            <span className="mt-px shrink-0">⚠</span>
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-xs flex h-[52px] w-full items-center justify-center gap-sm rounded-2xl bg-primary text-[15px] font-black text-white shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/35 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          {loading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <>
              Đăng nhập
              <ArrowRight size={17} strokeWidth={2.5} />
            </>
          )}
        </button>
      </form>

      {/* Trust strip */}
      <div className="flex items-center justify-center gap-lg pt-xs">
        <div className="flex items-center gap-xs text-[11px] font-semibold text-mute/60">
          <ShieldCheck size={13} className="text-primary/60" />
          Bảo mật SSL
        </div>
        <div className="h-3 w-px bg-ink/10" />
        <div className="flex items-center gap-xs text-[11px] font-semibold text-mute/60">
          <Wallet size={13} className="text-primary/60" />
          Rút tiền 24/7
        </div>
        <div className="h-3 w-px bg-ink/10" />
        <div className="flex items-center gap-xs text-[11px] font-semibold text-mute/60">
          <span className="text-primary/60">0đ</span>
          Hoàn toàn miễn phí
        </div>
      </div>
    </div>
  );
}
