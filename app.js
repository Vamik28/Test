var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var path = require("path");
const mongoose = require("mongoose");
const userRoute = require("./router/user.js");
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
//set view image
app.use("/", express.static("public/"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({extended: true}));
// app.use('/api/admin',admin_router);
// catch 404 and forward to error handler
const c = mongoose.connect("mongodb+srv://vamikshah:QOyH4Adb2FjI4N1c@cluster0.0hcy9vu.mongodb.net/ExamPlatform", {useNewUrlParser: true, useUnifiedTopology: true});
const db =  mongoose.connection;
db.on("error",(error)=>console.log(error));
db.once("open",()=>console.log("DB Connected"));
app.use('/user',userRoute);
app.listen(3000, () => {
  console.log("server start at 3000");
});
