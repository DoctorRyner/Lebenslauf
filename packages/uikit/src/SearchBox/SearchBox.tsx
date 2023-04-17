import { ReactElement } from "react"
import styles from "./SearchBox.module.scss"
import search from "../assets/img/search.svg"

type Props = {
  value?: string
  placeholder?: string
  onChange?: (value: string) => void
}

export function SearchBox(props: Props): ReactElement {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    props.onChange?.(e.target.value)
  }

  return (
    <div className={styles.container}>
      <input
        type="search"
        value={props.value}
        placeholder={props.placeholder}
        onChange={handleChange}
        className={styles.searchBox}
      />
      <img src={search} alt="Search Icon" className={styles.magnifyingGlassIcon} />
    </div>
  )
}
