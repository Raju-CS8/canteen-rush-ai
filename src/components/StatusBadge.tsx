import { VendorOrderStatus } from "@/lib/data";

const config: Record<VendorOrderStatus, { bg: string; text: string }> = {
  Pending: { bg: "bg-status-pending-bg", text: "text-status-pending" },
  Preparing: { bg: "bg-status-preparing-bg", text: "text-status-preparing" },
  Ready: { bg: "bg-status-ready-bg", text: "text-status-ready" },
};

export function StatusBadge({ status }: { status: VendorOrderStatus }) {
  const c = config[status];
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${c.bg} ${c.text}`}>
      {status}
    </span>
  );
}
