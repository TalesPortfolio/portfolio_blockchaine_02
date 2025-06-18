// web/src/app/category/itch/page.tsx
"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import GameCard from "../../../components/GameCard";
import { useWallet } from "../../../hooks/useWallet";
import {
  Section,
  H2,
  DivCard,
  ConnectButton,
  Instructions,
} from "../../../styles/ItchStyles";

interface ItchGame {
  id: number;
  slug: string;
  title: string;
  price: number;
  image: string;
  url: string;
}

export default function Itch() {
  const { address, connect } = useWallet();
  const router = useRouter();
  const [games, setGames] = useState<ItchGame[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/itch")
      .then((res) => res.json())
      .then((list: ItchGame[]) => setGames(list))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleStartQuiz = useCallback(() => {
    if (!address) {
      // abre a página de instalação do MetaMask
      window.open("https://metamask.io/download.html", "_blank");
    } else {
      // redireciona para a rota do quiz
      router.push("/category/earn");
    }
  }, [address, router]);

  return (
    <Section>
      <H2>Free Games</H2>

      {!address && (
        <Instructions>
          <p>
            To participate and earn <strong>GAM</strong> tokens, please install
            or connect your MetaMask wallet.
          </p>
          <ConnectButton onClick={handleStartQuiz}>
            Install / Connect MetaMask
          </ConnectButton>
        </Instructions>
      )}

      {address && (
        <Instructions>
          <p>
            Welcome, {address.slice(0, 6)}…{address.slice(-4)}!
          </p>
          <p>
            <strong>How to earn GAM tokens:</strong>
          </p>
          <ol>
            <li>Complete the quiz to earn 2 GAM per correct answer.</li>
            <li>Use your earned tokens to purchase free games below.</li>
            <li>
              To add the GAM token to MetaMask:
              <ul>
                <li>Open MetaMask → Assets → Import Tokens</li>
                <li>
                  Paste token address:{" "}
                  <code>0x188599e4a85cf6e107dd23f199c5647229a1242a</code>
                </li>
                <li>Click “Import”</li>
              </ul>
            </li>
          </ol>
          <ConnectButton onClick={handleStartQuiz}>
            Go to Quiz
          </ConnectButton>
        </Instructions>
      )}

      <H2 style={{ marginTop: "3rem" }}>Itch.io Free Games</H2>
      {loading ? (
        <p>Loading games…</p>
      ) : (
        <DivCard>
          {games.map((g) => (
            <GameCard
              key={g.id}
              game={{
                id: g.id,
                slug: g.slug,
                title: g.title,
                price: g.price,
                image: g.image,
                url: g.url,
              }}
            />
          ))}
        </DivCard>
      )}
    </Section>
);
}
