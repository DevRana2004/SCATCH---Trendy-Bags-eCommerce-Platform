const express =require('express');
const app=express();
const cookieParser = require("cookie-parser");
const path=require("path");

const db=require("./config/mongoose-connection")

const ownersRouter = require("./routes/ownerRouter")
const userRouter = require("./routes/userRouter")
const productRouter = require("./routes/productRouter")

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"public")));

app.set("view engine","ejs");

app.get("/",(req,res)=>{
    res.send("yelloe mr iayyar")
})

app.use("/owners",ownersRouter);
app.use("/users",userRouter);
app.use("/products",productRouter);


app.listen(3000);
