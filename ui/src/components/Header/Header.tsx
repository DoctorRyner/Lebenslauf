import { ReactElement } from "react"
import { useTranslation } from "../../feature/localization/localization"
import { LanguageSwitch } from "../LanguageSwitch/LanguageSwitch"
import styles from "./Header.module.scss"

export function Header(): ReactElement {
  const t = useTranslation()

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <h1 className={styles.title}>CV</h1>
        <LanguageSwitch />
      </div>
    </header>
  )
}
