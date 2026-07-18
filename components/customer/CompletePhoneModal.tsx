"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Phone, Loader2 } from "lucide-react";

const PHONE_REGEX = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;

export function CompletePhoneModal() {
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!PHONE_REGEX.test(phone)) {
      setError("Số điện thoại không hợp lệ (phải bắt đầu bằng 0 và có 10 chữ số).");
      return;
    }

    setSaving(true);
    const res = await fetch("/api/customer/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone }),
    });
    setSaving(false);

    if (!res.ok) {
      setError("Không lưu được số điện thoại, vui lòng thử lại.");
      return;
    }

    setOpen(false);
    router.refresh();
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-md">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
      <div className="relative w-full max-w-md rounded-3xl bg-white shadow-2xl fade-in overflow-hidden">
        <div
          className="flex items-center gap-md px-xl py-lg"
          style={{ background: "linear-gradient(135deg,#fdeef4,#fdebf2)" }}
        >
          <img src="/nhimtinnhan.png" alt="" className="h-12 w-12 object-contain" />
          <div>
            <h3 className="text-[16px] font-black text-gray-900">Hoàn tất hồ sơ</h3>
            <p className="text-[12px] text-gray-500">Bổ sung số điện thoại (Zalo) để tiện liên hệ khi có đơn hoặc hoàn tiền</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-xl flex flex-col gap-md">
          <div className="flex flex-col gap-xs">
            <label className="text-[12px] font-bold text-gray-600 uppercase tracking-wide">Số điện thoại (Zalo)</label>
            <div className="relative">
              <Phone size={16} strokeWidth={2} className="pointer-events-none absolute left-md top-1/2 -translate-y-1/2 text-mute/50" />
              <input
                type="tel"
                required
                autoFocus
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0901234567"
                className="h-12 w-full rounded-t-lg rounded-b-none border-0 border-b-2 border-ink/15 bg-canvas-soft pl-10 pr-md text-[15px] font-medium text-ink placeholder:text-mute/40 transition-all focus:border-b-primary focus:bg-primary-neutral/40 focus:outline-none"
              />
            </div>
          </div>

          {error && (
            <div className="rounded-xl bg-negative/10 border border-negative/20 px-md py-sm text-[13px] font-semibold text-negative-darkest">
              {error}
            </div>
          )}

          <div className="flex items-center gap-sm pt-xs">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex-1 h-11 rounded-xl border border-ink/10 text-[13px] font-bold text-mute hover:bg-canvas-soft transition-colors"
            >
              Để sau
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 h-11 flex items-center justify-center gap-xs rounded-xl bg-primary text-white text-[13px] font-bold shadow-md shadow-primary/25 hover:bg-primary-active transition-all disabled:opacity-60"
            >
              {saving ? <Loader2 size={15} className="animate-spin" /> : "Lưu lại"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
