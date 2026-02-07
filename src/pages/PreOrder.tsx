import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RushBadge } from "@/components/RushBadge";
import { foodItems, FoodItem } from "@/lib/data";
import { toast } from "sonner";

import { placeOrder } from "@/lib/api";

export default function PreOrder() {
  const [cart, setCart] = useState<FoodItem[]>([]);
  const navigate = useNavigate();

  const addToCart = (item: FoodItem) => {
    setCart((prev) => [...prev, item]);
    toast.success(`${item.name} added`);
  };

  const handleOrder = async () => {
    if (cart.length === 0) {
      toast.error("Add at least one item");
      return;
    }

    const result = await placeOrder(cart);

    localStorage.setItem("orderId", result.id);

    navigate("/order-status");
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Pre-Order Menu</h1>
          <p className="text-sm text-muted-foreground">Select items to pre-order before your break</p>
        </div>
        <Button onClick={handleOrder} size="lg" className="gap-2">
          <ShoppingBag className="h-4 w-4" />
          Place Order ({cart.length})
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {foodItems.map((item) => (
          <div
            key={item.id}
            className="rounded-xl border bg-card p-5 flex flex-col gap-3 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <span className="text-3xl">{item.image}</span>
              <RushBadge level={item.rushLevel} />
            </div>

            <div>
              <h3 className="font-semibold text-base">{item.name}</h3>
              <p className="text-xs text-muted-foreground">{item.category}</p>
            </div>

            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {item.prepTime} min
              </span>
              <span className="font-semibold text-foreground">
                ${item.price.toFixed(2)}
              </span>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="mt-auto"
              onClick={() => addToCart(item)}
            >
              Add to Order
            </Button>
          </div>
        ))}
      </div>
    </main>
  );
}
