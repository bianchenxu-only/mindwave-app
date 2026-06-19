import { create } from "zustand";

import {
  FOCUS_HABITS,
  FOCUS_MODES,
  HOME_HABITS,
  SOUNDSCAPES,
  type CategoryFilter,
  type FocusHabitName,
  type FocusModeId,
  type HomeHabitName,
  type SoundscapeItem,
} from "@/constants/mindwave";

type SettingsState = {
  haptics: boolean;
  mindfulReminders: boolean;
  privateMode: boolean;
  sleepFadeOut: boolean;
};

type MindWaveState = {
  category: CategoryFilter;
  checkedInSoundscapeIds: string[];
  favoriteSoundscapeIds: string[];
  focusHabitProgress: Record<FocusHabitName, number>;
  focusModeId: FocusModeId;
  homeHabits: Record<HomeHabitName, boolean>;
  isFocusRunning: boolean;
  isPlaying: boolean;
  playerTimerLabel: string;
  remainingFocusSeconds: number;
  settings: SettingsState;
  track: SoundscapeItem;
  advanceFocusHabit: (name: FocusHabitName) => void;
  checkInSoundscape: (id: string) => void;
  playTrack: (track: SoundscapeItem, timerLabel?: string) => void;
  resetFocusTimer: () => void;
  selectCategory: (category: CategoryFilter) => void;
  setFocusMode: (modeId: FocusModeId) => void;
  shuffleTrack: (category?: CategoryFilter) => void;
  tickFocusTimer: () => void;
  toggleFavorite: (id: string) => void;
  toggleFocusRunning: () => void;
  toggleHomeHabit: (name: HomeHabitName) => void;
  togglePlayback: () => void;
  toggleSetting: (key: keyof SettingsState) => void;
};

const defaultTrack =
  SOUNDSCAPES.find((item) => item.id === "tea-room") ?? SOUNDSCAPES[0]!;
const defaultMode = FOCUS_MODES[0];

const initialHomeHabits = HOME_HABITS.reduce(
  (acc, habit, index) => {
    acc[habit] = index < 2;
    return acc;
  },
  {} as Record<HomeHabitName, boolean>,
);

const initialFocusProgress = FOCUS_HABITS.reduce(
  (acc, habit) => {
    acc[habit.name] = habit.progress;
    return acc;
  },
  {} as Record<FocusHabitName, number>,
);

function getMode(modeId: FocusModeId) {
  return FOCUS_MODES.find((mode) => mode.id === modeId) ?? defaultMode;
}

export const useMindWaveStore = create<MindWaveState>((set, get) => ({
  category: "推荐",
  checkedInSoundscapeIds: [],
  favoriteSoundscapeIds: ["rain-reading"],
  focusHabitProgress: initialFocusProgress,
  focusModeId: defaultMode.id,
  homeHabits: initialHomeHabits,
  isFocusRunning: false,
  isPlaying: false,
  playerTimerLabel: "选择声景后开始播放",
  remainingFocusSeconds: defaultMode.seconds,
  settings: {
    haptics: true,
    mindfulReminders: true,
    privateMode: true,
    sleepFadeOut: true,
  },
  track: defaultTrack,
  advanceFocusHabit: (name) =>
    set((state) => ({
      focusHabitProgress: {
        ...state.focusHabitProgress,
        [name]: Math.min(1, state.focusHabitProgress[name] + 0.14),
      },
    })),
  checkInSoundscape: (id) =>
    set((state) => ({
      checkedInSoundscapeIds: state.checkedInSoundscapeIds.includes(id)
        ? state.checkedInSoundscapeIds
        : [...state.checkedInSoundscapeIds, id],
    })),
  playTrack: (track, timerLabel) =>
    set({
      isPlaying: true,
      playerTimerLabel: timerLabel ?? `${track.duration}后淡出`,
      track,
    }),
  resetFocusTimer: () =>
    set((state) => ({
      isFocusRunning: false,
      remainingFocusSeconds: getMode(state.focusModeId).seconds,
    })),
  selectCategory: (category) => set({ category }),
  setFocusMode: (modeId) =>
    set({
      focusModeId: modeId,
      isFocusRunning: false,
      remainingFocusSeconds: getMode(modeId).seconds,
    }),
  shuffleTrack: (category) => {
    const pool =
      category &&
      category !== "全部" &&
      category !== "我的收藏" &&
      category !== "推荐"
        ? SOUNDSCAPES.filter((item) => item.category === category)
        : SOUNDSCAPES;
    const currentId = get().track.id;
    const candidates = pool.filter((item) => item.id !== currentId);
    const nextPool = candidates.length > 0 ? candidates : pool;
    const next =
      nextPool[Math.floor(Math.random() * nextPool.length)] ?? defaultTrack;

    set({
      isPlaying: true,
      playerTimerLabel: `${next.duration}后淡出`,
      track: next,
    });
  },
  tickFocusTimer: () =>
    set((state) => {
      const mode = getMode(state.focusModeId);

      if (!state.isFocusRunning) {
        return state;
      }

      if (mode.id === "free") {
        return { remainingFocusSeconds: state.remainingFocusSeconds + 1 };
      }

      if (state.remainingFocusSeconds <= 1) {
        return {
          isFocusRunning: false,
          remainingFocusSeconds: 0,
        };
      }

      return { remainingFocusSeconds: state.remainingFocusSeconds - 1 };
    }),
  toggleFavorite: (id) =>
    set((state) => ({
      favoriteSoundscapeIds: state.favoriteSoundscapeIds.includes(id)
        ? state.favoriteSoundscapeIds.filter((item) => item !== id)
        : [...state.favoriteSoundscapeIds, id],
    })),
  toggleFocusRunning: () =>
    set((state) => ({
      isFocusRunning: !state.isFocusRunning,
    })),
  toggleHomeHabit: (name) =>
    set((state) => ({
      homeHabits: {
        ...state.homeHabits,
        [name]: !state.homeHabits[name],
      },
    })),
  togglePlayback: () => set((state) => ({ isPlaying: !state.isPlaying })),
  toggleSetting: (key) =>
    set((state) => ({
      settings: {
        ...state.settings,
        [key]: !state.settings[key],
      },
    })),
}));
