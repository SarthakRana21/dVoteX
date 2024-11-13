import { useState, useEffect } from 'react';
import {ethers} from 'ethers';
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
  const [number, setNumeber] = useState('')

  useEffect( () => {
    getCandidates()
    getCurrentStatus()
    getRemainingTime()

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
    const contract = await ContractInstance();
    const candidates = await contract.getAllVotesOfCandiates();
    const formattedCandidates = candidates.map((candidate, index) => {
      return {
        index: index,
        name: candidate.name,
        voteCount: parseInt(candidate.voteCount, 16)
      }
    });
    setCandidates(formattedCandidates);
    console.log(formattedCandidates);
  }
  

  async function getCurrentStatus() {
    const contract = await ContractInstance();
    const status = await contract.getVotingStatus();
    setVotingStatus(status)
  }

  async function getRemainingTime() {
    const contract = await ContractInstance();
    const time = await contract.getRemainingTime();
    setRemainingTime(parseInt(time, 16));
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
      {isConnected ? <Connected 
        account={account}
        candidates = {candidates}
        remainingTime = {remainingTime}
        number = {number}

      />: <Login connectWallet={connectMetamask} />}      
    </div>
  
  );
}

export default App;
