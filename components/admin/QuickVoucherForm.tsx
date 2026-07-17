"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Zap } from "lucide-react";

type Option = { id: string; label: string };

export function QuickVoucherForm({ platforms }: { platforms: Option[] }) {
  const router = useRouter();
  const [platformId, setPlatformId] = useState(platforms[0]?.id ?? "");
  const [voucherUrl, setVoucherUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch("/api/vouchers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ platformId, voucherUrl }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Không đăng được ưu đãi");
      return;
    }

    setVoucherUrl("");
    router.refresh();
  }

  return (
    <div className="rounded-3xl bg-[#fdebf2]/60 border border-[#EC407A]/20 p-lg">
      <div className="mb-md flex items-center gap-sm">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EC407A] text-white">
          <Zap size={16} strokeWidth={2} />
        </span>
        <div>
          <h3 className="text-[15px] font-bold text-gray-900">Đăng ưu đãi nhanh</h3>
          <p className="text-[12px] font-medium text-gray-500">
            Chỉ cần dán link deal — hệ thống tự lấy tên và ảnh sản phẩm.
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-sm sm:flex-row">
        <select
          value={platformId}
          onChange={(e) => setPlatformId(e.target.value)}
          className="h-11 shrink-0 rounded-xl border border-gray-200 bg-white px-md text-[14px] font-semibold text-gray-900 sm:w-[160px] focus:border-[#EC407A] focus:outline-none focus:ring-1 focus:ring-[#EC407A]"
        >
          {platforms.map((p) => (
            <option key={p.id} value={p.id}>
              {p.label}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Dán link deal Shopee vào đây..."
          required
          value={voucherUrl}
          onChange={(e) => setVoucherUrl(e.target.value)}
          className="h-11 flex-1 rounded-xl border border-gray-200 bg-white px-md text-[14px] font-medium text-gray-900 focus:border-[#EC407A] focus:outline-none focus:ring-1 focus:ring-[#EC407A]"
        />
        <button
          type="submit"
          disabled={loading || !platformId}
          className="h-11 shrink-0 rounded-xl bg-[#EC407A] px-xl text-[14px] font-bold text-white transition-all hover:bg-[#c2185b] disabled:opacity-50"
        >
          {loading ? "Đang đăng..." : "Đăng ngay"}
        </button>
      </form>
      {error && <div className="mt-sm text-[13px] font-medium text-red-500">{error}</div>}
    </div>
  );
}
