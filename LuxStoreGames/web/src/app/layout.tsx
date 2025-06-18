// src/app/layout.tsx
import React from "react";
import Providers from "../components/Providers";
import Header from "../components/Header";

export const metadata = {
  title: "Lux Store Games",
  description: "Dapp à vendre de jeux avec gam token",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <Providers>
          <Header />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
