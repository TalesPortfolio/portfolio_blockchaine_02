// src/styles/theme.ts
export const lightTheme = {
  name: "light",
  colors: {
    primary:    "#28a745",     // verde vibrante
    primaryDark:"#218838",
    secondary:  "#f5f5f5",     // off-white (background leve)
    accent:     "#28a745",
    background: "#ffffff",     // branco puro para contêiner principal
    surface:    "#ffffff",     // branco para cards
    text:       "#222222",     // cinza bem escuro para título e corpo
    textLight:  "#555555",     // cinza médio para subtítulos
    shadow:         "rgba(0,0,0,0.1)",
    shadowHover:    "rgba(0,0,0,0.15)",
  },
  borderRadius: "8px",
    spacing: {
    xs: "0.5rem",
    sm: "1rem",
    md: "1.5rem",
    lg: "2rem",
  },
};

export const darkTheme = {
  name: "dark",
  colors: {
    primary:     "#28a745",
    primaryDark: "#218838",
    secondary:   "#2f855a",
    accent:      "#22543d",
    background:  "#121212",
    surface:     "#1e1e1e",
    text:        "#e0e0e0",
    textLight:   "#e0e0e0",
    shadow:      "rgba(0,0,0,0.6)",    // ← adiciona aqui
    shadowHover: "rgba(0,0,0,0.8)",    // ← e aqui
  },
  borderRadius: "8px",
  spacing: {
    xs: "0.5rem",
    sm: "1rem",
    md: "1.5rem",
    lg: "2rem",
  },
};
