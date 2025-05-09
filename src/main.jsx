import {WalletProvider} from '@suiet/wallet-kit';
import '@suiet/wallet-kit/style.css';
import ReactDOM from 'react-dom/client';
import App from "./App"

// take react@18 project as an example
ReactDOM.createRoot(document.getElementById('root')).render(
  <WalletProvider>
    <App/>
  </WalletProvider>
);