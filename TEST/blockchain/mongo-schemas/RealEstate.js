mongoose.Schema({
  tokenId: {
    type: String,
  },
  name: {
    type: String,
  },
  tokenImg: {
    type: String,
  },
  tokenURI: {
    type: String,
  },
  price: {
    type: Number,
  },
  ownerAddress: {
    type: String,
  },
  txId: {
    type: String,
  },
  blockNo: {
    type: Number,
  },
  eventData: {
    type: {},
  },
  contractAddress: {
    type: String,
  },
});
