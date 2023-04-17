import { Popup } from "../../../packages/uikit/src/main"
import { StorybookComponent } from "../feature/storybook/storybook"

export const componentPopup: StorybookComponent = {
  name: "Popup",
  DefaultTemplateView() {
    return <Popup minHeight="200px" minWidth="250px" />
  },
}
