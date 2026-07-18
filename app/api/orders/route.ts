import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

// DELETE: xoá toàn bộ đơn hàng + phiếu thanh toán liên quan (admin only) —
// dùng khi dữ liệu hiện có chỉ là dữ liệu mẫu, cần dọn sạch trước khi import CSV thật.
export async function DELETE() {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Không có quyền" }, { status: 403 });
  }

  const result = await prisma.$transaction(async (tx) => {
    const items = await tx.paymentBatchItem.deleteMany({});
    const batches = await tx.paymentBatch.deleteMany({});
    const orders = await tx.order.deleteMany({});
    return { items: items.count, batches: batches.count, orders: orders.count };
  });

  return NextResponse.json({ ok: true, deleted: result });
}
