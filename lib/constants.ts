// ─── Order Statuses ──────────────────────────────────────

export const ORDER_STATUS = {
  PLACED: "PLACED",
  PREPARING: "PREPARING",
  SERVED: "SERVED",
  CANCELLED: "CANCELLED",
} as const;

export type OrderStatus = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  PLACED: "Placed",
  PREPARING: "Preparing",
  SERVED: "Served",
  CANCELLED: "Cancelled",
};

export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
  PLACED: "bg-[#2eab57]/15 text-[#1e7a3c]",
  PREPARING: "bg-[#f58220]/15 text-[#c66a10]",
  SERVED: "bg-[#1a3a8f]/10 text-[#1a3a8f]",
  CANCELLED: "bg-[#e32726]/10 text-[#e32726]",
};

// ─── Payment ─────────────────────────────────────────────

export const PAYMENT_METHOD = {
  CASH: "CASH",
  UPI: "UPI",
  ONLINE: "ONLINE",
} as const;

export type PaymentMethod = (typeof PAYMENT_METHOD)[keyof typeof PAYMENT_METHOD];

export const PAYMENT_STATUS = {
  PAID: "PAID",
  UNPAID: "UNPAID",
} as const;

export type PaymentStatus = (typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS];

export const PAYMENT_STATUS_COLORS: Record<PaymentStatus, string> = {
  PAID: "bg-[#2eab57]/15 text-[#1e7a3c]",
  UNPAID: "bg-[#f58220]/15 text-[#c66a10]",
};

// ─── Menu Categories ─────────────────────────────────────

export const MENU_CATEGORIES = {
  SNACKS: "SNACKS",
  MEALS: "MEALS",
  DRINKS: "DRINKS",
} as const;

export type MenuCategory = (typeof MENU_CATEGORIES)[keyof typeof MENU_CATEGORIES];

export const MENU_CATEGORY_LABELS: Record<MenuCategory, string> = {
  SNACKS: "Snacks",
  MEALS: "Meals",
  DRINKS: "Drinks",
};

// ─── User Roles ──────────────────────────────────────────

export const USER_ROLES = {
  PARENT: "PARENT",
  ADMIN: "ADMIN",
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

// ─── Predefined Instructions ─────────────────────────────

export const PREDEFINED_INSTRUCTIONS = [
  "Less oily",
  "No pav",
  "Less spicy",
  "No onion",
] as const;
