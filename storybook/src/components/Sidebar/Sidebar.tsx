import { ReactElement, useState } from "react"
import menuIcon from "uikit/assets/img/menu.svg"
import { cn } from "../../../../packages/uikit/src/helpers"
import { Collapse, runTransition, Toggle, useDarkMode } from "../../../../packages/uikit/src/main"
import { SearchBox } from "../../../../packages/uikit/src/SearchBox/SearchBox"
import { useQueryParams } from "../../app/queryParams"
import { removeItem } from "../../app/utils"
import {
  storybook,
  StorybookComponent,
  Template,
  useFilteredStorybook,
  useStorybookContext,
} from "../../feature/storybook/storybook"
import styles from "./Sidebar.module.scss"

export function Sidebar(): ReactElement {
  const { isDarkModeOn, setIsDarkModeOn } = useDarkMode()
  const switchDarkMode = () => {
    setIsDarkModeOn(!isDarkModeOn)
    runTransition()
  }
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const switchSidebarState = () => setIsMobileSidebarOpen(!isMobileSidebarOpen)
  const className = cn(styles.sidebar, {
    [styles.sidebarClosed]: !isMobileSidebarOpen,
  })
  const [input, setInput] = useState("")
  const filteredStorybook = useFilteredStorybook(input)

  return (
    <>
      <img src={menuIcon} onClick={switchSidebarState} className={styles.menuIcon}></img>
      <aside className={className}>
        <h1 className={styles.title}>Storybook</h1>
        <div className={styles.darkModeToggleWrapper}>
          <span className={styles.darkModeLabel}>Dark Mode</span>
          <div className={styles.darkModeToggle}>
            <Toggle value={isDarkModeOn} onClick={switchDarkMode} />
          </div>
        </div>
        <div className={styles.searchBoxWrapper}>
          <SearchBox value={input} onChange={setInput} placeholder="Search" />
        </div>
        <div className={styles.items}>
          {filteredStorybook.map((cmp) => (
            <SidebarItem {...cmp} key={cmp.name} />
          ))}
        </div>
      </aside>
      <Veil isShown={isMobileSidebarOpen} onClick={switchSidebarState} />
    </>
  )
}

type VeilProps = {
  isShown?: boolean
  onClick?: () => void
}

function Veil(props: VeilProps): ReactElement {
  const className = cn(styles.veil, {
    [styles.veilClosed]: !props.isShown,
  })

  return <div className={className} onClick={props.onClick}></div>
}

function SidebarItem(props: StorybookComponent): ReactElement {
  const defaultTemplate: Template = {
    name: "Default",
    View: props.DefaultTemplateView,
  }
  const { openedSidebarItems, setOpenedSidebarItems } = useStorybookContext()
  const isSidebarItemOpened = openedSidebarItems.includes(props.name)
  const openCloseSidebarItem = () => {
    if (isSidebarItemOpened) {
      setOpenedSidebarItems?.(removeItem(props.name, openedSidebarItems))
    } else {
      setOpenedSidebarItems?.([...openedSidebarItems, props.name])
    }
  }
  const sidebarItemIconClassName = isSidebarItemOpened ? styles.upArrow : styles.downArrow
  const title = (
    <div className={styles.sidebarItemTitle}>
      <h3 onClick={openCloseSidebarItem} className={styles.itemTitle}>
        {props.name}
      </h3>
      <i className={sidebarItemIconClassName}></i>
    </div>
  )

  return (
    <Collapse title={title} isOpened={isSidebarItemOpened}>
      <div className={styles.templateViewTitles}>
        <SidebarTemplateButton componentName={props.name} template={defaultTemplate} />
        {props.extraTemplates?.map((template) => (
          <SidebarTemplateButton
            componentName={props.name}
            template={template}
            key={props.name + "/" + template.name}
          />
        ))}
      </div>
    </Collapse>
  )
}

type SidebarTemplateButtonProps = {
  componentName: string
  template: Template
}

function SidebarTemplateButton(props: SidebarTemplateButtonProps): ReactElement {
  const { setCurrentComponentName, setCurrentTemplate } = useStorybookContext()
  const { setQueryParams } = useQueryParams()
  const openTemplate = () => {
    setCurrentComponentName?.(props.componentName)
    setCurrentTemplate?.(props.template)
    setQueryParams({
      component: props.componentName,
      template: props.template.name,
    })
  }
  const { currentTemplate, currentComponentName } = useStorybookContext()
  const isSelected =
    currentTemplate?.name === props.template.name && props.componentName === currentComponentName
  const className = cn(styles.templateViewTitle, {
    [styles.selectedTemplateViewTitle]: isSelected,
  })

  return (
    <h4 onClick={openTemplate} className={className}>
      {props.template.name}
    </h4>
  )
}
