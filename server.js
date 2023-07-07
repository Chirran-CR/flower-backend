const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());

mongoose.set("strictQuery", false);
//mongoose connection

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const User = new mongoose.model("User", userSchema)

app.post("/login",(req,res)=>{
    const {email,password} =req.body;
    User.collection.findOne({email:email},(err,user)=>{
        if(user){
           if(password === user.password){
               res.send({message:"login sucessfull",error:false,user:user})
           }else{
               res.send({message:"wrong credentials",error:true})
           }
        }else{
            res.send({message:"User is not registered",error:true})
        }
    })
});
app.post("/register",(req,res)=>{
    const {name,email,password} =req.body;
    User.findOne({email:email},(err,user)=>{
        if(user){
            res.send({message:"user already exist"})
        }else {
            const user = new User({name,email,password})
            user.save(err=>{
                if(err){
                    res.send(err)
                }else{
                    res.send({message:"Registration sucessfull"})
                }
            })
        }
    })


}) 

app.listen(4000,()=>{
    console.log("started")
})
