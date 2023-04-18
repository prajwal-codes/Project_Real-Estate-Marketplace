mongoose.Schema({
  tokenId: {
    type: String,
    unique: true,
  },
  seller: {
    type: String,
  },
  buyer: {
    type: String,
  },
  price: {
    type: Number,
  },
  eventData: {
    type: {},
  },
});
