// global.d.ts
import "styled-components";
import { lightTheme } from "./src/styles/theme";

declare module "styled-components" {
  // Tie o DefaultTheme ao formato exato do seu lightTheme
  export interface DefaultTheme extends typeof lightTheme {}
}
