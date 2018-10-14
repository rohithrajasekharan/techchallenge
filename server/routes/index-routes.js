
const router = require('express').Router();
const mongoose = require('mongoose');
const Store = require('../models/store-model');
const User = require('../models/user-model');

router.get('/search',(req,res)=>{
    Store.find({$text: {$search: req.query.keyword}}, {score: {$meta: "textScore"}}).sort({score:{$meta:"textScore"}}).then((response)=>{
      res.json(response);
    })

})
router.post('/enroll',(req,res)=>{
    User.updateOne({"_id":req.body.userId},{$push:{enrolled: req.body.companyId}},{new:true}).then((resp)=>{
      res.json(resp)
    })
})

module.exports = router;
