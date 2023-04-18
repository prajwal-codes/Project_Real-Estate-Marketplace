// const mongoose = require('mongoose');
// const Post = require("../models/Post");
// const User = require("../models/User");
// const Ledger=require("../models/Ledger");
// const contractInstance = require("../helpers/getContractInstance");


// exports.createPost = async (req, res) => {
//   try {
//     var data = {
//       userId: req.user._id,
//       postText: req.body.postText,
//       postImage: req.file.filename,
//       postType: req.body.postType,
//       postCity: req.body.postCity,
//       postState: req.body.postState,
//       postDistrict: req.body.postDistrict,
//       postAddress: req.body.postAddress,
//       postYear: req.body.postYear,
//       postDimension: req.body.postDimension,
//       postSqArea: req.body.postSqArea,
//       userAddress: req.body.userAddress,
//       old_owner:req.body.userAddress
//     };
//     const post = new Post(data);
//     console.log(data);
//     // Call to Blockchain : createNFTToken function
//     const { REToken, MyRealEstate } = await contractInstance.getInstance();
//     // console.log('MyRealEstate Methods: ', MyRealEstate.methods);
//     let txObj = await contractInstance.getTxObject(data.userAddress);

//     let txReceipt = await MyRealEstate.methods.createNFTToken(data.userAddress, "URI").send(txObj);
//     // console.log('TxObj ------', txReceipt.events.RNFTTokenMinted.returnValues);
    
//     console.log('Transaction Hash : ', txReceipt.transactionHash);
//     console.log('Block Number : ', txReceipt.blockNumber);
//     let returnValue = txReceipt.events.RNFTTokenMinted.returnValues;
//     console.log('Events',returnValue);
//     console.log(' ID', returnValue.id);
    
//     let owner = await MyRealEstate.methods.getPropertyOwner(returnValue.id).call();
//     // console.log('REsult -----> ', owner);

//     //TODO: insert required data into database
//     var data2={
//       userId: req.user._id,
//       postText: req.body.postText,
//       postImage: req.file.filename,
//       postType: req.body.postType,
//       postCity: req.body.postCity,
//       postState: req.body.postState,
//       postDistrict: req.body.postDistrict,
//       postAddress: req.body.postAddress,
//       postYear: req.body.postYear,
//       postDimension: req.body.postDimension,
//       postSqArea: req.body.postSqArea,
//       userAddress: req.body.userAddress,
//       txn_id:returnValue.id
//     }
//     const ledger = new Ledger(data2);

//     await post.save();
//     await ledger.save();
//     res.send({ type: "success", msg: "post created successfully" });
//   } catch (err) {
//     console.log(err);
//     res.send({ type: "danger", msg: "failed to save post" });
//   }
// };
// exports.updatePost = (req, res, next) => {
//   console.log(req.body._id);
// 	Post.findOneAndUpdate(
// 		{ _id: mongoose.Types.ObjectId(req.body._id)},
// 		{
// 			$set: {
// 				price: req.body.price,
// 				list: req.body.list
// 			},
// 		},
// 		{ new: true }
// 	)
// 		.then((data) => {
//       console.log(data);
// 			res.send({ type: "success", msg: "Successfully updated profile" });
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 			res.send({ type: "error", msg: "Failed to update the profile" });
// 		});
// };

// exports.getPic = async (req, res, next) => {
//   const picName = req.params.postpic;
//   res.sendFile(picName, { root: "media/posts" });
// };

// exports.getPosts = async (req, res, next) => {
//   try {
//     const user = await User.findOne({ _id: req.user._id });
//     let idList = user.posts.map((item) => item.userId);
//     idList.unshift(req.user._id);
//     const postList = await Post.find({ userId: { $in: idList } }).populate({
//       path: "userId",
//       select: "_id name pic",
//     });
//     res.send(postList);
//   } catch (err) {
//     console.log(err);
//     res.send({ type: "error", msg: "failed to fetch property lists" });
//   }
//   // try {
//   //   const user = await User.findOne({ _id: req.user._id });
//   //   let idList = user.posts.map((item) => item.userId);
//   //   idList.unshift(req.user._id);
//   //   const postList = await Post.find({ userId: { $in: idList } }).populate({
//   //     path: "userId",
//   //     select: "_id name pic",
//   //   });
//   // } catch (err) {
//   //   console.log(err);
//   //   res.send({ type: "error", msg: "failed to fetch property posts" });
//   // }
// };

// exports.getAllPosts = async (req, res, next) => {
//   try {
//     if(Post.list="1"){
//     const postList = await Post.find({}).populate({
//       path: "userId",
//       select: "_id name pic",
//     });
//     res.send(postList);}
//   } catch (err) {
//     console.log(err);
//     res.send({ type: "error", msg: "failed to fetch property lists" });
//   }

// };
// exports.sellPost = async (req, res, next) => {
//   var data = {
//     userId: req.user._id,
//     postText: req.body.postText,
//     postImage: req.file.filename,
//     postType: req.body.postType,
//     postCity: req.body.postCity,
//     postState: req.body.postState,
//     postDistrict: req.body.postDistrict,
//     postAddress: req.body.postAddress,
//     postYear: req.body.postYear,
//     postDimension: req.body.postDimension,
//     postSqArea: req.body.postSqArea,
//     userAddress: req.body.userAddress,
//     old_owner:req.body.userAddress,
//     price:req.body.price
//   };
//   const post = new Post(data);
//   console.log(data);
//   const { REToken, MyRealEstate } = await contractInstance.getInstance();
//   // console.log('MyRealEstate Methods: ', MyRealEstate.methods);
//   let txObj = await contractInstance.getTxObject(data.userAddress);

//   let txReceipt = await MyRealEstate.methods.createNFTToken(data.userAddress, "URI").send(txObj);
//   // console.log('TxObj ------', txReceipt.events.RNFTTokenMinted.returnValues);
  
//   console.log('Transaction Hash : ', txReceipt.transactionHash);
//   console.log('Block Number : ', txReceipt.blockNumber);

//   let returnValue = txReceipt.events.RNFTTokenMinted.returnValues;
//   console.log('Events',returnValue);
//   console.log(' ID', returnValue.id);

//   let txReceipt1 = await MyRealEstate.methods.PurchaseERC20Tokens(data.userAddress,"URI", "UPI").send(txObj);
//   console.log('Transaction Hash : ', txReceipt.transactionHash);
//   console.log('Block Number : ', txReceipt.blockNumber);

//   let returnValue1 = txReceipt1.events.ERC20TokenMinted.returnValues;
//   console.log('amount',returnValue1.price);


  
//   let owner = await MyRealEstate.methods.getPropertyOwner(returnValue.id).call();

//   let new_owner = await MyRealEstate.methods.getPropertyOwner(returnValue1.id).call();

//   console.log(req.body._id);
// 	Post.findOneAndUpdate(
// 		{ _id: mongoose.Types.ObjectId(req.body._id)},
// 		{
// 			$set: {
// 				new_owner: req.body.new_owner,
//         list:"0"
// 			},
// 		},
// 		{ new: true }
// 	)
// 		.then((data) => {
//       console.log(data);
// 			res.send({ type: "success", msg: "Sold" });
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 			res.send({ type: "error", msg: "Failed to Sell" });
// 		});
// };
// exports.updateLedger =async(req,res) => {
//   try {
//     console.log(req.body._id);
// 	Ledger.findOneAndUpdate(
// 		{ _id: mongoose.Types.ObjectId(req.body._id)},
// 		{
// 			$set: {
// 				new_owner: req.body.new_owner,
// 				list: "0",
//         old_owner:req.body.userAddress
// 			},
// 		},
// 		{ new: true }
// 	)
// 		.then((data) => {
//       console.log(data);
// 			res.send({ type: "success", msg: "Successfully updated profile" });
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 			res.send({ type: "error", msg: "Failed to update the profile" });
// 		});
    

//   } catch (err) {
//     console.log(err);
//     res.send({ type: "danger", msg: "failed to save post" });
//   }
// };

const mongoose = require('mongoose');
const Post = require("../models/Post");
const User = require("../models/User");
const Ledger=require("../models/Ledger");
const contractInstance = require("../helpers/getContractInstance");


exports.createPost = async (req, res) => {
  try {
    var data = {
      userId: req.user._id,
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
      userAddress: req.body.userAddress
    };
    // Call to Blockchain : createNFTToken function
    const { REToken, MyRealEstate } = await contractInstance.getInstance();
    // console.log('MyRealEstate Methods: ', MyRealEstate.methods);
    let txObj = await contractInstance.getTxObject(data.userAddress);

    let txReceipt = await MyRealEstate.methods.createNFTToken(data.userAddress, "URI").send(txObj);
    // console.log('TxObj ------', txReceipt.events.RNFTTokenMinted.returnValues);
    
    console.log('Transaction Hash : ', txReceipt.transactionHash);
    console.log('Block Number : ', txReceipt.blockNumber);
    let returnValue = txReceipt.events.RNFTTokenMinted.returnValues;
    console.log('Events',returnValue);
    console.log(' ID', returnValue.id);

    data['tokenId'] = returnValue.id;
    const post = new Post(data);
    console.log(data);
    
    let owner = await MyRealEstate.methods.getPropertyOwner(returnValue.id).call();
    // console.log('REsult -----> ', owner);

    //TODO: insert required data into database
    var data2={
      userId: req.user._id,
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
      userAddress: req.body.userAddress,
      txn_id: returnValue.id,
      tokenId: returnValue.id,
    }
    const ledger = new Ledger(data2);

    await post.save();
    await ledger.save();
    res.send({ type: "success", msg: "post created successfully" });
  } catch (err) {
    console.log(err);
    res.send({ type: "danger", msg: "failed to save post" });
  }
};
exports.updatePost = async (req, res, next) => {
  console.log(req.body._id);
  console.log('----------->', req.body);

  try {
   let result = await Post.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(req.body._id)},
      {
        $set: {
          price: req.body.price,
          list: req.body.list
        },
      },
      { new: true }
    )
  console.log('List property for sale', req.body);
  const { REToken, MyRealEstate } = await contractInstance.getInstance();
  let txObj = await contractInstance.getTxObject("0xc67e5FFF9316476236B104993d91309170bb7BAC");
  let isPropertyForSale = false;
  if(req.body.list == '1'){
    isPropertyForSale = true;
  }
  // Smart contract call to list property for sale
  // let txReceipt = await MyRealEstate.methods.listPropertyForSale(result.tokenId, req.body.price, isPropertyForSale).send(txObj);
  let txReceipt = await MyRealEstate.methods.listPropertyForSale(1, 100, true).send(txObj);
  console.log('TxReceipt', txReceipt);
  //TODO: get the required data from events and push to database

  // Smart contract call to setApprovalForAll 
  // this allows Escrow contract to transfer the NFT token to buyer on behalf of owner
  let escrowContractAddress = await MyRealEstate.methods.getEscrowContractAddress().call();
  console.log('Escrow Contract Address', escrowContractAddress);
  txReceipt = await REToken.methods.setApprovalForAll(escrowContractAddress, true).send(txObj);
  // txReceipt = await REToken.methods.setApprovalForAll(escrowContractAddress, isPropertyForSale).send(txObj);

  console.log('Tx Receipt for setApprovalForAll', txReceipt);
  //TODO: get the required data from events and push to database
  txObj = await contractInstance.getTxObject("0xDC1f5CA2661404b2c9544E529bB2D65DfABA03c0");

  txReceipt = await MyRealEstate.methods.PurchaseERC20Tokens(100,"0xDC1f5CA2661404b2c9544E529bB2D65DfABA03c0","URI", "UPI-ID").send(txObj);
  console.log('TxObj for purchaseERC20 Tokens------', txReceipt);
   txReceipt = await REToken.methods.setApprovalForAll(escrowContractAddress, true).send(txObj);

  txReceipt = await MyRealEstate.methods.purchaseProperty(1).send(txObj);
  console.log('Tx Receipt for Purchase Property', txReceipt);
  console.log(txReceipt.events.PropertyTransferred);

  res.send({ type: "success", msg: "Property is listed for sale" });

  } catch (error) {
    console.log(error);
    res.send({ type: "error", msg: "Failed to list property for sale" });

  }

};

exports.getPic = async (req, res, next) => {
  const picName = req.params.postpic;
  res.sendFile(picName, { root: "media/posts" });
};

exports.getPosts = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    let idList = user.posts.map((item) => item.userId);
    idList.unshift(req.user._id);
    const postList = await Post.find({ userId: { $in: idList } }).populate({
      path: "userId",
      select: "_id name pic",
    });
    res.send(postList);
  } catch (err) {
    console.log(err);
    res.send({ type: "error", msg: "failed to fetch property lists" });
  }
  // try {
  //   const user = await User.findOne({ _id: req.user._id });
  //   let idList = user.posts.map((item) => item.userId);
  //   idList.unshift(req.user._id);
  //   const postList = await Post.find({ userId: { $in: idList } }).populate({
  //     path: "userId",
  //     select: "_id name pic",
  //   });
  // } catch (err) {
  //   console.log(err);
  //   res.send({ type: "error", msg: "failed to fetch property posts" });
  // }
};

exports.getAllPosts = async (req, res, next) => {
  try {
    const postList = await Post.find({ list: "1" }).populate({
      path: "userId",
      select: "_id name pic",
    });
    res.send(postList);
  } catch (err) {
    console.log(err);
    res.send({ type: "error", msg: "failed to fetch property lists" });
  }

};
exports.sellPost = async (req, res, next) => {
  console.log('in sell POST--------->',req.body._id);
  try {
   await Post.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(req.body._id)},
      {
        $set: {
          new_owner: req.body.new_owner,
          list:"0"
        },
      },
      { new: true }
    )

     // Call to Blockchain : purchaseProperty function
     const { REToken, MyRealEstate } = await contractInstance.getInstance();
     // console.log('MyRealEstate Methods: ', MyRealEstate.methods);
     let txObj = await contractInstance.getTxObject(0xaEB882cA783fE32F2e58fee2296DD4E17dA7b6ed);
 
     let txReceipt = await MyRealEstate.methods.PurchaseERC20Tokens(100, 0xaEB882cA783fE32F2e58fee2296DD4E17dA7b6ed,"URI", "UPI-ID").send(txObj);
     console.log('TxObj for purchaseERC20 Tokens------', txReceipt);
     let escrowContractAddress = await MyRealEstate.methods.getEscrowContractAddress().call();
      console.log('Escrow Contract Address', escrowContractAddress);
      txReceipt = await REToken.methods.setApprovalForAll(escrowContractAddress, true).send(txObj);

     txReceipt = await REToken.methods.purchaseProperty(1).send(txObj);
     console.log('Tx Receipt for Purchase Property', txReceipt);

  } catch (error) {
    console.log(error);
    res.send({ type: "error", msg: "Failed to Sell" });
  }

  console.log(data);
  res.send({ type: "success", msg: "Sold" });
};
exports.updateLedger =async(req,res) => {
  console.log(req.body._id);
	Ledger.findOneAndUpdate(
		{ _id: mongoose.Types.ObjectId(req.body._id)},
		{
			$set: {
				new_owner: req.body.new_owner,
				list: req.body.list
			},
		},
		{ new: true }
	)
		.then((data) => {
      console.log(data);
			res.send({ type: "success", msg: "Successfully updated Ledger" });
		})
		.catch((err) => {
			console.log(err);
			res.send({ type: "error", msg: "Failed to update the profile" });
		});
};

