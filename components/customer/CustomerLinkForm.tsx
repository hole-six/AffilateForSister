"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Copy, ExternalLink, Link2, Plus, Package, Sparkles, Wallet } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { TextInput } from "@/components/ui/TextInput";
import { Card } from "@/components/ui/Card";
import { formatCurrency } from "@/lib/format";

type Option = { id: string; code: string; label: string };
type LinkResult = {
  shortUrl: string;
  generatedLink: string;
  trackingCode: string;
  shortCode: string;
  productTitle: string | null;
  productImage: string | null;
  productPrice: number | string | null;
  estimatedCashback: number | string | null;
};

// Icon nhím túi hồng thay cho logo cam của Shopee để giữ giao diện đồng bộ thương hiệu.
const PLATFORM_STYLE: Record<string, { mascot: string }> = {
  SHOPEE: { mascot: "/nhimgiohang.png" },
};

function platformStyle(code: string) {
  return PLATFORM_STYLE[code.toUpperCase()] ?? { mascot: "/nhimchaomung.png" };
}

export function CustomerLinkForm({ platforms }: { platforms: Option[] }) {
  const router = useRouter();
  const [platformId, setPlatformId] = useState(platforms[0]?.id ?? "");
  const [originalUrl, setOriginalUrl] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<LinkResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [imgBroken, setImgBroken] = useState(false);

  const selectedPlatform = platforms.find((p) => p.id === platformId);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    setImgBroken(false);

    const res = await fetch("/api/links", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        originalUrl,
        platformId,
        channelSource: "web",
        productPrice: productPrice ? Number(productPrice) : undefined,
      }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Không tạo được link");
      return;
    }

    const data = await res.json();
    setResult({
      shortUrl: data.link.shortUrl,
      generatedLink: data.link.generatedLink,
      trackingCode: data.link.trackingCode,
      shortCode: data.link.shortCode,
      productTitle: data.link.productTitle ?? null,
      productImage: data.link.productImage ?? null,
      productPrice: data.link.productPrice ?? null,
      estimatedCashback: data.link.estimatedCashback ?? null,
    });
    setOriginalUrl("");
    setProductPrice("");
    router.refresh();
  }

  function copyLink() {
    if (!result) return;
    navigator.clipboard.writeText(result.shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="flex flex-col gap-xl">
      {/* Platform selection (1 Chọn nền tảng) */}
      <div>
        <div className="mb-md flex items-center gap-sm">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#EC407A] text-[12px] font-bold text-white shadow-sm">
            1
          </span>
          <span className="text-[15px] font-bold text-gray-900">Chọn nền tảng</span>
        </div>
        
        <div className="flex flex-wrap gap-md">
          {platforms.map((p) => {
            const active = p.id === platformId;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setPlatformId(p.id)}
                className={`group flex items-center gap-md rounded-2xl border-2 px-lg py-md transition-all duration-200 ${
                  active
                    ? "border-primary bg-primary/5 shadow-md shadow-primary/15"
                    : "border-ink/8 bg-white hover:border-primary/30 hover:bg-primary/[0.03] hover:-translate-y-0.5 hover:shadow-sm"
                }`}
              >
                {/* Icon nhím thay cho logo Shopee, giữ đồng bộ thương hiệu */}
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all ${
                  active ? "bg-primary shadow-sm shadow-primary/30" : "bg-primary/10 group-hover:bg-primary/20"
                }`}>
                  <img src={platformStyle(p.code).mascot} alt="" className="h-7 w-7 object-contain" />
                </div>
                <div className="text-left">
                  <div className={`text-[14px] font-black leading-tight ${active ? "text-primary" : "text-ink"}`}>
                    {p.label}
                  </div>
                  <div className="text-[11px] text-mute font-medium">Hoàn tiền tự động</div>
                </div>
                {active && (
                  <div className="ml-sm flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Input area (2 Dán link) */}
      <div className="rounded-2xl bg-white p-lg shadow-sm ring-1 ring-black/5">
        <div className="mb-md flex items-center gap-sm">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#EC407A] text-[12px] font-bold text-white shadow-sm">
            2
          </span>
          <span className="text-[14px] font-bold text-gray-900">
            Dán link {selectedPlatform?.label ?? "sản phẩm"}
          </span>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-md">
          {/* Link + giá trên cùng 1 hàng, 2 cột */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
            <div className="flex flex-col gap-xs">
              <label className="text-[12px] font-bold text-gray-500 uppercase tracking-wider">Link sản phẩm</label>
              <TextInput
                placeholder={`Dán link ${selectedPlatform?.label ?? "sản phẩm"}...`}
                required
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                className="h-12 bg-gray-50 border-gray-200 focus:border-[#EC407A] focus:ring-[#EC407A]/20"
              />
            </div>

            <div className="flex flex-col gap-xs">
              <label className="text-[12px] font-bold text-amber-600 uppercase tracking-wider flex items-center gap-xs">
                <Wallet size={12} strokeWidth={2.5} />
                Giá sản phẩm (ước tính hoàn tiền)
              </label>
              <input
                type="number"
                min={0}
                placeholder="VD: 183000"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                className="h-12 w-full rounded-xl bg-amber-50 border border-amber-200 px-md text-[14px] font-bold text-gray-900 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 placeholder:font-normal placeholder:text-gray-400"
              />
            </div>
          </div>

          <p className="text-[11px] text-gray-400">
            Shopee không cho phép lấy giá tự động — nhập giá để xem ước tính số tiền hoàn.
          </p>

          <Button
            type="submit"
            disabled={loading || !platformId}
            className="h-12 w-fit bg-[#EC407A] text-white hover:bg-[#c2185b] hover:shadow-md hover:shadow-[#EC407A]/30 active:bg-[#a01352] focus-visible:ring-[#EC407A]"
          >
            {loading ? "Đang tạo..." : (
              <>
                <Plus size={16} strokeWidth={2.5} />
                Tạo link
              </>
            )}
          </Button>
        </form>
        {error && <div className="mt-sm text-[13px] font-medium text-red-500">{error}</div>}
      </div>

      {/* Result Card */}
      {result && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-md fade-in">
          {/* Panel trai: THONG TIN SAN PHAM */}
          <div className="rounded-2xl bg-white p-lg shadow-sm ring-1 ring-black/5">
            <div className="mb-md flex items-center gap-xs text-[12px] font-bold uppercase tracking-wider text-gray-500">
              <Package size={14} strokeWidth={2.5} />
              Thông tin sản phẩm
            </div>
            <div className="flex gap-md">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gray-50 ring-1 ring-black/5 overflow-hidden">
                {result.productImage && !imgBroken ? (
                  <img
                    src={result.productImage}
                    alt=""
                    onError={() => setImgBroken(true)}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Link2 size={24} strokeWidth={1.5} className="text-[#EC407A]" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="line-clamp-2 text-[14px] font-bold text-gray-900 leading-snug">
                  {result.productTitle ?? "Sản phẩm mua sắm"}
                </p>
                <div className="mt-xs flex items-center gap-xs flex-wrap">
                  <span className="rounded-md bg-[#EC407A]/10 px-sm py-[2px] text-[11px] font-bold text-[#EC407A]">
                    {selectedPlatform?.label ?? "Sản phẩm"}
                  </span>
                  <span className="font-mono text-[11px] text-gray-400 truncate">{result.trackingCode}</span>
                </div>
              </div>
            </div>

            {/* Giá + Cashback — hiển thị ngay dưới thông tin sản phẩm */}
            {(result.productPrice != null || (result.estimatedCashback != null && Number(result.estimatedCashback) > 0)) && (
              <div className="mt-md flex items-center gap-md rounded-xl bg-gray-50 px-md py-sm ring-1 ring-gray-100">
                {result.productPrice != null && (
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Giá sản phẩm</span>
                    <span className="text-[15px] font-black text-gray-900 tabular-nums">
                      {formatCurrency(result.productPrice)}
                    </span>
                  </div>
                )}
                {result.productPrice != null && result.estimatedCashback != null && Number(result.estimatedCashback) > 0 && (
                  <div className="h-8 w-px bg-gray-200 shrink-0" />
                )}
                {result.estimatedCashback != null && Number(result.estimatedCashback) > 0 && (
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">Hoàn tiền ước tính</span>
                    <span className="text-[15px] font-black text-emerald-600 tabular-nums">
                      {formatCurrency(result.estimatedCashback)}
                    </span>
                  </div>
                )}
                <div className="ml-auto">
                  <Wallet size={18} strokeWidth={2} className="text-emerald-400" />
                </div>
              </div>
            )}

            {result.estimatedCashback != null && Number(result.estimatedCashback) > 0 && (
              <p className="mt-xs text-[11px] text-gray-400 leading-relaxed">
                * Ước tính dựa trên tỷ lệ hoa hồng — số tiền thực nhận có thể khác tuỳ Shopee ghi nhận.
              </p>
            )}
          </div>

          {/* Panel phai: LINK HOAN TIEN CUA BAN */}
          <div className="rounded-2xl bg-[#2bc48a]/10 p-lg ring-1 ring-[#2bc48a]/20">
            <div className="mb-md flex items-center gap-xs text-[12px] font-bold uppercase tracking-wider text-[#1f9c6d]">
              <Sparkles size={14} strokeWidth={2.5} />
              Link hoàn tiền của bạn
            </div>
            <input
              readOnly
              value={result.shortUrl}
              onFocus={(e) => e.target.select()}
              className="mb-md h-11 w-full rounded-xl bg-white px-md text-[13px] font-medium text-gray-700 ring-1 ring-black/5 focus:outline-none focus:ring-2 focus:ring-[#2bc48a]/40"
            />
            <div className="flex gap-sm">
              <Button
                type="button"
                onClick={copyLink}
                className="flex-1 bg-[#2bc48a] text-white hover:bg-[#25ad7a] hover:shadow-md hover:shadow-[#2bc48a]/30"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? "Đã copy" : "Copy link"}
              </Button>
              <a href={result.shortUrl} target="_blank" rel="noreferrer">
                <Button type="button" variant="tertiary">
                  <ExternalLink size={16} />
                  Mở
                </Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
