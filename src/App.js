import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Login from './components/Login';
import Connected from './components/Connected';
import ContractInstance from './components/contractInstance';
import './App.css';
import { contractAbi, contractAddress } from './constant/constant';

function App() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [votingStatus, setVotingStatus] = useState(true);
  const [remainingTime, setRemainingTime] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [number, setNumber] = useState('');
  const [voteStatus, setVoteStatus] = useState(true);

  useEffect(() => {
    if (!window.ethereum) {
      alert("MetaMask is not installed!");
      return;
    }
    
    getCandidates();
    getCurrentStatus();
    getRemainingTime();
    canVote()
    window.ethereum.on('accountsChanged', handleAccountsChanged);

    return () => {
      window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
    };
  }, []);

  async function vote() {
    try {
      const contract = await ContractInstance();
      const tx = await contract.vote(number);
      await tx.wait();
      canVote();
      console.log(`you voted ${number}`)
    } catch (error) {
      console.error(`Error in vote: ${error}`);
    }
  }

  async function canVote() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractAbi, signer);
    const voteStatus = await contract.voters(await signer.getAddress());
    setVoteStatus(voteStatus);
  }

  async function getCandidates() {
    try {
      const contract = await ContractInstance();
      const candidates = await contract.getAllVotesOfCandiates();
      const formattedCandidates = candidates.map((candidate, index) => {
        return {
          index: index,
          name: candidate.name,
          voteCount: parseInt(candidate.voteCount, 16)
        };
      });
      setCandidates(formattedCandidates);
    } catch (error) {
      console.error(`Error getting candidates: ${error}`);
    }
  }

  async function getCurrentStatus() {
    try {
      const contract = await ContractInstance();
      const status = await contract.getVotingStatus();
      setVotingStatus(status);
    } catch (error) {
      console.error(`Error getting current status: ${error}`);
    }
  }

  async function getRemainingTime() {
    try {
      const contract = await ContractInstance();
      const time = await contract.getRemainingTime();
      setRemainingTime(parseInt(time, 16));
    } catch (error) {
      console.error(`Error getting remaining time: ${error}`);
    }
  }

  function handleAccountsChanged(accounts) {
    if (accounts.length > 0 && accounts[0] !== account) {
      setAccount(accounts[0]);
      setIsConnected(true);
      canVote();
    } else {
      setIsConnected(false);
      setAccount(null);
    }
  }

  async function connectMetamask() {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        setProvider(provider);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        setIsConnected(true);
        canVote();
      } catch (error) {
        console.error(`connectMetamask error :: ${error}`);
      }
    } else {
      alert(`MetaMask is not detected in the browser`);
    }
  }

  async function handleNumberChange(e) {
    setNumber(e.target.value);
  }

  return (
    <div className="App">
    { votingStatus ? (isConnected ? (<Connected 
                    account = {account}
                    candidates = {candidates}
                    remainingTime = {remainingTime}
                    number= {number}
                    handleNumberChange = {handleNumberChange}
                    vote = {vote}
                    showButton = {voteStatus}/>) 
                    
                    : 
                    
                    (<Login connectWallet = {connectMetamask}/>)) : (<h1>Voting is Finished</h1>)}
    
  </div>
  );
}

export default App;
