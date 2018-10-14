
const router = require('express').Router();
const mongoose = require('mongoose');
const Store = require('../models/store-model');


router.get('/search',(req,res)=>{
    Store.find({$text: {$search: req.query.keyword}}, {score: {$meta: "textScore"}}).sort({score:{$meta:"textScore"}}).then((response)=>{
      res.json(response);
    })

})

module.exports = router;
