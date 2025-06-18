// src/components/Providers.tsx
"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { lightTheme, darkTheme } from "../styles/theme";

interface ThemeContextType {
  toggleTheme: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  toggleTheme: () => {},
  isDark: false,
});

export const useTheme = () => useContext(ThemeContext);

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background: ${({ theme }) => theme.colors.background};
    color:      ${({ theme }) => theme.colors.text};
    transition: background .3s, color .3s;
  }
  a {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export default function Providers({ children }: { children: ReactNode }) {
  // inicia já em dark
  const [isDark, setIsDark] = useState(true);
  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ toggleTheme, isDark }}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
