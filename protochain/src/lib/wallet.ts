import * as ecc from "tiny-secp256k1";
import ECPairFactory, { ECPairInterface } from "ecpair";

const ECPair = ECPairFactory(ecc);

/**
 * Wallet class
 */
export default class Wallet {
  privateKey: string;
  publicKey: string;

  constructor(wifOrPrivateKey?: string) {
    let keys: ECPairInterface;

    if (wifOrPrivateKey) {
      if (wifOrPrivateKey.length === 64) {
        // Chave privada em hexadecimal
        keys = ECPair.fromPrivateKey(Buffer.from(wifOrPrivateKey, "hex"));
      } else {
        // WIF (Wallet Import Format)
        keys = ECPair.fromWIF(wifOrPrivateKey);
      }
    } else {
      // Gerar uma nova chave aleatória
      keys = ECPair.makeRandom();
    }

    /* c8 ignore next */
    this.privateKey = keys.privateKey? Buffer.from(keys.privateKey).toString("hex") : "";
    this.publicKey = Buffer.from(keys.publicKey).toString("hex");
  }
}
