import { createContext, ReactElement, useContext, useState } from "react"

export type LocaleData<SuppportedLanguage extends string, Translation> = {
  [keys in SuppportedLanguage]: Translation
}

type LocaleDataContextType<SuppportedLanguage extends string = string, Translation = object> = {
  locale: string
  data: LocaleData<SuppportedLanguage, Translation>
}

type TranslationsProviderProps<SuppportedLanguage extends string, Translation> = {
  currentLocale: string
  data: LocaleData<SuppportedLanguage, Translation>
  children?: ReactElement
}

export const LocaleDataContext = createContext<LocaleDataContextType>({
  locale: "en",
  data: {},
})

export function TranslationProvider<SuppportedLanguage extends string, Translation>(
  props: TranslationsProviderProps<SuppportedLanguage, Translation>
): ReactElement {
  return (
    <LocaleDataContext.Provider
      value={{
        locale: props.currentLocale,
        data: props.data as LocaleData<SuppportedLanguage, object>,
      }}
    >
      {props.children}
    </LocaleDataContext.Provider>
  )
}

export function useLocale() {
  const { locale } = useContext<LocaleDataContextType>(LocaleDataContext)

  return locale
}

export function useUntypedTranslation(): object | undefined {
  const { locale, data } = useContext<LocaleDataContextType>(LocaleDataContext)

  return data?.[locale]
}
