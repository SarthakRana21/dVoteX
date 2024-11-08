import { ethers } from "ethers";
import { contractAddress, contractAbi } from "../constant/constant";

export default async function ContractInstance() {
        if(!window.ethereum) {
            alert("Metamask not found in this browser")
        }
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", [])
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractAbi, signer)

            return contract;
    
        } catch (error) {
            console.error( `contract Instance Error :: ${error}`);
        }
}