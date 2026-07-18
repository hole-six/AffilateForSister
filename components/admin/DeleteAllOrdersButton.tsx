"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2 } from "lucide-react";
import { useModal } from "@/components/ui/ModalProvider";

export function DeleteAllOrdersButton() {
  const router = useRouter();
  const modal = useModal();
  const [deleting, setDeleting] = useState(false);

  async function handleClick() {
    const ok = await modal.confirm({
      title: "Xoá toàn bộ đơn hàng?",
      message: "Toàn bộ đơn hàng và phiếu thanh toán liên quan sẽ bị xoá vĩnh viễn — không thể hoàn tác. Chỉ dùng khi đang dọn dữ liệu mẫu trước khi import CSV thật.",
      iconType: "danger",
      confirmText: "Xoá toàn bộ",
      cancelText: "Huỷ",
    });
    if (!ok) return;

    setDeleting(true);
    try {
      const res = await fetch("/api/orders", { method: "DELETE" });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        await modal.alert({ title: "Lỗi", message: d.error || "Không xoá được dữ liệu", iconType: "danger" });
        return;
      }
      router.refresh();
    } finally {
      setDeleting(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={deleting}
      className="flex items-center gap-xs rounded-lg border border-negative/20 bg-negative/5 px-lg py-[10px] text-[13px] font-bold text-negative shadow-sm transition-all hover:bg-negative/10 active:scale-[0.97] disabled:opacity-50"
    >
      {deleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} strokeWidth={2.5} />}
      Xoá toàn bộ dữ liệu
    </button>
  );
}
