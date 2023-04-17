import { useEffect } from "react"
import { LocaleData, useUntypedTranslation } from "rede"
import { useStore } from "../../zustand/store"

export type SupportedLanguage = "en" | "de" // | "ua" | "ru" | "jp"

type Translation = {
  worldFlag: string
  rootPage: {
    title: string
    text: string
  }
}

export const localeData: LocaleData<SupportedLanguage, Translation> = {
  en: {
    worldFlag: "World Flag",
    rootPage: {
      title: "People are pigs",
      text: "I think that people are pigs",
    },
  },
  de: {
    worldFlag: "Weltflagge",
    rootPage: {
      title: "Menschen sind Schweine",
      text: "Ich denke, dass Menschen Schweine sind",
    },
  },
  // ua: {
  //   worldFlag: "Світовий Прапор",
  // },
  // ru: {
  //   worldFlag: "Флаг Мира",
  // },
  // jp: {
  //   worldFlag: "世界の旗",
  // },
}

export function getSavedLanguage(): SupportedLanguage {
  const language = localStorage.getItem("language") ?? "en"

  switch (language) {
    case "de": {
      return "de"
    }
  }

  return "en"
}

export function saveLanguage(lang: SupportedLanguage) {
  localStorage.setItem("language", lang)
}

export function useTranslation(): Translation {
  return useUntypedTranslation() as Translation
}
