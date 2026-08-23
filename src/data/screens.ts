export type ScreenStatus = "available" | "coming-soon";

export type ScreenEntry = {
  id: string;
  title: string;
  category: string;
  date: string; // ISO date, e.g. "2026-08-23"
  route: string;
  status: ScreenStatus;
  thumbnail?: string;
  description?: string;
};

// Centralized registry of redesigned screens. Add future entries here —
// the Hub groups, sorts, filters and renders everything from this list alone.
export const screens: ScreenEntry[] = [
  {
    id: "assigned-properties",
    title: "Assigned Properties",
    category: "Collections",
    date: "2026-08-23",
    route: "/assigned-properties",
    status: "available",
    thumbnail: "/thumbnails/assigned-properties.png",
    description:
      "Card and table views of an officer's assigned collections properties, with sorting, filtering and quick actions.",
  },
  {
    id: "sell-details",
    title: "Sell Details",
    category: "Sales",
    date: "2026-08-18",
    route: "/sell-details",
    status: "coming-soon",
    description: "Sale record breakdown: buyer, unit, payment schedule and documents.",
  },
];
