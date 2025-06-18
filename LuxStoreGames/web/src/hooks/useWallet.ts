// web/src/hooks/useWallet.ts
import { useEffect, useState, useCallback } from "react";
import { ethers } from "ethers";

/**
 * useWallet - React hook para gerenciar conexão com carteira Web3.
 *
 * @returns {
 *   address: string | null;
 *   provider: ethers.BrowserProvider | null;
 *   connect: () => Promise<void>;
 * }
 */
export function useWallet() {
  const [address, setAddress] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);

  // Cria o provider e checa contas já conectadas
  useEffect(() => {
    if (!(window as any).ethereum) return;

    const p = new ethers.BrowserProvider((window as any).ethereum);
    setProvider(p);

    // Tenta ler contas já conectadas
    p.send("eth_accounts", [])
      .then((addrs: string[]) => {
        if (addrs.length > 0) {
          setAddress(addrs[0]);
        }
      })
      .catch(console.error);
  }, []);

  // Função para solicitar a conexão (prompt MetaMask)
  const connect = useCallback(async () => {
    if (!(window as any).ethereum) {
      alert("Metamask not found.Please install the extension.");
      return;
    }
    try {
      const p = new ethers.BrowserProvider((window as any).ethereum);
      setProvider(p);
      const [acct] = await p.send("eth_requestAccounts", []);
      setAddress(acct);
    } catch (err) {
      console.error("Error when connecting to the portfolio:", err);
    }
  }, []);

  return { address, provider, connect };
}
