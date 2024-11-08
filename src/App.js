import { useState, useEffect } from 'react';
import {ethers} from 'ethers';
import {contractAddress, contractAbi} from './constant/constant'
import Login from './components/Login';
import Connected from './components/Connected';
import ContractInstance from './components/contractInstance';
import './App.css';

function App() {
  const [provider, setProvider] = useState(null)
  const [account, setAccount] = useState(null)
  const [isConnected, setIsConnected] = useState(false)
  const [votingStatus, setVotingStatus] = useState(true)
  const [remainingTime, setRemainingTime] = useState('')
  const [candidates, setCandidates] = useState([])

  // const contract = ContractInstance();
  useEffect( () => {
    if(window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }
    return () => {
      if(window.ethereum) {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
      }
    }
  }, [])

  async function getCandidates() {
    const provider = new ethers.JsonRpcApiProvider(window.ethereum)
    provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer)
    const candidates = contractInstance.getAllVotesOfCandiates();
    setCandidates(candidates);
  }

  async function getCurrentStatus() {
    const provider = new ethers.JsonRpcApiProvider(window.ethereum)
    provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer)
    const status = await contractInstance.getVotingStatus();
    setVotingStatus(status)
    console.log(status)
  }

  async function getRemainingTime() {
    const contract = await ContractInstance();
    const time = await contract.getRemainingTime();
    setRemainingTime(parseInt(time, 16));
    console.log(contract)
    console.log(`remaining time: ${parseInt(time, 16)}`)
  }
  


  function handleAccountsChanged(accounts) {
    if(accounts.length > 0 && accounts !== accounts[0]){
      setAccount(accounts[0])
      setIsConnected(true)
    }
    else {
      setIsConnected(false)
      setAccount(null)
    }
  }

  async function connectMetamask() {
    if(window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        setProvider(provider);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        console.log(`Metamask connected: ${address}`);
        setAccount(address);
        setIsConnected(true);

      } catch (error) {
        console.error(`connectMetamask error :: ${error}`)
      }
    } else {
      alert(`Metamask is not detected in the browser`);
    }
  }

  return (
    <div className="App">
      {isConnected ? <Connected account={account}/>: <Login connectWallet={connectMetamask} />}
    </div>
  
  );
}

export default App;
