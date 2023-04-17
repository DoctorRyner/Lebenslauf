import { ReactElement, useEffect, useState } from "react"
import { BrowserRouter } from "react-router-dom"
import { useDarkMode } from "../../packages/uikit/src/theme"
import styles from "./App.module.scss"
import { useQueryParams } from "./app/queryParams"
import { Sidebar } from "./components/Sidebar/Sidebar"
import { StorybookContent } from "./components/StorybookContent/StorybookContent"
import {
  storybook,
  StorybookContext,
  Template,
  useStorybookContext,
} from "./feature/storybook/storybook"

export function App(): ReactElement {
  const [currentTemplate, setCurrentTemplate] = useState<Template>()
  const [currentComponentName, setCurrentComponentName] = useState<string>()
  const [openedSidebarItems, setOpenedSidebarItems] = useState<string[]>([])

  return (
    <BrowserRouter>
      <StorybookContext.Provider
        value={{
          currentTemplate,
          setCurrentTemplate,
          currentComponentName,
          setCurrentComponentName,
          openedSidebarItems,
          setOpenedSidebarItems,
        }}
      >
        <RoutedApp />
      </StorybookContext.Provider>
    </BrowserRouter>
  )
}

function RoutedApp(): ReactElement {
  usePageInitOpenComponentByQueryParams()
  useDarkMode()

  return (
    <div className={styles.storybook}>
      <Sidebar />
      <StorybookContent />
    </div>
  )
}

function usePageInitOpenComponentByQueryParams() {
  const { setCurrentComponentName, setCurrentTemplate, setOpenedSidebarItems } =
    useStorybookContext()
  const { queryParams } = useQueryParams()

  useEffect(() => {
    if (queryParams.component && queryParams.template) {
      const component = storybook.find((component) => component.name === queryParams.component)

      if (!component) return

      const template = [
        ...(component.extraTemplates ?? []),
        { name: "Default", View: component.DefaultTemplateView },
      ].find((template) => template.name === queryParams.template)

      if (!template) return

      setCurrentComponentName?.(queryParams.component)
      setCurrentTemplate?.(template)
      setOpenedSidebarItems?.([queryParams.component])
    }
  }, [])
}
