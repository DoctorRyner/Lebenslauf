import { PropsWithChildren, ReactElement } from "react"
import { cn } from "../helpers"
import styles from "./Collapse.module.scss"

type Props = PropsWithChildren<{
  title: ReactElement
  className?: string
  isOpened?: boolean
}>

export function Collapse(props: Props): ReactElement {
  const collapseBodyClassName = cn(styles.collapseBody, {
    [styles.shrinked]: !props.isOpened,
  })

  return (
    <div className={props.className}>
      {props.title}
      <div className={collapseBodyClassName}>{props.children}</div>
    </div>
  )
}
