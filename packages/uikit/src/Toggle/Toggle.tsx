import { ReactElement } from "react"
import { cn } from "../helpers"
import styles from "./Toggle.module.scss"

type Props = {
  value?: boolean
  onClick?: () => void
}

export function Toggle(props: Props): ReactElement {
  const className = cn(styles.toggle, {
    [styles.toggled]: props.value,
  })

  return (
    <div onClick={props.onClick} className={className}>
      <div className={styles.handle}></div>
    </div>
  )
}
