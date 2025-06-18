// web/src/styles/styled.d.ts
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    name: string;
    colors: {
      primary: string;
      primaryDark: string;
      secondary: string;
      accent: string;
      background: string;
      surface: string;
      text: string;
      textLight: string;
      shadow: string;
      shadowHover: string;
    };
    borderRadius: string;
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
    };
  }
}
