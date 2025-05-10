// import { useState } from 'react'
import './App.css'
import {ConnectButton} from '@suiet/wallet-kit';
import {useWallet} from '@suiet/wallet-kit';
import {Transaction} from "@mysten/sui/transactions";
import { useEffect } from 'react';

// cargo install --locked --git https://github.com/MystenLabs/sui.git --branch devnet sui

// cd contracts/suimint
// sui move build

//sui client publish --gas-budget tur

function App() {

  const wallet = useWallet()

  useEffect(() => {
    if (!wallet.connected) return;
    console.log('connected wallet name: ', wallet.name)
    console.log('account address: ', wallet.account?.address)
    console.log('account publicKey: ', wallet.account?.publicKey)
  }, [wallet.connected, wallet.name, wallet.account?.address, wallet.account?.publicKey])

  async function handleMoveCall() {
    const tx = new Transaction();
    // This will be replaced with your deployed package ID
    const packageObjectId = "0x775edf434cd67e88b77ef86739d57e702a3c7576688e4276c67b62ba319393bc";
    tx.moveCall({
      target: `${packageObjectId}::nft::mint`,
      arguments: [
        tx.pure.u64(100000) // 0.0001 SUI in MIST
      ],
    });
    await wallet.signAndExecuteTransaction({
      transaction: tx,
    });
  }

  async function handleSignMessage() {
    await wallet.signPersonalMessage({
      message: new TextEncoder().encode("Hello World"),
    });
  }

  return (
    <>
     <header>
        <ConnectButton/>
        <button onClick={handleMoveCall}>Mint NFT</button>
        <button onClick={handleSignMessage}>Sign Message</button>
      </header>
    </>
  )
}

export default App
