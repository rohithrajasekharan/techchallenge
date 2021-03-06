const express = require('express');
const router = express.Router();
const Cart = require('../models/cart-model');
const Order = require('../models/order-model');
const User = require('../models/user-model');
const Product = require('../models/product-model');
const Store = require('../models/store-model');

//to add dummy store details via postman
router.post('/addstore',(req,res)=>{
  let name = req.body.name;
  let location = req.body.location;
  let newStore = new Store({
    name: name,
    location: location
  });
  newStore.save().then((resp)=>{
    res.json(resp);
  })
})

//to add dummy item details via postman
router.post('/additem',(req,res)=>{
  let name = req.body.name;
  let companyId = req.body.companyId;
  let price = req.body.price;
  let description = req.body.description;
  let image = req.body.image;
  let offer = req.body.offer;
  let points = req.body.points;
  let newProduct = new Product({
    name: name,
    companyId: companyId,
    price: price,
    description: description,
    image: image,
    offer: offer,
    points: points
  });
  newProduct.save().then((resp)=>{
    res.json(resp);
  })
})

//request to add items to cart
router.post('/addtocart', (req,res)=>{
  let cart = new Cart({
    userId : req.body.userId,
    productId : req.body.productId,
    quantity: 1
  });
  cart.save().then((resp)=>{
  res.send("added to cart");
}
)
})
router.post('/order', (req,res)=>{
  let order = new Order({
    userId : req.body.userId,
    productId : req.body.productId,
    quantity: 1,
    redeemed: false
  });
  order.save().then((resp)=>{
  res.send("added to orders");
}
)
})

//request to get no. of orders in cart
router.post('/cart/count',(req,res)=>{
    Cart.find({userId:req.body.id}).countDocuments().then((resp)=>{
      res.json(resp)
    })
  })

  router.post('/cart',(req,res)=>{
      Cart.find({userId:req.body.id}).populate('productId').then((resp)=>{
        res.json(resp)
      })
    })
    router.post('/order',(req,res)=>{
        Order.find({userId:req.body.id}).populate('productId').then((resp)=>{
          res.json(resp)
        })
      })

//request to remove item from cart
  router.post('/removefromcart',(req,res)=>{
    Cart.deleteOne({_id:req.body.id}, (err, item)=>{
      console.log(req.body.id);
      console.log(err, item);
        res.send('deleted')
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

  router.post('/list',(req,res)=>{
    Product.find({ 'companyId': req.body.companyId }).populate('companyId').then((resp)=>{
      res.json(resp);
    })
  })

  module.exports = router;
