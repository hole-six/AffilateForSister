// Đơn đã "approved" (tiền hoa hồng đã ghi nhận) vẫn cần chờ đủ số ngày kể từ
// completedAt trước khi được tính vào số dư khả dụng để rút — vì trong khoảng
// này sàn (Shopee) vẫn có thể đối soát/thu hồi đơn (đổi trả, huỷ, gian lận).
export const WITHDRAW_HOLD_DAYS = 15;
const HOLD_MS = WITHDRAW_HOLD_DAYS * 24 * 60 * 60 * 1000;

type OrderLike = {
  orderStatus: string;
  payoutStatus: string;
  completedAt: Date | string | null;
};

/** true nếu đơn đã đủ điều kiện tính vào số dư khả dụng để rút. */
export function isWithdrawEligible(order: OrderLike): boolean {
  if (order.orderStatus !== "approved" || order.payoutStatus !== "unpaid") return false;
  if (!order.completedAt) return false;
  return Date.now() - new Date(order.completedAt).getTime() >= HOLD_MS;
}

/**
 * true nếu đơn đã approved + unpaid nhưng còn đang trong thời gian giữ (chưa
 * đủ 15 ngày, hoặc chưa có completedAt để bắt đầu tính) — hiển thị "đang đối soát".
 */
export function isWithdrawClearing(order: OrderLike): boolean {
  return order.orderStatus === "approved" && order.payoutStatus === "unpaid" && !isWithdrawEligible(order);
}

/** Số ngày còn phải chờ (null nếu không áp dụng hoặc chưa có completedAt). */
export function daysUntilWithdrawEligible(order: OrderLike): number | null {
  if (order.orderStatus !== "approved" || order.payoutStatus !== "unpaid") return null;
  if (!order.completedAt) return null;
  const remainingMs = HOLD_MS - (Date.now() - new Date(order.completedAt).getTime());
  if (remainingMs <= 0) return 0;
  return Math.ceil(remainingMs / (24 * 60 * 60 * 1000));
}
