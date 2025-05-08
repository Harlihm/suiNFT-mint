import { useState } from 'react'
import './App.css'
import {ConnectButton} from '@suiet/wallet-kit';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <header>
        <ConnectButton/>
      </header>
    </>
  )
}

export default App
