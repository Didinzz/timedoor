import { GooeyToaster as GooeyToasterPrimitive, gooeyToast } from "goey-toast"
import "goey-toast/styles.css"

export { gooeyToast }

function GooeyToaster(props) {
  return <GooeyToasterPrimitive position="bottom-right" {...props} />
}

export { GooeyToaster }
