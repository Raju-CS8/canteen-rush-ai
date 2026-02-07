const BASE = "http://localhost:5000/api";

export async function placeOrder(items: any) {
  const res = await fetch(BASE + "/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items })
  });

  return res.json();
}

export async function getOrder(id: number) {
  const res = await fetch(BASE + "/orders/" + id);
  return res.json();
}

export async function getAllOrders() {
  const res = await fetch(BASE + "/orders");
  return res.json();
}

export async function markReady(id: number) {
  const res = await fetch(BASE + "/orders/ready/" + id, {
    method: "PATCH"
  });

  return res.json();
}
