const express=require("express")
const body=require("body-parser")
const app=express()
app.set('view engine', 'ejs');
app.use(body.urlencoded({extended:true}))
app.use(express.static("public"))

var list=[]

app.get("/",function(req,res){
    res.render('index',{tasks:list})
})

app.post("/", function(req,res){
    var task=req.body.task
    console.log(task)
    list.push(task)
    res.redirect("/")
})

app.listen(process.env.PORT ||3001,function(){
    console.log("sever is up and running")
})