const Web3 = require('web3');
require('dotenv').config();
const webhookLink = process.env.webhookLink;

var web3js;
const getWalletProvider = async function() {
  console.log('getWalletProvider method invoked')
    web3js = new Web3(Web3.givenProvider || webhookLink);
    return web3js;
};

module.exports = {
    getWalletProvider
};

