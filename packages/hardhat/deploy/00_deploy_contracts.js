const { ethers } = require("hardhat");

const localChainId = "31337";

module.exports = async ({ getNamedAccounts, deployments, getChainId }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();

  await deploy("SimpleOracleStorage", {
    from: deployer,
    log: true,
    waitConfirmations: 5,
  });

  const Oracle = await ethers.getContract("SimpleOracleStorage");

  await deploy("NFTCollection", {
    from: deployer,
    log: true,
    waitConfirmations: 5,
  });

  const Collection = await ethers.getContract("NFTCollection");

  await deploy("Lottery", {
    from: deployer,
    args: [Collection.address, Oracle.address],
    log: true,
    waitConfirmations: 5,
  });

  const Lottery = await ethers.getContract("Lottery");

  const minterRole = await Collection.MINTER_ROLE();
  console.log(Lottery.address);
  await Collection.grantRole(minterRole, Lottery.address);
};
module.exports.tags = ["Lottery"];
