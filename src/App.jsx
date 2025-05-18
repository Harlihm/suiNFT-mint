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
    try {
      const tx = new Transaction();
      const packageObjectId = "0xcb50450a10d138e883b6d44e91329a8e5289845993fcb022a6729aac08b74d7b";
      
      // Create a new coin with the exact amount needed
      const [coin] = tx.splitCoins(tx.gas, [tx.pure.u64(100000)]);
      
      // Create the move call with proper type arguments
      tx.moveCall({
        target: `${packageObjectId}::nft::mint`,
        typeArguments: ['0x2::sui::SUI'],
        arguments: [
          tx.object(coin)
        ]
      });

      // Set a fixed gas budget
      const gasBudget = 10000000;

      // First request approval
      const approval = await wallet.signTransaction({
        transaction: tx,
        options: {
          showEffects: true,
          showEvents: true,
          gasBudget
        }
      });

      if (approval) {
        // If approved, execute the transaction
        const result = await wallet.executeTransaction({
          transaction: tx,
          options: {
            showEffects: true,
            showEvents: true,
            gasBudget
          }
        });
        console.log('Transaction result:', result);
      }
    } catch (error) {
      console.error('Transaction error:', error);
    }
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
