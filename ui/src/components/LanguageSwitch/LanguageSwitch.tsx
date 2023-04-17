import { ReactElement, useState } from "react"
import { DropdownPopup, DropdownPopupItem } from "uikit"
import germany from "../../assets/img/flag/germany.svg"
// import japan from "../../assets/img/flag/japan.svg"
// import russia from "../../assets/img/flag/russia.svg"
// import ukraine from "../../assets/img/flag/ukraine.svg"
import unitedKingdom from "../../assets/img/flag/united-kingdom.svg"
import {
  saveLanguage,
  SupportedLanguage,
  useTranslation,
} from "../../feature/localization/localization"
import { useStore } from "../../zustand/store"
import styles from "./LanguageSwitch.module.scss"

export function LanguageSwitch(): ReactElement {
  const [showPopup, setShowPopup] = useState(false)
  const appLanguage = useStore((store) => store.appLanguage)
  const setAppLanguage = useStore((store) => store.setAppLanguage)
  const langImg = languageToImg(appLanguage)
  const handleClick = () => {
    setShowPopup(!showPopup)
  }
  const handleLanguageClick = (item: DropdownPopupItem) => {
    const language = languageLabelToSupportedLanguage(item.text)

    setAppLanguage(language)
    saveLanguage(language)
    handleClick()
  }
  const t = useTranslation()

  return (
    <div className={styles.languageSwitch}>
      <img src={langImg} alt={t?.worldFlag} className={styles.icon} onClick={handleClick} />
      {showPopup && (
        <div className={styles.popup}>
          <DropdownPopup items={languageItems} onClick={handleLanguageClick} />
        </div>
      )}
    </div>
  )
}

const languageItems: DropdownPopupItem[] = [
  {
    text: "English",
    icon: unitedKingdom,
  },
  {
    text: "Deutsch",
    icon: germany,
  },
]

function languageLabelToSupportedLanguage(lang: string): SupportedLanguage {
  switch (lang) {
    case "Deutsch": {
      return "de"
    }
  }

  return "en"
}

function languageToImg(lang: SupportedLanguage): string {
  switch (lang) {
    case "en": {
      return unitedKingdom
    }
    case "de": {
      return germany
    }
    // case "ua": {
    //   return ukraine
    // }
    // case "ru": {
    //   return russia
    // }
    // case "jp": {
    //   return japan
    // }
  }
}
