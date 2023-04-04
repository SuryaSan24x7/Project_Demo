const mongoose = require('mongoose');
const Post = require("../models/Post");
const User = require("../models/User");
const contractInstance = require("../helpers/getContractInstance");


exports.createPost = async (req, res) => {
  try {
    var data = {
      //userId: req.user._id,
      postName: req.body.postName,
      postMarks: req.body.postMarks,
      postAdmin: req.body.postAdmin,
      userAddress: req.body.userAddress,
      fromAddress: req.body.fromAddress
    };
    
    console.log('data',data);
    // Call to Blockchain 
    const { Erc20 } = await contractInstance.getInstance();
    let txObj = await contractInstance.getTxObject(data.fromAddress);
console.log('txObj',txObj);
    let txReceipt = await Erc20.methods.transfer(data.userAddress, req.body.postMarks).send(txObj);
    console.log('Transaction Hash : ', txReceipt.transactionHash);
    console.log('Block Number : ', txReceipt.blockNumber);
    let returnValue = txReceipt.events.Transfer.returnValues._value;
    let returnValueAddress = txReceipt.events.Transfer.returnValues._to;
    let returnValueId = txReceipt.events.Transfer.returnValues._id;
    console.log('Events',txReceipt.events.Transfer.returnValues);
    data['TokenCount'] = returnValue;
    const post = new Post(data);
    console.log(data);
    
    let balance = await Erc20.methods.balanceOf(returnValueAddress).call();
    
    await post.save();
    res.send({ type: "success", msg: "post created successfully" });
  } catch (err) {
    console.log(err);
    res.send({ type: "danger", msg: "failed to save post" });
  }
};

exports.getPosts = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    let idList = user.posts.map((item) => item.userId);
    idList.unshift(req.user._id);
    const postList = await Post.find({ userId: { $in: idList } }).populate({
      path: "userId",
      select: "_id name TokenCount",
    });
    res.send(postList);
  } catch (err) {
    console.log(err);
    res.send({ type: "error", msg: "failed to fetch Student lists" });
  }
  
};

exports.getAllPosts = async (req, res, next) => {
  try {
    const postList = await Post.find({ list: "1" }).populate({
      path: "userId",
      select: "_id name TokenCount",
    });
    res.send(postList);
  } catch (err) {
    console.log(err);
    res.send({ type: "error", msg: "failed to fetch student lists" });
  }

};
