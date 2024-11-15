project preview

https://github.com/user-attachments/assets/cfbeb1c8-f7da-4b29-8106-fb841f610bed


# dVoteX - Decentralized Voting Application

dVoteX is a secure, transparent, and decentralized voting platform built on blockchain technology. It leverages Ethereum smart contracts for transparent voting and ensures that voting data is immutable and verifiable.

## Tech Stack

- **Blockchain**: Ethereum (Volta Testnet)
  - dVoteX utilizes Ethereum's smart contracts to enable secure, decentralized voting, ensuring that all votes are recorded immutably on the blockchain.

- **Smart Contracts**: Solidity (Version 0.8.11)
  - The voting logic, including vote casting, vote tallying, and election management, is implemented in Solidity smart contracts.

- **Frontend**: React.js (Version 18.3.1)
  - The frontend user interface is built using React.js, allowing voters to interact seamlessly with the decentralized voting system.

- **Web3**: Ethers.js (Version 6.13.4)
  - Ethers.js is used to interact with the Ethereum blockchain, enabling communication between the frontend and the deployed smart contracts.

- **Development Framework**: Hardhat (Version 2.22.15)
  - Hardhat is used for compiling, testing, and deploying smart contracts to the Ethereum blockchain. It integrates with Solidity and provides powerful tools for development.

- **Testing**: Jest, React Testing Library
  - Unit tests are written with Jest and React Testing Library to ensure the functionality of the frontend and smart contract interactions.

- **Version Control**: GitHub
  - The project code is hosted on GitHub, allowing for version control and collaboration.

- **Ethereum Network**: Volta Testnet
  - The app is deployed on the Volta Testnet to test and simulate the voting process in a decentralized environment before going live on the Ethereum mainnet.

## Features

- **Decentralized Voting**: No central authority controls the votes, ensuring fairness and transparency.
- **Smart Contract Integration**: Voting process is automated and stored securely on the blockchain.
- **Transparency**: Anyone can verify the votes in real-time.
- **Immutable Data**: Once votes are cast, they cannot be altered or deleted, ensuring election integrity.
- **Security**: By leveraging Ethereum’s blockchain, the app ensures that votes are secure and tamper-resistant.

## How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/SarthakRana21/dVoteX.git
   cd dVoteX
   ```

2. Install dependencies for the frontend:
   ```bash
   cd dvotex-frontend
   npm install
   ```

3. Set up the Volta Testnet on your Ethereum wallet (Metamask recommended).

4. Compile and deploy the smart contracts using Hardhat:
   ```bash
   npx hardhat run scripts/deploy.js --network volta
   ```

5. Start the frontend development server:
   ```bash
   npm start
   ```

6. Open the application in your browser at `http://localhost:3000`.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Create a new Pull Request.



## Acknowledgements

- [Ethereum](https://ethereum.org)
- [Solidity](https://soliditylang.org/)
- [Hardhat](https://hardhat.org/)
- [React](https://reactjs.org/)
- [Ethers.js](https://docs.ethers.io/v6/)
- https://github.com/syedmuhamaddanish
