const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Lottery", function () {
  let accounts;
  let NFTContract;
  let lottery;
  const toWei = ethers.utils.parseEther;

  before(async function () {
    accounts = await ethers.getSigners();

    const Oracle = await ethers.getContractFactory("TestOracleStorage");
    oracle = await Oracle.deploy();
    await oracle.deployed();

    const NFTCollection = await ethers.getContractFactory("NFTCollection");
    NFTContract = await NFTCollection.deploy();
    await NFTContract.deployed();

    const Lottery = await ethers.getContractFactory("Lottery");
    lottery = await Lottery.deploy(NFTContract.address, oracle.address);
    await lottery.deployed();
  });

  describe("Start function", function () {
    it("should revert: not the owner", async function () {
      await expect(lottery.connect(accounts[1]).start()).to.be.reverted;
    });
    it("should pass: state changed", async function () {
      await lottery.start();
      expect(await lottery.state()).to.equal(0);
    });
    it("should revert: lottery already started", async function () {
      await expect(lottery.start()).to.be.reverted;
    });
  });

  describe("Enter function", function () {
    it("should pass: contract takes fees", async function () {
      await lottery.enter({ value: toWei("0.001") });
      await lottery.connect(accounts[1]).enter({ value: toWei("0.001") });
      expect(await ethers.provider.getBalance(lottery.address)).to.equal(
        toWei("0.002")
      );
    });
    it("should pass: add participants", async function () {
      expect(await lottery.players(0)).to.equal(await accounts[0].getAddress());
      expect(await lottery.players(1)).to.equal(await accounts[1].getAddress());
    });
    it("should revert: not enough fees", async function () {
      await expect(lottery.enter({ value: toWei("0.0001") })).to.be.reverted;
    });
  });

  describe("End function", function () {
    it("should revert: not the owner", async function () {
      await expect(lottery.connect(accounts[1]).endLottery()).to.be.reverted;
    });
    it("should pass: emit winner event", async function () {
      await lottery.enter({ value: toWei("0.001") });
      await lottery.connect(accounts[1]).enter({ value: toWei("0.001") });
      const minterRole = await NFTContract.MINTER_ROLE();
      await NFTContract.grantRole(minterRole, lottery.address);
      await expect(lottery.endLottery())
        .to.emit(lottery, "Winner")
        .emit(lottery, "Winner");
    });
    it("should pass: change lottery's state to close", async function () {
      expect(await lottery.state()).to.equal(1);
    });
    it("should revert: lottery already ended", async function () {
      await expect(lottery.endLottery()).to.be.reverted;
    });
  });
});
