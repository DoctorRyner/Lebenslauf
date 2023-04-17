import { range } from "lodash"
import { ReactElement } from "react"
import { Header } from "../../components/Header/Header"
import { useTranslation } from "../../feature/localization/localization"
import styles from "./Root.module.scss"

export function Root(): ReactElement {
  const t = useTranslation()

  return (
    <div className={styles.root}>
      <Header />
      <main className={styles.content}>
        <h1>{t?.rootPage?.title}</h1>
        {range(50).map((x) => (
          <p key={x}>
            {t?.rootPage?.text} {x}
          </p>
        ))}
      </main>
    </div>
  )
}
