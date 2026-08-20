export type Property = {
  id: string;
  name: string;
  project: string;
  owners: string;
  officer: string;
  isActive: boolean;
  price: number;
  paid: number;
  paidPct: number;
  due: number;
  duePct: number;
  nextDate: string;
  nextDays: number;
  nextAmount: number;
};

export type SortKey = "price" | "paid" | "due" | "next";
export type SortDir = "asc" | "desc";
export type ViewMode = "card" | "table";
