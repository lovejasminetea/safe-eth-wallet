import { ethers } from "ethers";

export default function createWallet() {
  if (window.isSecureContext) {
    const wallet = ethers.Wallet.createRandom();
    return {
      address: wallet.address,
      mnemonic: wallet.mnemonic.phrase,
    };
  }
}
