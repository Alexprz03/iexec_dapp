# 🏗 iExec test lottery (using scaffold eth)

# Introduction

# 🏄‍♂️ Quick Start

Prerequisites: [Node (v16 LTS)](https://nodejs.org/en/download/) plus [Yarn (v1.x)](https://classic.yarnpkg.com/en/docs/install/) and [Git](https://git-scm.com/downloads)

> clone/fork 🏗 scaffold-eth:

```bash
git clone https://github.com/Alexprz03/iexec_dapp.git
```

> create your file mnemonic.txt in packages/hardhat and enter your Metamask mnemonic

> install and start your 👷‍ Hardhat chain:

```bash
cd scaffold-eth
yarn install
yarn chain
```

> in a second terminal window, start your 📱 frontend:

```bash
cd scaffold-eth
yarn start
```

📱 Open http://localhost:3000 to see the app and connect with metamask on the app

> in a third terminal window, 🛰 deploy your contract:

```bash
cd scaffold-eth
yarn deploy
```

# Contract interaction

We have two smart contracts :

- The lottery contract :
  This contract is the administrator contract for the NFT collection. It allows to open lotteries and to select a participant to win an nft

- The NFT contract :
  It is an NFT contract based on the ERC721 standard of openzepplin. The metadatas are first stored on ipfs and then the ipfs uri is stored in the contract.

# Process to cover all the use case in frontend when deployed

- Connect with your metamask
- Go to the menu "Lottery contract"
- Select your first account (It will be the admin account of the contract lottery)
- In the section "start" click on the button send at the right. It will start the lottery
- In the "enter" section, enter the participation fees (1000000000000000 wei) in the form and click on send
- Now switch to 2 or 3 another wallet and complete the "enter" section with the same process
- When enough accounts have participated, switch to your admin account and click on the button in "endLottery" section
- Now the lotterie is closed
- Go on the NFT contract tab
- Found the section "ownerOf", enter 1 and click on send. You should see which adresses won the NFTs
- Then go to tokenURI and enter again 1. And uri appears
- Copy the url and paste it in your browser

You have completed the lottery process. You can then, if you wish, withdraw the participation fees and also define a new NFTCollection contract address in order to be able to restart a new lottery.
