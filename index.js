require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const path = require("path")
const app = express();

//Paquere que comunica  api que creamos con el frontend
const cors = require("cors");

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URL);

const noteSchema = new mongoose.Schema({
    title:String,
    content: String
})

const Note = new mongoose.model("note",noteSchema);

app.get("/",(req,res)=>{
    Note.find({},(err,result)=>{
        if(!err){
            if(result){
                res.send(result);
            }
        }
    })
})

app.post("/insert",(req,res)=>{

    const noteTitle= req.body.title
    const noteContent= req.body.content

    const newNote = new Note ({
        title:noteTitle,
        content:noteContent
    })

    Note.create(newNote,(err)=>{
        if(!err){
            console.log("it was succesgfully added");
        }else{
            console.log(err);
        }
    })
    
})

app.delete("/delete/:id",(req,res)=>{
    const id = req.params.id;
   
    
    Note.findByIdAndDelete(id,(err)=>{
        if(err){
            console.log(err);
        }else{
            console.log("SUccesfully deleted");
        }
    })
})

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })
    
}



app.listen(process.env.PORT || 3001,function(){
    console.log("server in 3001 port");
})