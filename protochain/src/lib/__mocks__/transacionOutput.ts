import Validation from "../validation";

/**
 * MockedTransaction Output class
 */
export default class TransactionOutput {
  toAddress: string;
  amount: number;
  tx?: string;

  constructor(txOutput?: TransactionOutput) {
    this.toAddress = txOutput?.toAddress || "abc";
    this.amount = txOutput?.amount || 10;
    this.tx = txOutput?.tx || "xyz";
  }

  isValid(): Validation {
    if (this.amount < 1) return new Validation(false, "Negative amount");
    return new Validation(); // que internamente defina success como true
  }

  getHash(): string {
    return "abc";
  }
}
