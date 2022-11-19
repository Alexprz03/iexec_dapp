# 🏗 iExec test lottery (using scaffold eth)

A Ethereum NFT lottery based on iExec technology

# Introduction

## Remarks

The deployment are done locally by a fork of the goerli network (because of the short time and the whitelist on the iexec network)
The lottery uses a random number coming from an oracle contract created using the tool proposed by iexec.
The oracle is updated every 24h, so I've set the number of NFT distributed to 1.

## Improvement

In a V2 it would be interesting to pay the participation fees in RLC and use the iexec network. This would allow to call the contract without paying the fees, to reduce considerably the blocks time validation and to be able to use the random oracle instantaneously.

## Tools used

- Environment (Hardhat + React) [scaffold-eth](https://github.com/scaffold-eth/scaffold-eth)
- [Yarn (v1.x)](https://classic.yarnpkg.com/en/docs/install/)
- [Node (v16 LTS)](https://nodejs.org/en/download/)
- [Git](https://git-scm.com/downloads)

## Variable used on Smart contracts

### Lottery

Admin : deployer address
ParticipationFees : 0.001 ether (1000000000000000 wei)
Number of NFT distributed : 1

### NFT Collection

IPFS collecttion : https://ipfs.io/ipfs/QmWmeVJWfpXhr4BcshshHMiqi8nixykwvmJ6mkAjjpt6hg
Collection name : NFT lottery
Symbol : NFTL

### Oracle

Oracle address Goerli : 0x36dA71ccAd7A67053f0a4d9D5f55b725C9A25A3E
Oracle ID : 0xd275c4116f1576d1235bda4b420a4167f57ce041a5b0efdace07ce2cd78c5151

# 🏄‍♂️ Quick Start

> clone/fork 🏗 repo:

```bash
git clone https://github.com/Alexprz03/iexec_dapp.git
```

> create your file mnemonic.txt in packages/hardhat and enter your Metamask mnemonic

> install and start your 👷‍ Hardhat chain fork Goerli:

```bash
cd scaffold-eth
yarn install
yarn fork
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

# Potential error on localhost fork

## Nonce too high Metamask

- Open your metamask
- Go to Settings
- then Advanced
- Hit Reset Account
- Restart the transaction
