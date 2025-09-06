import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("Plusetalk-theme") || "forest",
  setTheme: (theme) => {
    localStorage.setItem("Plusetalk-theme", theme);
    set({ theme });
  },
}));