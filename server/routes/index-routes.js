
const router = require('express').Router();
const mongoose = require('mongoose');
const Store = require('../models/store-model');
const User = require('../models/user-model');
const Review = require('../models/review-model');

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
