import { Users, UserCheck, Lock } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { CreateCustomerForm } from "@/components/admin/CreateCustomerForm";
import { AdminCustomersClient } from "@/components/admin/AdminCustomersClient";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatCard } from "@/components/ui/StatCard";

export default async function AdminCustomersPage({ searchParams }: { searchParams: { q?: string; page?: string; tab?: string; sort?: string; order?: string } }) {
  const page = Number(searchParams.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;
  const q = searchParams.q || "";
  const tab = searchParams.tab || "all";

  const where: any = {};
  if (q) {
    where.OR = [
      { fullName: { contains: q } },
      { customerCode: { contains: q } },
      { phone: { contains: q } },
      { telegramUsername: { contains: q } },
    ];
  }
  if (tab === "active") where.status = "active";
  if (tab === "locked") where.status = { not: "active" };

  const orderByField = searchParams.sort || "createdAt";
  const orderByDir = searchParams.order || "desc";
  const orderBy = { [orderByField]: orderByDir };

  const [totalCount, activeCount, lockedCount] = await Promise.all([
    prisma.customer.count(),
    prisma.customer.count({ where: { status: "active" } }),
    prisma.customer.count({ where: { status: { not: "active" } } }),
  ]);

  const [customers, filteredCount] = await Promise.all([
    prisma.customer.findMany({
      where,
      orderBy,
      skip,
      take: limit,
      include: {
        _count: { select: { trackingLinks: true, orders: true } },
        orders: { select: { customerRewardAmount: true, payoutStatus: true } },
      },
    }),
    prisma.customer.count({ where }),
  ]);

  const rows = customers.map((c) => {
    const totalReward = c.orders.reduce((s, o) => s + Number(o.customerRewardAmount), 0);
    const debt = c.orders
      .filter((o) => o.payoutStatus !== "paid")
      .reduce((s, o) => s + Number(o.customerRewardAmount), 0);
    return {
      id: c.id,
      fullName: c.fullName,
      customerCode: c.customerCode,
      phone: c.phone,
      zaloUserId: c.zaloUserId,
      telegramUsername: c.telegramUsername,
      telegramUserId: c.telegramUserId,
      status: c.status,
      linkCount: c._count.trackingLinks,
      totalReward,
      debt,
    };
  });

  const totalPages = Math.ceil(filteredCount / limit);

  return (
    <div className="flex flex-col gap-lg fade-in">

      <PageHeader
        icon="/nhimchaomung.png"
        title="Khách hàng"
        subtitle="Quản lý hệ thống khách hàng"
        stats={[{ label: "Hoạt động:", value: String(activeCount) }, { label: "Tổng:", value: String(totalCount) }]}
        action={<CreateCustomerForm />}
      />

      {/* ── STAT CARDS ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-md">
        <StatCard icon={Users} label="Tổng khách" value={String(totalCount)} />
        <StatCard icon={UserCheck} label="Hoạt động" value={String(activeCount)} tone="positive" />
        <div className="col-span-2 sm:col-span-1">
          <StatCard icon={Lock} label="Bị khoá" value={String(lockedCount)} tone="negative" />
        </div>
      </div>

      <AdminCustomersClient
        customers={rows}
        totalPages={totalPages}
        currentPage={page}
        counts={{ all: totalCount, active: activeCount, locked: lockedCount, debt: 0 }}
      />
    </div>
  );
}
