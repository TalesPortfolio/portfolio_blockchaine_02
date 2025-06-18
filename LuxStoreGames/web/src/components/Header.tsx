"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useWallet } from "../hooks/useWallet";
import { getTokenContract } from "../lib/contracts";
import { useTheme } from "./Providers";

// importar estilos
import {
  Bar,
  Title,
  Nav,
  NavLink,
  WalletControls,
  Button,
  Address,
  Balance,
  ToggleButton,
} from "@/styles/HeaderStyles";

export default function Header() {
  const { address, provider } = useWallet();
  const { isDark, toggleTheme } = useTheme();
  const [balance, setBalance] = useState("0");

  const fetchBalance = useCallback(async () => {
    if (!provider || !address) {
      setBalance("0");
      return;
    }
    try {
      const signer = await provider.getSigner();
      const token = getTokenContract(signer);
      const raw = await token.balanceOf(address);
      setBalance((parseFloat(raw.toString()) / 1e18).toFixed(2));
    } catch (err) {
      console.error("Error reading balance Tokens:", err);
    }
  }, [provider, address]);

  const connect = useCallback(async () => {
    if (!provider) return;
    await provider.send("eth_requestAccounts", []);
  }, [provider]);

  useEffect(() => {
    // fetch inicial
    fetchBalance();

    // escuta evento disparado após compra
    window.addEventListener("balanceChanged", fetchBalance);

    return () => {
      window.removeEventListener("balanceChanged", fetchBalance);
    };
  }, [fetchBalance]);

  return (
    <Bar>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Title>Lux Store Games</Title>
        <ToggleButton onClick={toggleTheme} aria-label="Toggle theme">
          {isDark ? "🌞" : "🌙"}
        </ToggleButton>
      </div>

      <Nav>
        <NavLink href="/">HOME</NavLink>
        <NavLink href="/category/itch">GAMES</NavLink>
        <NavLink href="/category/earn">QUIZ</NavLink>
        <NavLink href="/about">ABOUT</NavLink>
        {/* outras rotas */}
      </Nav>

      <WalletControls>
        {address ? (
          <>
            <Balance>{balance} TOKENS</Balance>
            <Address>
              {address.slice(0, 6)}…{address.slice(-4)}
            </Address>
          </>
        ) : (
          <Button onClick={connect}>Connect Wallet</Button>
        )}
      </WalletControls>
    </Bar>
  );
}
