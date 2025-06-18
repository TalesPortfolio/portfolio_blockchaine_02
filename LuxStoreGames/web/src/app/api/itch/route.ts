// src/app/api/itch/route.ts
import { NextResponse } from "next/server";
import { JSDOM } from "jsdom";

export const runtime = "nodejs";

export async function GET() {
  // Tipo com id numérico e slug
  type ScrapedGame = {
    id: number;
    slug: string;
    title: string;
    price: number;
    image: string;
    url: string;
  };

  const allGames: ScrapedGame[] = [];
  let counter = 0;

  // Varre até 15 páginas (ou até não encontrar mais .game_cell)
  for (let page = 1; page <= 15; page++) {
    const res = await fetch(`https://itch.io/games/free?page=${page}`);
    if (!res.ok) break;

    const html = await res.text();
    const doc = new JSDOM(html).window.document;
    const gameEls = doc.querySelectorAll(".game_cell");
    if (gameEls.length === 0) break;

    gameEls.forEach((el) => {
      counter += 1;
      const title =
        el.querySelector(".game_title")?.textContent?.trim() ||
        `Jogo ${counter}`;

      // Captura o href completo da âncora, preservando subdomínio original
      const href = el.querySelector("a")?.getAttribute("href") || "";
      let fullUrl: string;
      try {
        // Se for um caminho relativo, resolve contra itch.io
        fullUrl = new URL(href, "https://itch.io").href;
      } catch {
        // Caso href já seja URL absoluta ou inválida, use como está
        fullUrl = href;
      }

      // Extrai o slug apenas para identificação interna, se necessário
      let slug = "";
      try {
        slug = new URL(href, "https://itch.io").pathname.replace(/^\/+/, "");
      } catch {
        slug = href;
      }

      const imageEl = el.querySelector("img");
      const image =
        imageEl?.getAttribute("data-lazy_src") ||
        imageEl?.getAttribute("src") ||
        "";

      allGames.push({
        id: counter,   // ID numérico sequencial
        slug,          // para gerar rotas ou exibir na UI
        title,
        price: 5,
        image,
        url: fullUrl,  // usa a URL completa do itch.io
      });
    });
  }

  return NextResponse.json(allGames);
}
