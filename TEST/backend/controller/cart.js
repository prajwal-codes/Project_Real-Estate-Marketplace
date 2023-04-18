const Cart = require("../models/Cart");
const User = require("../models/User");
const contractInstance = require("../helpers/getContractInstance");

// POST endpoint for adding items to cart
exports.createCart = async (req, res) => {
  try {
    var data = {
      userId: req.user._id,
      postText: req.body.postData.postText,
      postImage: req.body.postData.filename,
      postType: req.body.postData.postType,
      postCity: req.body.postData.postCity,
      postState: req.body.postData.postState,
      postDistrict: req.body.postData.postDistrict,
      postAddress: req.body.postData.postAddress,
      postYear: req.body.postData.postYear,
      postDimension: req.body.postData.postDimension,
      postSqArea: req.body.postData.postSqArea,
    };
    const cart = new Cart(data);
    await cart.save();
    res.send({ type: "success", msg: "Cart updated successfully" });
  } catch (err) {
    console.log(err);
    res.send({ type: "danger", msg: "Failed to update cart" });
  }
};

// Function to get cart items for a user
exports.getCart = async (req, res, next) => {
  try {
    // const user = await User.findOne({_id: req.user._id });
    // let idList = user.posts.map((item) => item.postId);
    // idList.unshift(req.user._id);
    const cartList = await Cart.findOne({ userId:req.user._id }).populate({
      path: "userId",
      model: "user",
      select: "_id name pic",
    });
    console.log(cartList);
    res.send(cartList);
  } catch (err) {
    console.log(err);
    res.send({ type: "error", msg: "Failed to fetch cart" });
  }
};

// Function to get cart items added by a user
exports.getAddedCart = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    let idList = user.carts.map((item) => item.cartId);
    idList.unshift(req.user._id);
    const cartList = await Cart.find({ userId: { $in: idList } }).populate({
      path: "userId",
      select: "_id name pic",
    });
    res.send(cartList);
  } catch (err) {
    console.log(err);
    res.send({ type: "error", msg: "Failed to fetch added cart" });
  }
};


exports.updateCart = async (req, res, next) => {
  //Buy Property
  try {
    let result = await Cart.findOneAndUpdate(
      { _id: req.user._id },
      {
        $set: {
          postText: req.body.postText,
          postImage: req.file.filename,
          postType: req.body.postType,
          postCity: req.body.postCity,
          postState: req.body.postState,
          postDistrict: req.body.postDistrict,
          postAddress: req.body.postAddress,
          postYear: req.body.postYear,
          postDimension: req.body.postDimension,
          postSqArea: req.body.postSqArea,
          userAddress: "0x0e97c9BC912D6e26fE6854dC5FBC2eAD62a662a8",
          newOwnerAddress: req.body.newOwner,
        },
      },
      { new: true }
    );
      console.log('Buy Peoperty', req.body);
    const { REToken, MyRealEstate } = await contractInstance.getInstance();
    let txObj = await contractInstance.getTxObject(req.body.newOwner);

    // SmartContract Call to Purchase ERC20 Tokens to buy the property
    // let txReceipt = await MyRealEstate.methods.PurchaseERC20Tokens(data.userAddress, "URI").send(txObj);

    // console.log('MyRealEstate Methods: ', MyRealEstate.methods);
        
        // console.log('TxObj ------', txReceipt.events.RNFTTokenMinted.returnValues);
    
    res.send({ type: "success", msg: "Successfully Transfered Ownership" });
  } catch (error) {
    console.log(error);
    res.send({ type: "error", msg: "Failed" });
  }
};
