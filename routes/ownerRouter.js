const express = require('express');
const router = express.Router();
const ownerModel = require('../models/owners-model');

// Root route
// router.get("/", function(req, res) {
//     res.send("it is ownerRouter");
// });

// Conditional route based on environment
if (process.env.NODE_ENV === "development") {    //if devlopment mode mai toh tabhi execute karo below code       // $env:NODE_ENV="development"  // node app.js      
    // router.post("/create", async function(req, res) {
    const create = async (req,res)=>{
        try {
            let owners = await ownerModel.find(); // Fetch existing owners

            if (owners.length > 0) {
                return res.status(403).send("You don't have permission to create a new owner");
            }

            let { fullname, email, password, gstin } = req.body;

            let createOwner = await ownerModel.create({
                fullname,
                email,
                password,
                gstin
            });

            res.status(201).send(createOwner);
        } catch (error) {
            res.status(500).send("Server error occurred");
        }
    // });
    };
    router.post("/create",create);

}

router.get("/admin",function(req,res){
  let success= req.flash("success")              /// like error
res.render("createproducts",{success});
;})


module.exports = router;