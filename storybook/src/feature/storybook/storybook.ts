import { createContext, ReactElement, useContext } from "react"
import { componentDropdownPopup } from "../../stories/DropdownPopup"
import { componentPopup } from "../../stories/Popup"
import { componentSearchBox } from "../../stories/SearchBox"
import { componentToggle } from "../../stories/Toggle"

export type StorybookComponent = {
  name: string
  DefaultTemplateView: () => ReactElement
  extraTemplates?: Template[]
}

export type Template = {
  name: string
  View: () => ReactElement
}

export type Storybook = StorybookComponent[]

export const storybook: Storybook = [
  componentDropdownPopup,
  componentPopup,
  componentToggle,
  componentSearchBox,
]

type StorybookContextType = {
  currentComponentName?: string
  setCurrentComponentName?: (name: string | undefined) => void
  currentTemplate?: Template
  setCurrentTemplate?: (template: Template) => void
  openedSidebarItems: string[]
  setOpenedSidebarItems?: (sidebarItems: string[]) => void
}

export const StorybookContext = createContext<StorybookContextType>({ openedSidebarItems: [] })

export function useStorybookContext(): StorybookContextType {
  return useContext(StorybookContext)
}

export function useFilteredStorybook(filter: string): Storybook {
  filter = filter.toLowerCase()

  return storybook.filter((component) => {
    if (component.name?.toLowerCase().includes(filter)) {
      return true
    }

    const extraTemplateNames = component.extraTemplates?.map((template) => template.name?.toLowerCase()) ?? []
    const templateNames = ["Default", ...extraTemplateNames]

    return templateNames.find((name) => name.includes(filter))
  })
}
