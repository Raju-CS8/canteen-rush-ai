import { useEffect, useState } from "react";
import { getOrder } from "@/lib/api";

import { Clock, CheckCircle2, ChefHat, Package } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const stages = [
  { label: "Ordered", icon: Package, done: true },
  { label: "Preparing", icon: ChefHat, done: true },
  { label: "Ready", icon: CheckCircle2, done: false },
];

export default function OrderStatus() {

  const [progress, setProgress] = useState(33);
  const [eta, setEta] = useState(0);
  const [status, setStatus] = useState("Pending");
  const [actualReady, setActualReady] = useState("");

  // ---- REAL TIME TIMER ----
  useEffect(() => {
    const timer = setInterval(() => {
      setEta((prev) => (prev > 0 ? prev - 1 : 0));
    }, 60000); // every minute

    return () => clearInterval(timer);
  }, []);

  // ---- AUTO FETCH ORDER EVERY 5 SEC ----
  useEffect(() => {
    const id = localStorage.getItem("orderId");

    const fetchData = () => {
      if (!id) return;

      getOrder(Number(id)).then((order) => {
        if (!order) return;

        setStatus(order.status);
        setEta(order.eta);

        if (order.status === "Pending") setProgress(33);
        if (order.status === "Preparing") setProgress(66);

        if (order.status === "Ready") {
          setProgress(100);
          setActualReady(new Date().toLocaleTimeString());
        }
      });
    };

    fetchData();

    const auto = setInterval(fetchData, 5000);

    return () => clearInterval(auto);
  }, []);

  return (
    <main className="mx-auto max-w-2xl px-4 py-12 flex flex-col items-center gap-8">

      <div className="w-full rounded-xl border bg-card p-8 text-center shadow-sm">
        <p className="text-sm font-medium text-muted-foreground mb-2">
          Predicted Pickup Time
        </p>

        <div className="font-mono text-5xl font-bold tracking-wider text-primary">
          {status === "Ready" ? "READY" : `${eta} min`}
        </div>

        <p className="text-sm text-muted-foreground mt-3 flex items-center justify-center gap-1.5">
          <Clock className="h-3.5 w-3.5" />

          {status === "Ready"
            ? `Actual Ready Time: ${actualReady}`
            : `Estimated ${eta} minutes remaining`}
        </p>
      </div>

      {/* Progress */}
      <div className="w-full space-y-4">
        <Progress value={progress} className="h-2.5" />

        <div className="flex justify-between">
          {stages.map((s, i) => {

            let active = false;

            if (status === "Pending" && i === 0) active = true;
            if (status === "Preparing" && i <= 1) active = true;
            if (status === "Ready") active = true;

            return (
              <div key={s.label} className="flex flex-col items-center gap-1.5">
                <div
                  className={`h-10 w-10 rounded-full flex items-center justify-center ${
                    active
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  <s.icon className="h-5 w-5" />
                </div>

                <span
                  className={`text-xs font-medium ${
                    active ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Order details */}
      <div className="w-full rounded-xl border bg-card p-6 space-y-3">
        <h3 className="font-semibold">Order Summary</h3>

        <div className="space-y-2 text-sm">
          {[
            { name: "Grilled Chicken Wrap", qty: 1, price: 6.5 },
            { name: "Iced Coffee", qty: 1, price: 2.5 },
          ].map((item) => (
            <div key={item.name} className="flex justify-between">
              <span className="text-muted-foreground">
                {item.qty}× {item.name}
              </span>
              <span className="font-medium">${item.price.toFixed(2)}</span>
            </div>
          ))}

          <div className="border-t pt-2 flex justify-between font-semibold">
            <span>Total</span>
            <span>$9.00</span>
          </div>
        </div>
      </div>

      <p className="text-xs text-muted-foreground text-center max-w-sm">
        Prediction based on vendor load, historical rush data, and real-time order queue analysis.
      </p>

    </main>
  );
}
