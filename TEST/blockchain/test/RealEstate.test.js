// const { assert, expect } = require("chai");
// const { ethers } = require("hardhat");
// const { constants } = require("@openzeppelin/test-helpers");

// let data = ethers.utils.toUtf8Bytes("hello");

// describe("MyRealEstate", () => {
//   before(async () => {
//     const userAccounts = await ethers.getSigners();
//     [user1, user2] = userAccounts;
//     const MyRealEstate = await ethers.getContractFactory("MyRealEstate");
//     realEstateInstace = await MyRealEstate.deploy()
//   });

//   describe("Contract Deployment Check", () => {
//     it("should check the deployed contract", async () => {
//       let txObj = await realEstateInstace.deployTransaction.wait();
//       await expect(txObj.status).to.equal(1, "Conract deployment failed");
//     });
//   });
//   describe("Create Function", () => {
//     it("should check user1 balance", async () => {
//       let txObj = await realEstateInstace.balanceOf(user1.address, 0);
//       expect(txObj.toNumber()).to.equal(0, 'Incorrect token balance');
//     });
//     it('should fail for zero address', async () => {
//       await expect(realEstateInstace.createToken(constants.ZERO_ADDRESS, 0, 1, data)).to.be.revertedWith("ERC1155: mint to the zero address");
//     });
//     it("should create NFT token", async () => {
//       let txObj = await realEstateInstace.createToken(user1.address, 0, 1, data);
//       let res = await txObj.wait();
//       await expect(res.status).to.equal(1, "Token Creation failed");
//     });
    
//     it("should check user1 balance", async () => {
//       let txObj = await realEstateInstace.balanceOf(user1.address, 0);
//       expect(txObj.toNumber()).to.equal(1, 'Incorrect token balance');
//     });
//   });

// });
