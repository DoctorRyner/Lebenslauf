import { ReactElement } from "react"
import { Impossible } from "../../../../packages/uikit/src/main"
import { useStorybookContext } from "../../feature/storybook/storybook"
import styles from "./StorybookContent.module.scss"

export function StorybookContent(): ReactElement {
  const { currentTemplate } = useStorybookContext()
  const View = currentTemplate?.View ?? Impossible

  return (
    <div className={styles.content}>
      <div className={styles.innerContent}>
        <View />
      </div>
    </div>
  )
}
