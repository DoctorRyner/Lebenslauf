import { useState } from "react"
import { SearchBox } from "../../../packages/uikit/src/SearchBox/SearchBox"
import { StorybookComponent } from "../feature/storybook/storybook"

export const componentSearchBox: StorybookComponent = {
  name: "SearchBox",
  DefaultTemplateView() {
    const [value, setValue] = useState("")

    return <SearchBox value={value} placeholder="Search" onChange={setValue} />
  },
}
