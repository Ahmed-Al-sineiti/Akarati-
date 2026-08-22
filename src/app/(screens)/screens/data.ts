export interface ScreenData {
  id: string;
  name: string;
  description: string;
  path: string;
  date?: string;
}

export interface MonthData {
  id: string;
  name: string;
  description: string;
  screens: ScreenData[];
}

export const screensData: MonthData[] = [
  {
    id: "august-2026",
    name: "August 2026",
    description: "Initial prototype screens and dashboard components.",
    screens: [
      {
        id: "example",
        name: "Example Screen",
        description: "A test screen to demonstrate the isolated layout.",
        path: "/screens/august-2026/example",
        date: "Aug 23, 2026",
      },
      {
        id: "login-concept",
        name: "Login Concept",
        description: "Modern glassmorphism login page design.",
        path: "/screens/august-2026/login-concept",
        date: "Aug 24, 2026",
      },
    ],
  },
  {
    id: "september-2026",
    name: "September 2026",
    description: "Advanced data visualization and tables.",
    screens: [],
  }
];
