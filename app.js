const express =require('express');
const app=express();
const cookieParser = require("cookie-parser");
const path=require("path");
require("dotenv").config(); /// with use of it jitne bhi variable "env" mai hai and config mai process.env.JWT_KEY use me aajeyenge uuko ham further use kar sakte hai
// npm i dotenvN
const db=require("./config/mongoose-connection")  //  ye  db coonection he jo me config mese exports kiya hai

const ownersRouter = require("./routes/ownerRouter")
const userRouter = require("./routes/userRouter")
const productRouter = require("./routes/productRouter")
const indexRouter = require("./routes/index"); /// galti thi

///////////////////////////////////////////////////////////////////////

const flash = require("connect-flash");
const expressSession = require("express-session");

app.use(
    expressSession({
        resave: false,
        saveUninitialized: false,
        secret: process.env.EXPRESS_SESSION_SECRET,
    })
)
app.use(flash());

/////////////////////////////////////////////////////////////////////////////



app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"public")));

app.set("view engine","ejs");

                                    // this is a end point //owner se related sari information ko ownerRouter pe bhej do
                                 // endpoints allows clients to perform different actions related to products.
app.use("/owners",ownersRouter);    //Each router handles requests to its specific endpoint (/owners, /products).
app.use("/users",userRouter);   // this is a end point  //users se related sari information ko userRouter pe bhej do
app.use("/products",productRouter);   // this is a end point //product se related sari information ko productRouter pe bhej do
app.use("/",indexRouter);// galti thi

app.listen(3000);
