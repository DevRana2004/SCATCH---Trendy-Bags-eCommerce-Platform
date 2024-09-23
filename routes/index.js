// In routes/index.js
const express = require("express");
const router = express.Router();
const isLoggedin = require("../middlewares/isLoggedin");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");

router.get("/", (req, res) => {
    let error = req.flash("error");
    res.render("index", { error });
});
  
router.get("/shop", isLoggedin,async (req, res) => {
   let products= await productModel.find();
   let success =req.flash("success");
    res.render("shop",{products,success});
});
  
router.get("/addtocart/:productid", isLoggedin,async (req, res) => {
    let user = await userModel.findOne({email : req.user.email});
    let productid =req.params.productid;
  
    user.cart.push(productid);
    await user.save();
    req.flash("success","Added to cart");
    res.redirect("/shop");
   
   
   });
//user.cart.push(req.params.productid);
  
router.get("/cart", isLoggedin, async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.user.email }).populate('cart');

        // Calculate bills for each cart item
        let bills= user.cart.map(item => (item.price * ( 100 - item.discount)) / 100);

        res.render('cart', { user, bills });
    } catch (err) {
        console.error(err);
        req.flash("error", "An error occurred while fetching the cart.");
        res.redirect("/shop");
    }
});

router.post("/deletee/:productid", isLoggedin, async (req, res) => {
    try {
        let productid = req.params.productid;

        // Find the user
        let user = await userModel.findOne({ email: req.user.email });

        if (!user) {
            req.flash("error", "User not found");
            return res.redirect("/cart");
        }

        // Remove the product ID from the user's cart
        user.cart.pull(productid);

        // Save the updated user
        await user.save();

        req.flash("success", "Product removed from cart");
        res.redirect("/cart");
    } catch (err) {
        console.error('Error removing product from cart:', err);
        req.flash("error", "An error occurred while removing the product from the cart");
        res.redirect("/cart");
    }
});
//user.cart.pull(req.params.productid)
 
module.exports = router;
