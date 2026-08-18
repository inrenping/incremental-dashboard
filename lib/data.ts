export type TrainingRecord = {
  id: string;
  date: string;
  type: string;
  duration: string;
  distance: string;
  avgHeartRate: number;
  calories: number;
  status: "completed" | "scheduled" | "skipped";
};

export const trainingRecords: TrainingRecord[] = [
  {
    id: "1",
    date: "2026-08-16",
    type: "跑步",
    duration: "52 分钟",
    distance: "8.2 km",
    avgHeartRate: 148,
    calories: 620,
    status: "completed",
  },
  {
    id: "2",
    date: "2026-08-15",
    type: "力量训练",
    duration: "60 分钟",
    distance: "—",
    avgHeartRate: 132,
    calories: 480,
    status: "completed",
  },
  {
    id: "3",
    date: "2026-08-14",
    type: "骑行",
    duration: "85 分钟",
    distance: "32.5 km",
    avgHeartRate: 138,
    calories: 760,
    status: "completed",
  },
  {
    id: "4",
    date: "2026-08-12",
    type: "游泳",
    duration: "45 分钟",
    distance: "1.6 km",
    avgHeartRate: 125,
    calories: 420,
    status: "completed",
  },
  {
    id: "5",
    date: "2026-08-11",
    type: "间歇跑",
    duration: "40 分钟",
    distance: "6.4 km",
    avgHeartRate: 158,
    calories: 540,
    status: "completed",
  },
  {
    id: "6",
    date: "2026-08-10",
    type: "拉伸恢复",
    duration: "30 分钟",
    distance: "—",
    avgHeartRate: 95,
    calories: 150,
    status: "completed",
  },
  {
    id: "7",
    date: "2026-08-09",
    type: "力量训练",
    duration: "55 分钟",
    distance: "—",
    avgHeartRate: 128,
    calories: 450,
    status: "skipped",
  },
  {
    id: "8",
    date: "2026-08-08",
    type: "长距离跑",
    duration: "110 分钟",
    distance: "16.0 km",
    avgHeartRate: 142,
    calories: 980,
    status: "completed",
  },
  {
    id: "9",
    date: "2026-08-18",
    type: "晨跑",
    duration: "45 分钟",
    distance: "7.0 km",
    avgHeartRate: 144,
    calories: 520,
    status: "scheduled",
  },
];

export type MonthlyTrend = {
  month: string;
  duration: number;
  distance: number;
  sessions: number;
};

export const monthlyTrend: MonthlyTrend[] = [
  { month: "1 月", duration: 12, distance: 68, sessions: 8 },
  { month: "2 月", duration: 10, distance: 52, sessions: 7 },
  { month: "3 月", duration: 15, distance: 92, sessions: 10 },
  { month: "4 月", duration: 13, distance: 78, sessions: 9 },
  { month: "5 月", duration: 18, distance: 118, sessions: 12 },
  { month: "6 月", duration: 16, distance: 104, sessions: 11 },
  { month: "7 月", duration: 20, distance: 138, sessions: 13 },
  { month: "8 月", duration: 22, distance: 152, sessions: 14 },
];
