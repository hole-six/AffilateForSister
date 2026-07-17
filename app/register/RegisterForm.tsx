"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Phone,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  Check,
  ShieldCheck,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { GoogleIcon } from "@/components/icons/PlatformIcons";

function Field({
  label,
  icon: Icon,
  rightSlot,
  inputRef,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  icon: LucideIcon;
  rightSlot?: React.ReactNode;
  inputRef?: React.Ref<HTMLInputElement>;
}) {
  return (
    <div className="group flex flex-col gap-xs">
      <label className="text-[12px] font-bold uppercase tracking-wider text-mute/70">{label}</label>
      <div className="relative">
        <Icon
          size={16}
          strokeWidth={2}
          className="pointer-events-none absolute left-md top-1/2 -translate-y-1/2 text-mute/50 group-focus-within:text-primary transition-colors"
        />
        <input
          {...props}
          ref={inputRef}
          className={`h-[52px] w-full rounded-xl border-2 border-ink/10 bg-white pl-10 ${
            rightSlot ? "pr-12" : "pr-md"
          } text-[15px] font-medium text-ink placeholder:text-mute/40 transition-all focus:border-primary focus:outline-none focus:shadow-[0_0_0_4px_rgba(236,64,122,0.08)]`}
        />
        {rightSlot}
      </div>
    </div>
  );
}

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    { label: "6+ ký tự", ok: password.length >= 6 },
    { label: "Có số", ok: /\d/.test(password) },
    { label: "Chữ hoa", ok: /[A-Z]/.test(password) },
  ];
  if (!password) return null;
  return (
    <div className="flex items-center gap-sm pt-xs">
      {checks.map((c) => (
        <div
          key={c.label}
          className={`flex items-center gap-xs rounded-full px-sm py-[2px] text-[11px] font-bold transition-all ${
            c.ok ? "bg-emerald-50 text-emerald-600" : "bg-ink/5 text-mute/50"
          }`}
        >
          <Check size={10} strokeWidth={3} className={c.ok ? "opacity-100" : "opacity-0"} />
          {c.label}
        </div>
      ))}
    </div>
  );
}

export function RegisterForm() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    if (!phoneRegex.test(phone)) {
      setError("Số điện thoại không hợp lệ (phải bắt đầu bằng 0 và có 10 chữ số).");
      return;
    }
    if (password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Mật khẩu nhập lại không khớp.");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName, phone, email, password }),
    });
    setLoading(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Đăng ký thất bại");
      return;
    }

    const data = await res.json();
    router.push(data.redirectTo);
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-md">
      {/* Google first */}
      <a
        href="/api/auth/google"
        className="flex h-[52px] w-full items-center justify-center gap-sm rounded-2xl border-2 border-ink/10 bg-white text-[14px] font-bold text-ink transition-all hover:border-primary/30 hover:bg-primary/[0.03] hover:shadow-md"
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
        {/* Row: name + phone */}
        <div className="grid grid-cols-2 gap-md">
          <Field
            label="Họ và tên"
            icon={User}
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Nguyễn Văn A"
            autoComplete="name"
          />
          <Field
            label="Điện thoại"
            icon={Phone}
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="0901234567"
            autoComplete="tel"
          />
        </div>

        <Field
          label="Email"
          icon={Mail}
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ban@email.com"
          autoComplete="email"
        />

        {/* Password with strength */}
        <div className="flex flex-col gap-xs">
          <label className="text-[12px] font-bold uppercase tracking-wider text-mute/70">Mật khẩu</label>
          <div className="group relative">
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
              placeholder="Tối thiểu 6 ký tự"
              autoComplete="new-password"
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
          <PasswordStrength password={password} />
        </div>

        {/* Confirm password */}
        <div className="flex flex-col gap-xs">
          <label className="text-[12px] font-bold uppercase tracking-wider text-mute/70">Nhập lại mật khẩu</label>
          <div className="group relative">
            <Lock
              size={16}
              strokeWidth={2}
              className="pointer-events-none absolute left-md top-1/2 -translate-y-1/2 text-mute/50 group-focus-within:text-primary transition-colors"
            />
            <input
              type={showConfirmPassword ? "text" : "password"}
              required
              minLength={6}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Nhập lại mật khẩu"
              autoComplete="new-password"
              className={`h-[52px] w-full rounded-xl border-2 bg-white pl-10 pr-12 text-[15px] font-medium text-ink placeholder:text-mute/40 transition-all focus:outline-none focus:shadow-[0_0_0_4px_rgba(236,64,122,0.08)] ${
                confirmPassword && confirmPassword !== password
                  ? "border-red-300 focus:border-red-400"
                  : confirmPassword && confirmPassword === password
                  ? "border-emerald-300 focus:border-emerald-400"
                  : "border-ink/10 focus:border-primary"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((v) => !v)}
              className="absolute right-md top-1/2 -translate-y-1/2 text-mute/50 hover:text-ink transition-colors"
              tabIndex={-1}
              aria-label={showConfirmPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
            >
              {showConfirmPassword ? <EyeOff size={16} strokeWidth={2} /> : <Eye size={16} strokeWidth={2} />}
            </button>
            {confirmPassword && confirmPassword === password && (
              <Check
                size={16}
                strokeWidth={2.5}
                className="pointer-events-none absolute right-10 top-1/2 -translate-y-1/2 text-emerald-500"
              />
            )}
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
              Tạo tài khoản miễn phí
              <ArrowRight size={17} strokeWidth={2.5} />
            </>
          )}
        </button>

        <p className="text-center text-[11px] text-mute/50 leading-relaxed">
          Bằng cách đăng ký, bạn đồng ý với{" "}
          <a href="/dieu-khoan-su-dung" className="text-primary/70 hover:text-primary underline-offset-2 hover:underline">
            Điều khoản dịch vụ
          </a>{" "}
          và{" "}
          <a href="/chinh-sach-bao-mat" className="text-primary/70 hover:text-primary underline-offset-2 hover:underline">
            Chính sách bảo mật
          </a>
          .
        </p>
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
