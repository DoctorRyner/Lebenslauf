import { StorybookComponent, Template } from "../feature/storybook/storybook"
import { useState } from "react"
import { Toggle } from "../../../packages/uikit/src/main"

const toggled: Template = {
  name: "Toggled",
  View() {
    return <Toggle value />
  },
}

const interactive: Template = {
  name: "Interactive",
  View() {
    const [value, setValue] = useState(false)
    const switchToggle = () => setValue(!value)

    return <Toggle value={value} onClick={switchToggle} />
  },
}

export const componentToggle: StorybookComponent = {
  name: "Toggle",
  DefaultTemplateView() {
    return <Toggle />
  },
  extraTemplates: [toggled, interactive],
}
