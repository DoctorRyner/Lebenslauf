import { create } from "zustand"
import { getSavedLanguage, SupportedLanguage } from "../feature/localization/localization"

export type Store = {
  appLanguage: SupportedLanguage
  setAppLanguage: (appLanguage: SupportedLanguage) => void
}

export const useStore = create<Store>()((set) => ({
  appLanguage: getSavedLanguage(),
  setAppLanguage(appLanguage) {
    set((store) => ({ ...store, appLanguage }))
  },
}))
