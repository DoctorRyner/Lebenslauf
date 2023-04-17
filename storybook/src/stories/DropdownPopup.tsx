import { DropdownPopup, DropdownPopupItem } from "../../../packages/uikit/src/main"
import { StorybookComponent, Template } from "../feature/storybook/storybook"

const defaultItems: DropdownPopupItem[] = textify(["Emilia", "Lina", "Julia", "Lea"])

const weaponsTemplate: Template = toTextTemplate("Weapons", [
  "Sword",
  "Rifle",
  "Claws",
  "Katana",
  "BFG",
  "Chainsaw",
])

const animalsTemplate: Template = toTextTemplate("Animals", ["Fox", "Wolf", "Dog", "Cat", "Lion"])

function toTextTemplate(name: string, items: string[]): Template {
  return {
    name,
    View() {
      return <DropdownPopup items={textify(items)} minWidth="200px" />
    },
  }
}

function textify(items: string[]) {
  return items.map((text) => ({ text, icon: "https://flagicons.lipis.dev/flags/4x3/lt.svg" }))
}

export const componentDropdownPopup: StorybookComponent = {
  name: "DropdownPopup",
  DefaultTemplateView() {
    return <DropdownPopup items={defaultItems} minWidth="200px" />
  },
  extraTemplates: [weaponsTemplate, animalsTemplate],
}
