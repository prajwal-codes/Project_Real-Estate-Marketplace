// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  // const REToken = await hre.ethers.getContractFactory("REToken");
  // const MyRealEstate = await hre.ethers.getContractFactory("MyRealEstate");

  // const reToken = await REToken.deploy();
  // const reTokenInstance = await reToken.deployed();

  // const myRealEstate = await MyRealEstate.deploy(reTokenInstance.address);
  // const myRealEstateInstance = await myRealEstate.deployed();

  // console.log('REToken Instance', reTokenInstance.address);
  // console.log('MyRealEstate Instance', myRealEstateInstance.address);

  // // const myRealEstate = await MyRealEstate.deploy();
  // // await myRealEstate.deployed();

  // console.log('Contract deployed....');
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
