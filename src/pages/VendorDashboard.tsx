import { useState, useEffect } from "react";
import { CheckCircle2, Clock, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";
import { toast } from "sonner";

import { getAllOrders, markReady as markReadyAPI } from "@/lib/api";

export default function VendorDashboard() {

  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    getAllOrders().then(setOrders);
  }, []);

  const markReady = async (id: string) => {
    await markReadyAPI(Number(id));
    getAllOrders().then(setOrders);
    toast.success("Order marked as ready");
  };

  const sorted = [...orders];

  const stats = {
    pending: orders.filter((o) => o.status === "Pending").length,
    preparing: orders.filter((o) => o.status === "Preparing").length,
    ready: orders.filter((o) => o.status === "Ready").length,
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <div className="flex items-center gap-2 mb-6">
        <LayoutDashboard className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold tracking-tight">Vendor Dashboard</h1>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Pending", count: stats.pending, color: "text-status-pending" },
          { label: "Preparing", count: stats.preparing, color: "text-status-preparing" },
          { label: "Ready", count: stats.ready, color: "text-status-ready" },
        ].map((s) => (
          <div key={s.label} className="rounded-lg border bg-card p-4 text-center">
            <div className={`text-2xl font-bold ${s.color}`}>{s.count}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border bg-card overflow-hidden">
        <div className="grid grid-cols-[1fr_1fr_auto_auto_auto] gap-4 px-5 py-3 border-b text-xs font-medium text-muted-foreground uppercase tracking-wider">
          <span>Item</span>
          <span>Student</span>
          <span>Pickup</span>
          <span>Status</span>
          <span>Action</span>
        </div>

        {sorted.map((order) => (
          <div
            key={order.id}
            className="grid grid-cols-[1fr_1fr_auto_auto_auto] gap-4 items-center px-5 py-3.5 border-b last:border-0 hover:bg-muted/50 transition-colors"
          >
            <span className="font-medium text-sm">
              {JSON.parse(order.items)[0]?.name || "Item"}
            </span>

            <span className="text-sm text-muted-foreground">
              Student
            </span>

            <span className="text-sm font-mono flex items-center gap-1">
              <Clock className="h-3 w-3 text-muted-foreground" />
              {order.eta} min
            </span>

            <StatusBadge status={order.status} />

            {order.status !== "Ready" ? (
              <Button
                size="sm"
                variant="outline"
                className="gap-1"
                onClick={() => markReady(order.id)}
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                Ready
              </Button>
            ) : (
              <span className="text-xs text-status-ready font-medium">✓ Done</span>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
