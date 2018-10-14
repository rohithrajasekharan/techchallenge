
const router = require('express').Router();
const mongoose = require('mongoose');
const Store = require('../models/store-model');
const User = require('../models/user-model');
const Review = require('../models/review-model');
const Order = require('../models/order-model');

router.post('/availablepoints',(req,res)=>{
  Order.find({userId:req.body.userId, points: {$gt: 0}, redeemed: false}).then(resp=>{
    res.json(resp);
  })
})

router.post('/redeempoints',(req,res)=>{
  var points = parseInt(req.body.points)
  User.findOneAndUpdate({"_id": req.body.userId}, {$set: {points: req.body.points}},{new:true} ).then((resp)=>{
    Order.findOneAndUpdate({"_id": req.body.orderId}, {$set: {redeemed: true}},{new:true} ).then((resp)=>{
    if (resp.points==points) {
      res.send("points updated")
    }else{
      res.send("cannot update points")
    }
  })
  })
})

router.post('/search',(req,res)=>{
    Store.find({$text: {$search: req.body.keyword}}, {score: {$meta: "textScore"}}).sort({score:{$meta:"textScore"}}).then((response)=>{
      res.json(response);
    })

})
router.post('/enroll',(req,res)=>{
    User.updateOne({"_id":req.body.userId},{$push:{enrolled: req.body.companyId}},{new:true}).then((resp)=>{
      res.json(resp)
    })
})
router.post('/addreview',(req,res)=>{
  let name = req.body.name;
  let productId = req.body.productId;
  let review = req.body.review;
  let newReview = new Review({
    name: name,
    productId: productId,
    review: review
  });
  newReview.save().then((resp)=>{
    res.json(resp);
  })
})
router.post('/getreviews',(req,res)=>{
  Review.find({productId:req.body.productId}).then((resp)=>{
    res.json(resp);
  })
})
module.exports = router;
