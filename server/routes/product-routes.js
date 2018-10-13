const express = require('express');
const router = express.Router();
const Cart = require('../models/cart-model')
const Product = require('../models/product-model');

//request to add items to cart
router.post('/addtocart', (req,res)=>{
  let cart = new Cart({
    userId : req.body.userId,
    productId : req.body.productId,
    quantity: req.body.quantity
  });
  cart.save().then((resp)=>{
  res.send("added to cart");
}
)
})

//request to get no. of orders in cart
router.post('/cart/count',(req,res)=>{
    Cart.find({userId:req.body.id}).count().then((resp)=>{
      res.json(resp)
    })
  })

//request to remove item from cart
  router.post('/removefromcart',(req,res)=>{
    var userid=req.body.userid;
    var productid=req.body.productid;
    Cart.deleteOne({userId:userid, productId: productid}, (err, product)=>{
      if (err) {
        res.send("product not deleted");
      }else{
        res.send("product removed");
      }
    })
  })

//request to update no. of items of an order in cart
  router.post('/addquantity',(req,res)=>{
    var quantity = parseInt(req.body.quantity)
    Cart.findOneAndUpdate({"userId": req.body.userid, "productId": req.body.productid}, {$set: {quantity: req.body.quantity}},{new:true} ).then((resp)=>{
      if (resp.quantity==quantity) {
        res.send("quantity updated")
      }else{
        res.send("cannot update quantity")
      }
    })
  })
