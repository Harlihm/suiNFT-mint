// import { useState } from 'react'
import './App.css'
import {ConnectButton} from '@suiet/wallet-kit';
import {useWallet} from '@suiet/wallet-kit';
import {Transaction} from "@mysten/sui/transactions";

function App() {

  return (
    <>
     <header>
        <ConnectButton/>
      </header>
    </>
  )
}

export default App
