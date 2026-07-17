"use client";

import { useState } from "react";
import { Wallet, Clock, CheckCircle2, Building2, Edit2, AlertCircle, X, Loader2, BellRing } from "lucide-react";
import { formatCurrency } from "@/lib/format";
import { useRouter } from "next/navigation";
import { Pagination } from "@/components/ui/Pagination";

export const VIETNAM_BANKS = [
  // Ngân hàng quốc doanh / nhà nước chi phối
  "Vietcombank (Ngân hàng TMCP Ngoại thương VN)",
  "VietinBank (Ngân hàng TMCP Công thương VN)",
  "BIDV (Ngân hàng TMCP Đầu tư và Phát triển VN)",
  "Agribank (Ngân hàng NN&PTNT VN)",
  // Ngân hàng TMCP
  "Techcombank (Ngân hàng TMCP Kỹ thương VN)",
  "MB (Ngân hàng TMCP Quân đội)",
  "ACB (Ngân hàng TMCP Á Châu)",
  "VPBank (Ngân hàng TMCP VN Thịnh Vượng)",
  "TPBank (Ngân hàng TMCP Tiên Phong)",
  "Sacombank (Ngân hàng TMCP Sài Gòn Thương Tín)",
  "HDBank (Ngân hàng TMCP Phát triển TPHCM)",
  "VIB (Ngân hàng TMCP Quốc tế VN)",
  "SHB (Ngân hàng TMCP Sài Gòn - Hà Nội)",
  "SeABank (Ngân hàng TMCP Đông Nam Á)",
  "MSB (Ngân hàng TMCP Hàng Hải VN)",
  "LPBank (Ngân hàng TMCP Lộc Phát VN)",
  "OCB (Ngân hàng TMCP Phương Đông)",
  "Nam A Bank (Ngân hàng TMCP Nam Á)",
  "Eximbank (Ngân hàng TMCP Xuất Nhập khẩu VN)",
  "VietABank (Ngân hàng TMCP Việt Á)",
  "NCB (Ngân hàng TMCP Quốc Dân)",
  "Bac A Bank (Ngân hàng TMCP Bắc Á)",
  "PVcomBank (Ngân hàng TMCP Đại Chúng VN)",
  "Saigonbank (Ngân hàng TMCP Sài Gòn Công Thương)",
  "KienlongBank (Ngân hàng TMCP Kiên Long)",
  "VietBank (Ngân hàng TMCP Việt Nam Thương Tín)",
  "BaoVietBank (Ngân hàng TMCP Bảo Việt)",
  "PGBank (Ngân hàng TMCP Thịnh Vượng và Phát triển)",
  "ABBank (Ngân hàng TMCP An Bình)",
  "SCB (Ngân hàng TMCP Sài Gòn)",
  "BVBank (Ngân hàng TMCP Bản Việt)",
  "GPBank (Ngân hàng TM TNHH MTV Dầu Khí Toàn Cầu)",
  "MBV (Ngân hàng TM TNHH MTV Đại Dương)",
  "CBBank (Ngân hàng TM TNHH MTV Xây dựng VN)",
  // Ngân hàng chính sách / hợp tác xã
  "VBSP (Ngân hàng Chính sách Xã hội)",
  "Co-opBank (Ngân hàng Hợp tác xã VN)",
  // Ngân hàng 100% vốn nước ngoài / liên doanh tại VN
  "HSBC Việt Nam",
  "Standard Chartered Việt Nam",
  "Shinhan Bank Việt Nam",
  "Woori Bank Việt Nam",
  "Public Bank Việt Nam (PBVN)",
  "CIMB Việt Nam",
  "UOB Việt Nam",
  "Hong Leong Bank Việt Nam",
  "Indovina Bank",
  "ANZ Việt Nam",
  // Ngân hàng số
  "Cake by VPBank",
  "Ubank by VPBank",
  "Liobank by OCB",
  "Timo",
  "Khác...",
];

type PaymentInfo = {
  bankName: string | null;
  bankAccountNumber: string | null;
  bankAccountName: string | null;
};

type PendingRequest = {
  id: string;
  amount: number;
  createdAt: string;
} | null;

type Props = {
  stats: {
    available: number;
    pending: number;
    paid: number;
  };
  history: any[];
  totalPages: number;
  currentPage: number;
  paymentInfo: PaymentInfo;
  pendingRequest: PendingRequest;
};

const MIN_WITHDRAW_AMOUNT = 10000;

export function CustomerWalletClient({
  stats,
  history,
  totalPages,
  currentPage,
  paymentInfo: initialPaymentInfo,
  pendingRequest: initialPendingRequest,
}: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [pendingRequest, setPendingRequest] = useState<PendingRequest>(initialPendingRequest);

  // Profile State
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>(initialPaymentInfo);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Form State inside Modal
  const [formBankName, setFormBankName] = useState(initialPaymentInfo.bankName || "");
  const [formBankAccountNumber, setFormBankAccountNumber] = useState(initialPaymentInfo.bankAccountNumber || "");
  const [formBankAccountName, setFormBankAccountName] = useState(initialPaymentInfo.bankAccountName || "");
  const [bankSearch, setBankSearch] = useState(initialPaymentInfo.bankName || "");
  const [showBankOptions, setShowBankOptions] = useState(false);
  const filteredBanks = VIETNAM_BANKS.filter((b) => b.toLowerCase().includes(bankSearch.trim().toLowerCase()));

  const hasBankInfo = !!(paymentInfo.bankName && paymentInfo.bankAccountNumber && paymentInfo.bankAccountName);
  const canRequest = stats.available >= MIN_WITHDRAW_AMOUNT && hasBankInfo && !pendingRequest;

  const handleSubmitRequest = async () => {
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/withdraw-requests", { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Không thể gửi yêu cầu, vui lòng thử lại");
        return;
      }
      setPendingRequest(data.request);
      router.refresh();
    } catch {
      setError("Đã có lỗi xảy ra, vui lòng thử lại");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSavePaymentInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch("/api/customer/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bankName: formBankName,
          bankAccountNumber: formBankAccountNumber,
          bankAccountName: formBankAccountName,
        }),
      });
      if (!res.ok) throw new Error("Failed to save");
      const { customer } = await res.json();
      setPaymentInfo(customer);
      setIsModalOpen(false);
      router.refresh();
    } catch (err) {
      alert("Đã có lỗi xảy ra khi lưu thông tin.");
    } finally {
      setIsSaving(false);
    }
  };

  const openModal = () => {
    setFormBankName(paymentInfo.bankName || "");
    setFormBankAccountNumber(paymentInfo.bankAccountNumber || "");
    setFormBankAccountName(paymentInfo.bankAccountName || "");
    setBankSearch(paymentInfo.bankName || "");
    setShowBankOptions(false);
    setIsModalOpen(true);
  };

  const selectBank = (bank: string) => {
    setFormBankName(bank);
    setBankSearch(bank);
    setShowBankOptions(false);
  };

  return (
    <>
      <div className="mx-auto flex max-w-5xl flex-col gap-xl fade-in pb-2xl">
        {/* ══ HERO ══ */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500 px-xl py-2xl shadow-xl shadow-emerald-400/20">
          <div className="pointer-events-none absolute -top-10 -right-10 h-44 w-44 rounded-full bg-white/10 blur-3xl" />
          <img src="/nhimgiohang.png" alt="" aria-hidden="true" className="absolute right-4 bottom-0 h-28 w-28 object-contain opacity-20 pointer-events-none select-none" />
          <div className="relative z-10">
            <p className="text-white/60 text-[11px] font-bold uppercase tracking-widest mb-xs">Ví tiền</p>
            <h1 className="font-black text-[28px] md:text-[34px] text-white leading-tight tracking-tight mb-sm">Quản lý thanh toán</h1>
            <p className="text-white/75 text-[14px] leading-relaxed max-w-lg">Theo dõi số dư, yêu cầu rút tiền và xem lịch sử giao dịch.</p>
          </div>
        </div>

        {/* ══ STAT CARDS ══ */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-md">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary-active p-xl shadow-lg shadow-primary/20 hover:-translate-y-0.5 transition-all">
            <div className="pointer-events-none absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/15 blur-xl" />
            <div className="relative z-10">
              <div className="flex items-center gap-sm text-white/80 mb-md">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/20">
                  <Wallet size={15} strokeWidth={2} className="text-white" />
                </div>
                <span className="text-[12px] font-bold uppercase tracking-wider">Khả dụng</span>
              </div>
              <div className="text-[32px] font-black text-white tabular-nums tracking-tight leading-none">{formatCurrency(stats.available)}</div>
              <p className="text-white/60 text-[11px] mt-xs font-medium">Sẵn sàng rút</p>
            </div>
          </div>
          <div className="rounded-2xl bg-white p-xl shadow-sm ring-1 ring-black/[0.05] hover:-translate-y-0.5 transition-all">
            <div className="flex items-center gap-sm mb-md">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-100"><Clock size={15} strokeWidth={2} className="text-amber-500" /></div>
              <span className="text-[12px] font-bold uppercase tracking-wider text-amber-600">Chờ duyệt</span>
            </div>
            <div className="text-[26px] font-black text-amber-600 tabular-nums tracking-tight leading-none">{formatCurrency(stats.pending)}</div>
            <p className="text-mute text-[11px] mt-xs font-medium">Đang xử lý</p>
          </div>
          <div className="rounded-2xl bg-white p-xl shadow-sm ring-1 ring-black/[0.05] hover:-translate-y-0.5 transition-all">
            <div className="flex items-center gap-sm mb-md">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-100"><CheckCircle2 size={15} strokeWidth={2} className="text-emerald-500" /></div>
              <span className="text-[12px] font-bold uppercase tracking-wider text-emerald-600">Đã nhận</span>
            </div>
            <div className="text-[26px] font-black text-emerald-600 tabular-nums tracking-tight leading-none">{formatCurrency(stats.paid)}</div>
            <p className="text-mute text-[11px] mt-xs font-medium">Tổng đã thanh toán</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-xl lg:grid-cols-[1fr_2fr] items-start">
          {/* ══ WITHDRAW ══ */}
          <div className="rounded-3xl bg-white p-xl shadow-sm ring-1 ring-black/[0.05]">
            <div className="flex items-center gap-sm mb-xl">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-pink-400 shadow-sm">
                <Wallet size={16} strokeWidth={2} className="text-white" />
              </div>
              <div>
                <h2 className="font-black text-[15px] text-ink">Yêu cầu rút tiền</h2>
                <p className="text-[11px] text-mute">Tối thiểu {formatCurrency(MIN_WITHDRAW_AMOUNT)}</p>
              </div>
            </div>
            <div className="flex flex-col gap-lg">
              <div className="rounded-2xl bg-gradient-to-br from-primary/5 to-pink-50 border border-primary/10 px-lg py-md">
                <p className="text-[11px] font-bold uppercase tracking-wider text-primary/60 mb-xs">Số dư khả dụng</p>
                <p className="text-[28px] font-black text-primary tabular-nums leading-none">{formatCurrency(stats.available)}</p>
                {stats.available < MIN_WITHDRAW_AMOUNT && (
                  <p className="mt-xs text-[11px] font-medium text-mute">Cần thêm {formatCurrency(MIN_WITHDRAW_AMOUNT - stats.available)} nữa để rút</p>
                )}
              </div>
              <div className="rounded-2xl bg-gray-50 border border-gray-100 p-md">
                <div className="flex items-center justify-between mb-sm">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-mute/60">Tài khoản nhận</span>
                  <button type="button" onClick={openModal} className="flex items-center gap-xs text-[12px] font-bold text-primary hover:text-primary-active transition-colors">
                    <Edit2 size={11} strokeWidth={2.5} /> Chỉnh sửa
                  </button>
                </div>
                {paymentInfo.bankName && paymentInfo.bankAccountNumber ? (
                  <div className="rounded-xl bg-white border border-gray-100 p-sm shadow-sm">
                    <div className="text-[13px] font-bold text-ink leading-tight">{paymentInfo.bankName}</div>
                    <div className="text-[11px] text-mute font-medium mt-[2px] uppercase">{paymentInfo.bankAccountNumber} · {paymentInfo.bankAccountName}</div>
                  </div>
                ) : (
                  <div className="flex items-center gap-sm rounded-xl bg-amber-50 border border-amber-100 px-md py-sm">
                    <AlertCircle size={14} strokeWidth={2} className="text-amber-500 shrink-0" />
                    <div>
                      <div className="text-[12px] font-bold text-amber-700">Chưa có thông tin ngân hàng</div>
                      <div className="text-[11px] text-amber-600">Thêm để có thể rút tiền</div>
                    </div>
                  </div>
                )}
              </div>
              {error && <p className="text-[12px] font-bold text-red-600 rounded-xl bg-red-50 px-md py-sm">{error}</p>}
              {pendingRequest ? (
                <div className="flex items-start gap-sm rounded-2xl bg-amber-50 border border-amber-100 p-md">
                  <BellRing size={16} className="mt-[2px] shrink-0 text-amber-500" strokeWidth={2} />
                  <div>
                    <div className="text-[13px] font-bold text-amber-700">Đã gửi yêu cầu, đang chờ xử lý</div>
                    <div className="text-[12px] text-amber-600 mt-[2px]">Bạn đã yêu cầu rút {formatCurrency(pendingRequest.amount)}. Admin sẽ xử lý sớm nhất.</div>
                  </div>
                </div>
              ) : (
                <button type="button" onClick={handleSubmitRequest} disabled={!canRequest || submitting}
                  className="flex h-12 w-full items-center justify-center gap-sm rounded-2xl bg-primary text-[14px] font-black text-white shadow-md shadow-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 disabled:shadow-none disabled:translate-y-0">
                  {submitting ? <Loader2 size={16} className="animate-spin" /> : `Rút ${formatCurrency(stats.available)}`}
                </button>
              )}
              {!hasBankInfo && !pendingRequest && <p className="text-[11px] text-mute -mt-sm">Cần cập nhật thông tin ngân hàng trước khi rút tiền.</p>}
            </div>
          </div>

          {/* ══ HISTORY ══ */}
          <div className="rounded-3xl bg-white p-xl shadow-sm ring-1 ring-black/[0.05] overflow-hidden">
            <div className="flex items-center gap-sm mb-xl">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 shadow-sm">
                <Building2 size={16} strokeWidth={2} className="text-white" />
              </div>
              <div>
                <h2 className="font-black text-[15px] text-ink">Lịch sử giao dịch</h2>
                <p className="text-[11px] text-mute">{history.length} giao dịch</p>
              </div>
            </div>
            <div className="overflow-x-auto -mx-xl">
              <table className="w-full text-left min-w-[460px]">
                <thead>
                  <tr className="border-b border-gray-100">
                    {["Thời gian","Số tiền","Trạng thái","Mã phiếu"].map((h) => (
                      <th key={h} className="py-sm px-md text-[10px] font-bold uppercase tracking-wider text-mute/60">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {history.length === 0 ? (
                    <tr><td colSpan={4} className="py-2xl text-center">
                      <img src="/nhimchodoi.png" alt="" className="h-16 w-16 object-contain mx-auto mb-sm opacity-60" />
                      <p className="text-[13px] font-bold text-mute">Chưa có giao dịch nào</p>
                    </td></tr>
                  ) : history.map((tx, idx) => (
                    <tr key={idx} className="border-b border-gray-50 last:border-0 hover:bg-primary/[0.02] transition-colors">
                      <td className="py-md px-md text-[12px] font-medium text-mute">{tx.time}</td>
                      <td className="py-md px-md text-[13px] font-black text-ink">{tx.amount}</td>
                      <td className="py-md px-md">
                        <span className={`inline-flex items-center gap-xs rounded-full px-sm py-[3px] text-[11px] font-bold ${tx.status === "paid" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                          {tx.status === "paid" ? "✓ Đã nhận" : tx.status}
                        </span>
                      </td>
                      <td className="py-md px-md text-[11px] font-mono text-mute/60">{tx.code}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="pt-md"><Pagination totalPages={totalPages} currentPage={currentPage} /></div>
          </div>
        </div>
      </div>

      {/* ══ MODAL ══ */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-md">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl fade-in">
            <div className="flex items-center justify-between border-b border-gray-100 px-xl py-lg">
              <div className="flex items-center gap-sm">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-pink-400 shadow-sm">
                  <Building2 size={16} strokeWidth={2} className="text-white" />
                </div>
                <h3 className="font-black text-[16px] text-ink">Thông tin ngân hàng</h3>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="rounded-full p-sm text-mute hover:bg-gray-100 hover:text-ink transition-colors">
                <X size={18} strokeWidth={2.5} />
              </button>
            </div>
            <form onSubmit={handleSavePaymentInfo} className="p-xl flex flex-col gap-lg">
              <div className="flex flex-col gap-xs">
                <label className="text-[12px] font-bold uppercase tracking-wider text-mute/70">Ngân hàng</label>
                <div className="relative">
                  <input type="text" value={bankSearch}
                    onChange={(e) => { setBankSearch(e.target.value); setFormBankName(""); setShowBankOptions(true); }}
                    onFocus={() => setShowBankOptions(true)}
                    onBlur={() => setTimeout(() => setShowBankOptions(false), 150)}
                    placeholder="Gõ để tìm ngân hàng..."
                    className="h-12 w-full rounded-xl border-2 border-ink/10 bg-white px-md text-[14px] font-medium text-ink focus:border-primary focus:outline-none focus:shadow-[0_0_0_4px_rgba(236,64,122,0.08)]"
                  />
                  {showBankOptions && (
                    <div className="absolute z-10 mt-xs max-h-[220px] w-full overflow-y-auto rounded-2xl border border-gray-100 bg-white shadow-xl">
                      {filteredBanks.length === 0
                        ? <div className="px-md py-sm text-[13px] text-mute">Không tìm thấy</div>
                        : filteredBanks.map((b) => (
                          <button key={b} type="button" onMouseDown={() => selectBank(b)}
                            className={`block w-full px-md py-sm text-left text-[13px] font-medium transition-colors hover:bg-primary/5 ${b === formBankName ? "bg-primary/5 text-primary font-bold" : "text-ink"}`}>
                            {b}
                          </button>
                        ))
                      }
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-xs">
                <label className="text-[12px] font-bold uppercase tracking-wider text-mute/70">Số tài khoản</label>
                <input type="text" value={formBankAccountNumber} onChange={(e) => setFormBankAccountNumber(e.target.value)}
                  placeholder="VD: 1903..."
                  className="h-12 w-full rounded-xl border-2 border-ink/10 bg-white px-md text-[14px] font-medium text-ink focus:border-primary focus:outline-none focus:shadow-[0_0_0_4px_rgba(236,64,122,0.08)]" />
              </div>
              <div className="flex flex-col gap-xs">
                <label className="text-[12px] font-bold uppercase tracking-wider text-mute/70">Tên chủ tài khoản</label>
                <input type="text" value={formBankAccountName} onChange={(e) => setFormBankAccountName(e.target.value)}
                  placeholder="VD: NGUYEN VAN A"
                  className="h-12 w-full rounded-xl border-2 border-ink/10 bg-white px-md text-[14px] font-medium text-ink uppercase focus:border-primary focus:outline-none focus:shadow-[0_0_0_4px_rgba(236,64,122,0.08)]" />
              </div>
              <div className="flex gap-sm pt-sm">
                <button type="button" onClick={() => setIsModalOpen(false)} className="h-12 flex-1 rounded-2xl bg-gray-100 text-[14px] font-bold text-ink/60 hover:bg-gray-200 transition-colors">Huỷ</button>
                <button type="submit" disabled={isSaving} className="flex h-12 flex-1 items-center justify-center gap-sm rounded-2xl bg-primary text-[14px] font-black text-white shadow-md shadow-primary/25 hover:bg-primary-active transition-colors disabled:opacity-50">
                  {isSaving ? <Loader2 size={16} className="animate-spin" /> : "Lưu thay đổi"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
