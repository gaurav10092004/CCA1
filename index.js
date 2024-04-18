var express = require('express');
var bodyParser=require("body-parser")
const mongoose = require('mongoose');

const app=express()

app.use(bodyParser.json())
app.use(express.static("public"))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect("mongodb://localhost:27017/task_mamangement")
var db = mongoose.connection
db.on("error",()=> console.log("error inn mongo"))
db.once("open",()=> console.log("connected"))

app.post("/sign_up",(req,res)=>{
    var name = req.body.name
    var age=req.body.age
    var email=req.body.email

    var data={
        "name":name,
        "age":age,
        "email":email
    }
    db.collection("user").insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("successfully stored")
    })
    return res.redirect("todo.html")
})
app.get("/",(req,res) => {
    res.set({
        "Allow-acces-Allow-Origin":'*'
    })
    return res.redirect("index.html")
}).listen(3000);

console.log("listening")