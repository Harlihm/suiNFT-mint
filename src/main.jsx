import {WalletProvider} from '@suiet/wallet-kit';
import '@suiet/wallet-kit/style.css';

// take react@18 project as an example
ReactDOM.createRoot(document.getElementById('root')).render(
  <WalletProvider>
    <App/>
  </WalletProvider>
);