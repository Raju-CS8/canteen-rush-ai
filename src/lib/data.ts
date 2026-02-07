export type RushLevel = "Low" | "Medium" | "High";
export type OrderStatus = "Ordered" | "Preparing" | "Ready";
export type VendorOrderStatus = "Pending" | "Preparing" | "Ready";

export interface FoodItem {
  id: string;
  name: string;
  price: number;
  prepTime: number; // minutes
  rushLevel: RushLevel;
  category: string;
  image: string;
}

export interface Order {
  id: string;
  items: FoodItem[];
  status: OrderStatus;
  predictedPickup: string;
  orderedAt: string;
  studentName: string;
}

export interface VendorOrder {
  id: string;
  itemName: string;
  studentName: string;
  pickupTime: string;
  status: VendorOrderStatus;
  orderedAt: string;
}

export const BREAK_TIME = "12:30 PM";
export const CURRENT_TIME = "11:45 AM";

export const foodItems: FoodItem[] = [
  { id: "1", name: "Grilled Chicken Wrap", price: 6.5, prepTime: 8, rushLevel: "Low", category: "Wraps", image: "🌯" },
  { id: "2", name: "Margherita Pizza", price: 5.0, prepTime: 12, rushLevel: "High", category: "Pizza", image: "🍕" },
  { id: "3", name: "Caesar Salad", price: 4.5, prepTime: 4, rushLevel: "Low", category: "Salads", image: "🥗" },
  { id: "4", name: "Veggie Burger", price: 5.5, prepTime: 10, rushLevel: "Medium", category: "Burgers", image: "🍔" },
  { id: "5", name: "Pasta Carbonara", price: 7.0, prepTime: 14, rushLevel: "High", category: "Pasta", image: "🍝" },
  { id: "6", name: "Falafel Bowl", price: 6.0, prepTime: 7, rushLevel: "Low", category: "Bowls", image: "🥙" },
  { id: "7", name: "Chicken Tikka", price: 7.5, prepTime: 15, rushLevel: "High", category: "Mains", image: "🍗" },
  { id: "8", name: "Fruit Smoothie", price: 3.5, prepTime: 3, rushLevel: "Low", category: "Drinks", image: "🥤" },
  { id: "9", name: "Fish Tacos", price: 6.0, prepTime: 9, rushLevel: "Medium", category: "Tacos", image: "🌮" },
  { id: "10", name: "Iced Coffee", price: 2.5, prepTime: 2, rushLevel: "Low", category: "Drinks", image: "☕" },
];

export const vendorOrders: VendorOrder[] = [
  { id: "V001", itemName: "Grilled Chicken Wrap", studentName: "Alex M.", pickupTime: "12:32 PM", status: "Pending", orderedAt: "11:40 AM" },
  { id: "V002", itemName: "Margherita Pizza", studentName: "Priya S.", pickupTime: "12:35 PM", status: "Preparing", orderedAt: "11:38 AM" },
  { id: "V003", itemName: "Caesar Salad", studentName: "Jordan K.", pickupTime: "12:31 PM", status: "Ready", orderedAt: "11:42 AM" },
  { id: "V004", itemName: "Pasta Carbonara", studentName: "Sam R.", pickupTime: "12:38 PM", status: "Pending", orderedAt: "11:35 AM" },
  { id: "V005", itemName: "Veggie Burger", studentName: "Taylor N.", pickupTime: "12:34 PM", status: "Preparing", orderedAt: "11:39 AM" },
  { id: "V006", itemName: "Chicken Tikka", studentName: "Chris L.", pickupTime: "12:40 PM", status: "Pending", orderedAt: "11:33 AM" },
  { id: "V007", itemName: "Falafel Bowl", studentName: "Riley P.", pickupTime: "12:33 PM", status: "Ready", orderedAt: "11:41 AM" },
];
