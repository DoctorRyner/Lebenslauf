import { ReactElement } from "react"
import styles from "./DropdownPopup.module.scss"
import sharedStyles from "../shared.module.scss"
import { Popup } from "../Popup/Popup"
import { cn } from "../helpers"

type Props = {
  minWidth?: string
  items: DropdownPopupItem[]
  onClick?: (item: DropdownPopupItem) => void
}

export function DropdownPopup(props: Props): ReactElement {
  return (
    <Popup minWidth={props.minWidth}>
      {props.items.map((item) => (
        <DropdownPopupItem item={item} onClick={props.onClick} key={item.text} />
      ))}
    </Popup>
  )
}

export type DropdownPopupItem = {
  text: string
  icon?: string
}

type DropdownPopupItemProps = {
  item: DropdownPopupItem
  onClick?: (item: DropdownPopupItem) => void
}

function DropdownPopupItem(props: DropdownPopupItemProps): ReactElement {
  const className = cn(styles.dropdownPopupItem, {
    [sharedStyles.clickable]: props.onClick,
  })
  const handleClick = () => {
    props.onClick?.(props.item)
  }

  return (
    <div className={className} key={props.item.text} onClick={handleClick}>
      {props.item.icon && <img src={props.item.icon} className={styles.dropdownPopupIcon} />}
      <span className={styles.dropdownPopupText}>{props.item.text}</span>
    </div>
  )
}
