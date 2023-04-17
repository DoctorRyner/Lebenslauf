import { ReactElement } from "react"
import { TranslationProvider } from "rede"
import { useDarkMode } from "uikit"
import { localeData } from "./feature/localization/localization"
import { Root } from "./pages/Root/Root"
import { useStore } from "./zustand/store"

export function App(): ReactElement {
  const appLanguage = useStore((store) => store.appLanguage)

  useDarkMode()

  return (
    <TranslationProvider currentLocale={appLanguage} data={localeData}>
      <Root />
    </TranslationProvider>
  )
}
