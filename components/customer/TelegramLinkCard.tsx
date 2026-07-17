"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Send, CheckCircle2, ExternalLink, Unlink, Loader2, RefreshCw, Copy, Check } from "lucide-react";

type LinkStatus = { linked: boolean; telegramUsername: string | null };
type LinkCodeResult = { code: string; expiresInMinutes: number; deepLink: string };

export function TelegramLinkCard() {
  const [status, setStatus] = useState<LinkStatus | null>(null);
  const [linkResult, setLinkResult] = useState<LinkCodeResult | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [statusError, setStatusError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  async function loadStatus() {
    try {
      const res = await fetch("/api/telegram/link-code");
      const data = await res.json().catch(() => ({}));
      if (!res.ok) { setStatusError(data.error ?? "Không tải được trạng thái"); return; }
      setStatusError(null);
      setStatus(data);
    } catch { setStatusError("Không kết nối được tới máy chủ"); }
  }

  useEffect(() => { loadStatus(); }, []);

  useEffect(() => {
    if (!linkResult) { setQrDataUrl(null); return; }
    QRCode.toDataURL(linkResult.deepLink, { width: 200, margin: 2, color: { dark: "#1a1a2e", light: "#ffffff" } })
      .then(setQrDataUrl).catch(() => setQrDataUrl(null));
  }, [linkResult]);

  async function generateCode() {
    setLoading(true); setError(null);
    const res = await fetch("/api/telegram/link-code", { method: "POST" });
    const data = await res.json().catch(() => ({}));
    setLoading(false);
    if (!res.ok) { setError(data.error ?? "Không tạo được mã liên kết"); return; }
    setLinkResult(data);
  }

  async function unlink() {
    setLoading(true);
    await fetch("/api/telegram/link-code", { method: "DELETE" });
    setLoading(false); setLinkResult(null); loadStatus();
  }

  function copyCode() {
    if (!linkResult) return;
    navigator.clipboard.writeText(`/start ${linkResult.code}`);
    setCopied(true); setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="rounded-3xl bg-white shadow-sm ring-1 ring-black/[0.05] overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-md px-xl pt-xl pb-lg border-b border-gray-50">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-cyan-500 shadow-sm">
          <Send size={18} strokeWidth={2} className="text-white" />
        </div>
        <div>
          <h2 className="font-black text-[16px] text-ink">Liên kết tài khoản</h2>
          <p className="text-[12px] text-mute">Đồng bộ bot với tài khoản Nhím của bạn</p>
        </div>
      </div>

      <div className="p-xl">
        {/* Loading */}
        {!status && !statusError && (
          <div className="flex items-center gap-sm py-lg text-[14px] text-mute">
            <Loader2 size={16} className="animate-spin text-primary" />
            Đang tải trạng thái...
          </div>
        )}

        {/* Error */}
        {statusError && (
          <div className="flex items-center justify-between gap-md rounded-2xl bg-red-50 border border-red-100 px-lg py-md">
            <p className="text-[13px] font-semibold text-red-600">{statusError}</p>
            <button onClick={loadStatus} className="flex items-center gap-xs text-[12px] font-bold text-red-500 hover:text-red-700 transition-colors">
              <RefreshCw size={13} strokeWidth={2.5} /> Thử lại
            </button>
          </div>
        )}

        {/* Already linked */}
        {status?.linked && (
          <div className="flex flex-col gap-lg">
            <div className="flex items-center gap-md rounded-2xl bg-emerald-50 border border-emerald-100 px-lg py-md">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
                <CheckCircle2 size={20} strokeWidth={2} className="text-emerald-500" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-[14px] text-emerald-800">Đã liên kết thành công</div>
                <div className="text-[12px] text-emerald-600">
                  {status.telegramUsername ? `@${status.telegramUsername}` : "Tài khoản Telegram"} đang được đồng bộ
                </div>
              </div>
            </div>
            <button
              onClick={unlink}
              disabled={loading}
              className="flex items-center justify-center gap-sm h-11 w-fit rounded-2xl border-2 border-red-100 bg-red-50 px-lg text-[13px] font-bold text-red-500 hover:bg-red-100 transition-all disabled:opacity-50"
            >
              {loading ? <Loader2 size={15} className="animate-spin" /> : <Unlink size={15} strokeWidth={2} />}
              Huỷ liên kết
            </button>
          </div>
        )}

        {/* Not linked */}
        {status && !status.linked && (
          <div className="flex flex-col gap-lg">
            <p className="text-[14px] text-mute leading-relaxed">
              Liên kết một lần để bot tự biết ghi nhận link và thông báo vào đúng tài khoản của bạn.
            </p>

            {!linkResult ? (
              <button
                onClick={generateCode}
                disabled={loading}
                className="flex items-center gap-sm h-12 w-fit rounded-2xl bg-gradient-to-r from-sky-400 to-cyan-500 px-xl text-[14px] font-black text-white shadow-md shadow-sky-400/25 hover:-translate-y-0.5 hover:shadow-lg transition-all disabled:opacity-50"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} strokeWidth={2} />}
                {loading ? "Đang tạo mã..." : "Tạo mã liên kết"}
              </button>
            ) : (
              <div className="flex flex-col sm:flex-row gap-xl items-start rounded-2xl bg-gray-50 border border-gray-100 p-xl">
                {/* QR */}
                {qrDataUrl && (
                  <div className="shrink-0 flex flex-col items-center gap-sm">
                    <div className="rounded-2xl border-4 border-white shadow-md overflow-hidden">
                      <img src={qrDataUrl} alt="QR liên kết Telegram" className="h-[140px] w-[140px]" />
                    </div>
                    <p className="text-[11px] text-mute font-medium">Quét bằng camera</p>
                  </div>
                )}
                {/* Code + actions */}
                <div className="flex flex-col gap-md flex-1 min-w-0">
                  <div>
                    <p className="text-[12px] font-bold text-mute/60 uppercase tracking-wider mb-sm">Mã xác nhận</p>
                    <div className="flex items-center gap-sm">
                      <code className="flex-1 rounded-xl bg-white border-2 border-primary/20 px-lg py-sm text-[22px] font-black tracking-[0.2em] text-primary shadow-sm">
                        {linkResult.code}
                      </code>
                      <button onClick={copyCode} className="flex h-11 w-11 items-center justify-center rounded-xl bg-white border border-gray-200 text-mute hover:text-primary transition-colors shadow-sm">
                        {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} strokeWidth={2} />}
                      </button>
                    </div>
                    <p className="mt-xs text-[11px] text-mute">Hết hạn sau {linkResult.expiresInMinutes} phút</p>
                  </div>
                  <a
                    href={linkResult.deepLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-sm h-11 rounded-2xl bg-gradient-to-r from-sky-400 to-cyan-500 text-[13px] font-black text-white shadow-md shadow-sky-400/20 hover:-translate-y-0.5 transition-all"
                  >
                    <ExternalLink size={15} strokeWidth={2} />
                    Mở Telegram để liên kết
                  </a>
                  <p className="text-[11px] text-mute leading-relaxed">
                    Hoặc mở Telegram, tìm bot và gửi lệnh:{" "}
                    <code className="font-bold text-primary">/start {linkResult.code}</code>
                  </p>
                </div>
              </div>
            )}

            {error && (
              <div className="rounded-xl bg-red-50 border border-red-100 px-md py-sm text-[13px] font-semibold text-red-600">
                {error}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
