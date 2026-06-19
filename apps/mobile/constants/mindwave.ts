import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";

export type IconName = ComponentProps<typeof Ionicons>["name"];

export const COLORS = {
  background: "#F4F0EA",
  surface: "#F8F8F6",
  ink: "#333A42",
  muted: "rgba(51, 58, 66, 0.62)",
  moss: "#0F6E56",
  mossSoft: "#E3EEE8",
  orange: "#D98A60",
  line: "rgba(51, 58, 66, 0.1)",
};

export type SoundscapeCategory =
  | "推荐"
  | "混音"
  | "自然"
  | "东方"
  | "专注"
  | "睡眠";

export type SoundscapeItem = {
  audioUrl: string;
  category: SoundscapeCategory;
  description: string;
  duration: string;
  id: string;
  name: string;
  paid: boolean;
  tag: string;
  tone: string;
};

export const SOUNDSCAPES: SoundscapeItem[] = [
  {
    id: "morning-bamboo",
    name: "晨雾竹林",
    tag: "晨间冥想",
    category: "自然",
    duration: "18 分钟",
    paid: false,
    tone: "#0F6E56",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    description: "竹叶和远钟慢慢拉开一天的边界。",
  },
  {
    id: "deep-brown-noise",
    name: "棕噪深工",
    tag: "深度专注",
    category: "专注",
    duration: "45 分钟",
    paid: false,
    tone: "#607D8B",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    description: "稳定低频帮助进入长时间心流。",
  },
  {
    id: "rain-reading",
    name: "雨夜阅读",
    tag: "深度专注",
    category: "混音",
    duration: "45 分钟",
    paid: false,
    tone: "#D98A60",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    description: "雨声、壁炉和翻书声组合成柔和背景。",
  },
  {
    id: "bamboo-mindfulness",
    name: "竹林正念",
    tag: "正念混音",
    category: "混音",
    duration: "28 分钟",
    paid: false,
    tone: "#4F7F73",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    description: "竹叶、颂钵与远钟为呼吸练习留出空间。",
  },
  {
    id: "tea-room",
    name: "茶室煮水",
    tag: "东方声景",
    category: "东方",
    duration: "32 分钟",
    paid: true,
    tone: "#8D6E58",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    description: "水沸、茶盏与微弱木质回响。",
  },
  {
    id: "distant-stream",
    name: "远山溪流",
    tag: "减压放松",
    category: "自然",
    duration: "30 分钟",
    paid: false,
    tone: "#4F7F73",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    description: "溪流与山风适合傍晚复位。",
  },
  {
    id: "midnight-rain",
    name: "深夜雨声",
    tag: "睡眠助眠",
    category: "睡眠",
    duration: "60 分钟",
    paid: false,
    tone: "#455A64",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
    description: "低亮度雨声，适合睡前淡出。",
  },
  {
    id: "temple-bells",
    name: "晨钟暮鼓",
    tag: "东方声景",
    category: "东方",
    duration: "24 分钟",
    paid: true,
    tone: "#0F6E56",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    description: "钟声与鼓点保持很低的存在感。",
  },
  {
    id: "white-noise-sleep",
    name: "白噪入眠",
    tag: "睡眠助眠",
    category: "睡眠",
    duration: "60 分钟",
    paid: false,
    tone: "#607D8B",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
    description: "均匀白噪音帮助睡前屏蔽环境干扰。",
  },
];

export const FEATURED_SCENE: SoundscapeItem = {
  id: "bamboo-wind",
  name: "竹林风声",
  tag: "编辑推荐 · 东方专区",
  category: "东方",
  duration: "28 分钟",
  paid: false,
  tone: "#0F6E56",
  audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
  description: "低饱和远山与轻风，适合傍晚复位与深呼吸。",
};

export const CATEGORY_FILTERS = [
  "推荐",
  "全部",
  "混音",
  "自然",
  "东方",
  "我的收藏",
] as const;
export type CategoryFilter = (typeof CATEGORY_FILTERS)[number];

export const MIXES = [
  {
    id: "rain-reading-mix",
    name: "雨夜阅读",
    formula: "雨声 60% + 壁炉 25% + 翻书声 15%",
  },
  {
    id: "bamboo-mindfulness",
    name: "竹林正念",
    formula: "竹叶 45% + 颂钵 35% + 远钟 20%",
  },
];

export const HOME_HABITS = ["晨间冥想", "深度阅读", "睡前放松"] as const;
export type HomeHabitName = (typeof HOME_HABITS)[number];

export const QUICK_ACTIONS: {
  icon: IconName;
  route: "/focus" | "/profile" | "/soundscape";
  subtitle: string;
  title: string;
}[] = [
  {
    title: "睡眠监测",
    subtitle: "今晚记录",
    icon: "moon-outline",
    route: "/profile",
  },
  {
    title: "心流专注",
    subtitle: "45 分钟",
    icon: "timer-outline",
    route: "/focus",
  },
  {
    title: "呼吸法",
    subtitle: "3 分钟",
    icon: "leaf-outline",
    route: "/focus",
  },
  {
    title: "午休小憩",
    subtitle: "20 分钟",
    icon: "cafe-outline",
    route: "/soundscape",
  },
];

export const FOCUS_MODES = [
  { id: "pomodoro", label: "标准番茄", seconds: 25 * 60, stage: "专注阶段" },
  { id: "custom", label: "自定义", seconds: 45 * 60, stage: "深度工作" },
  { id: "free", label: "自由计时", seconds: 0, stage: "正向计时" },
  { id: "countdown", label: "倒计时", seconds: 15 * 60, stage: "轻量复位" },
] as const;

export type FocusModeId = (typeof FOCUS_MODES)[number]["id"];

export const FOCUS_HABITS = [
  { name: "每日阅读", target: "60 分钟", streak: "连续 12 天", progress: 0.72 },
  { name: "晨间冥想", target: "15 分钟", streak: "连续 7 天", progress: 1 },
  { name: "睡前放松", target: "30 分钟", streak: "第 3 天", progress: 0.35 },
] as const;

export type FocusHabitName = (typeof FOCUS_HABITS)[number]["name"];

export function formatTimer(seconds: number) {
  const safeSeconds = Math.max(0, seconds);
  const minutes = Math.floor(safeSeconds / 60);
  const remainder = safeSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`;
}

export function findSoundscapeByName(name: string) {
  return SOUNDSCAPES.find((item) => item.name === name);
}
