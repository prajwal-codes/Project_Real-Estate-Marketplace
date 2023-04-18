var Web3 = require("web3");
const fs = require("fs");

const web3 = new Web3(
  new Web3.providers.HttpProvider("HTTP://127.0.0.1:8545")
);
web3.eth.handleRevert = true;

(async function () {
  try {
    let result;
    let txObject = {from: "0xc67e5FFF9316476236B104993d91309170bb7BAC",   gas: 4800000, gaslimit: 3100000000000};
    let reTokenJSON = JSON.parse(fs.readFileSync("./artifacts/contracts/REToken.sol/REToken.json", "utf8"));
    let reTokenABI = reTokenJSON.abi;
    let reTokenBytecode = reTokenJSON.bytecode;
    let REToken = new web3.eth.Contract(reTokenABI);
    
    let MyRealEstateJSON = JSON.parse(fs.readFileSync("./artifacts/contracts/MyRealEstate.sol/MyRealEstate.json", "utf8"));
    let myRealEstateABI = MyRealEstateJSON.abi;
    let myRealEstateBytecode = MyRealEstateJSON.bytecode;
    let MyRealEstate = new web3.eth.Contract(myRealEstateABI);

    let RETokenInstance = await REToken.deploy({data: reTokenBytecode,arguments: []}).send(txObject);
    console.log("REToken address: ", RETokenInstance.options.address); // instance with the new contract address

    let MyRealEstateInstance = await MyRealEstate.deploy({data: myRealEstateBytecode,arguments: [RETokenInstance.options.address]}).send(txObject);
    console.log("REToken address: ", MyRealEstateInstance.options.address); // instance with the new contract address
    
    console.log("done");
  } catch (e) {
    console.log(e);
  }
})();
