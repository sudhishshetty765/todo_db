const express=require("express")
const body=require("body-parser")
const mongoose=require("mongoose")
const app=express()
app.set('view engine', 'ejs');
app.use(body.urlencoded({extended:true}))
app.use(express.static("public"))

mongoose.connect("mongodb+srv://Sudhish:sudhi@358@cluster0.x0gpcdm.mongodb.net/todo_db",{useNewUrlParser:true})

const todoschema=new mongoose.Schema({task:String})
const todomodel=mongoose.model("tasks",todoschema)
//const t1=new todomodel({task:"gaming"})
//const t2=new todomodel({task:"studying"})
//const t3=new todomodel({task:"playing"})
//t2.save()
//t3.save()
//t1.save()
var lists=[]

app.get("/",function(req,res){
    todomodel.find().then((result) => {
        res.render('index',{tasks:result})
    
    }).catch((err) => {
        console.log(err)
    });

})

app.post("/", function(req,res){
var todotask=req.body.task
//console.log(task)
//list.push(task)
const task=new todomodel({task:todotask})

task.save()

res.redirect("/")
})

app.post("/delete",function(req,res){
    var item=req.body.checkbox
    todomodel.deleteOne({_id:item}).then((result) => {
        res.redirect("/")
        
    }).catch((err) => {
        console.log(err)
        
    });
})

app.listen(process.env.PORT ||3001,function(){
    console.log("sever is up and running")
})
