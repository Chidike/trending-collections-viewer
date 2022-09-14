import React, {useState, useEffect} from 'react';
import { useQuery} from "@apollo/client";
import { TRENDING_COLLECTIONS } from './queries';


export function App()  {

  const [walletAddress, setWalletAddress] = useState("");
  const [currentAccount, setCurrentAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [provider, setProvider] = useState(window.ethereum);
  const { data, loading, error } = useQuery(TRENDING_COLLECTIONS)
  
  useEffect(() => {
    setProvider(detectProvider());
  }, []);

  useEffect(() => {
    if (provider) {
      if (provider !== window.ethereum) {
        console.error(
          "No ethereum provider.  Do you have multiple wallets installed ?"
        );
      }
    }
  }, [provider]);

  useEffect(() => {
    const handleAccountsChanged = async (accounts) => {
      if (accounts.length === 0) {
        onLogout();
      } else if (accounts[0] !== currentAccount) {
        setCurrentAccount(accounts[0]);
      }
    };

    return () => {
      if (isConnected) {
        provider.removeListener("accountsChanged", handleAccountsChanged);
      }
    };
  }, [isConnected]);

  const onLogout = () => {
    setIsConnected(false);
    setCurrentAccount(null);
  };

  const detectProvider = () => {
    let provider;
    if (window.ethereum) {
      provider = window.ethereum;
    } else if (window.web3) {
      provider = window.web3.currentProvider;
    } 
    return provider;
  };
  
  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>

  
  async function requestAccount() {
    if(window.ethereum) { //wallet detected
      try{
        const accounts = await provider.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
        setIsConnected(true);
      } catch (error) {
        console.log('Error connecting...');
      }
    } else {
    }
  }
 
  function getStatus(connectionStatus) {
    if(connectionStatus === false){
      return "Not connected";
    }else {
      return "Connected";
    }
  }

  return (
  <div>
    <h1>Trending in the Past Hour</h1>
    <table className="table table-bordered">
      <thead>
        <tr>
            <th>Name</th>
            <th>Total Sales</th>
            <th>Average</th>
            <th>Ceiling</th>
            <th>Floor</th>
            <th>Volume</th>
            <th>Symbol</th>
        </tr>
      </thead>
    {data.trendingCollections.edges.map((edge) => (
      <tbody>
        <tr data-index={edge.node.address}>
          <td>{edge.node.name}</td>
          <td>{edge.node.stats.totalSales}</td>
          <td>{edge.node.stats.average.toFixed(3)}</td>
          <td>{edge.node.stats.ceiling.toFixed(3)}</td>
          <td>{edge.node.stats.floor.toFixed(3)}</td>
          <td>{edge.node.stats.volume.toFixed(3)}</td>
          <td>{edge.node.symbol}</td>
        </tr>
      </tbody>
    ))}

  </table>
  <footer>
    <button
    onClick={requestAccount}
    >Connect Wallet</button>
    <h3>Wallet Status : {getStatus(isConnected)}</h3>
  </footer>
</div>
    )
}