import { CSSProperties, PropsWithChildren, ReactElement } from "react"
import styles from "./Popup.module.scss"

type Props = PropsWithChildren<{
  minWidth?: string
  minHeight?: string
}>

export function Popup(props: Props): ReactElement {
  const style: PopupCSSProperties = {
    "--min-width": props?.minWidth,
    "--min-height": props?.minHeight
  }

  return (
    <div style={style} className={styles.popup}>
      {props.children}
    </div>
  )
}

interface PopupCSSProperties extends CSSProperties {
  "--min-width"?: string
  "--min-height"?: string
}
