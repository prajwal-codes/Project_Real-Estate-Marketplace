const RETokenJSON = require('../../blockchain/artifacts/contracts/REToken.sol/REToken.json')
const MyRealEstateJSON = require('../../blockchain/artifacts/contracts/MyRealEstate.sol/MyRealEstate.json')
const walletInstance = require('./walletProvider');


const getWeb3Obj = async () => {
    return await walletInstance.getWalletProvider();
}

const getInstance = async () => {
    const web3 = await getWeb3Obj() 
    const REToken = await new web3.eth.Contract(RETokenJSON.abi, process.env.RETokenAddress);
    const MyRealEstate = await new web3.eth.Contract(MyRealEstateJSON.abi, process.env.MyRealEstateAddress);
    return {REToken, MyRealEstate};
}

const getTxObject = async (fromAddress, value, gas='6721975') => {
    const web3 = await getWeb3Obj(); 
        return {
            from: fromAddress,
            value: web3.utils.toWei(web3.utils.BN(value)),
            gas: '6721975'
          }
}

module.exports = {getInstance, getWeb3Obj, getTxObject}
