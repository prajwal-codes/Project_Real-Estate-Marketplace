mongoose.Schema({
    contractAddress: {
        type: String,
    },
    tokenId: {
        type: String,
    },
    price: {
        type: Number,
    },
    buyer: {
        type: String,
        required: true,
    },
    seller: {
        type: String,
        required: true,
    },
    blockNo: {
        type: Number,
        require: true
    },
    eventData: {
        type: {}
    },
    txId: {
        type: String
    }
})
