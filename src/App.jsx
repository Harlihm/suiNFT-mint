import './App.css';
import { ConnectButton } from '@suiet/wallet-kit';
import { useWallet } from '@suiet/wallet-kit';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { useEffect } from 'react';

function App() {
  const wallet = useWallet();

  useEffect(() => {
    if (!wallet.connected) return;
    console.log('Connected wallet name:', wallet.name);
    console.log('Account address:', wallet.account?.address);
    console.log('Account publicKey:', wallet.account?.publicKey);
  }, [wallet.connected, wallet.name, wallet.account?.address, wallet.account?.publicKey]);

  async function handleMoveCall() {
    try {
      const tx = new TransactionBlock();
      const packageObjectId = "0xcb50450a10d138e883b6d44e91329a8e5289845993fcb022a6729aac08b74d7b";

      // Split 100_000 micro-SUI from the gas coin to use as payment
      const [payment] = tx.splitCoins(tx.gas, [tx.pure.u64(100000)]);

      // Call the mint function
      tx.moveCall({
        target: `${packageObjectId}::nft::mint`,
        arguments: [payment],
      });

      // Execute transaction
      const result = await wallet.signAndExecuteTransactionBlock({
        transactionBlock: tx,
        options: {
          showEffects: true,
          showEvents: true,
        },
      });

      console.log('Transaction result:', result);
    } catch (error) {
      console.error('Transaction error:', error);
    }
  }

  async function handleSignMessage() {
    try {
      const result = await wallet.signPersonalMessage({
        message: new TextEncoder().encode("Hello World"),
      });
      console.log('Signed message:', result);
    } catch (error) {
      console.error('Sign message error:', error);
    }
  }

  return (
    <>
      <header>
        <ConnectButton />
        <button onClick={handleMoveCall}>Mint NFT</button>
        <button onClick={handleSignMessage}>Sign Message</button>
      </header>
    </>
  );
}

export default App;
