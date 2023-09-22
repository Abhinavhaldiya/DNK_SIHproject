const express=require("express");
const app=express();
const mongoose=require("mongoose");

const multer=require('multer');

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        return cb(null,"./uploads");
    },
    filename:function(req,file,cb){
        return cb(null,`${Date.now()}-${file.originalname}`);
    }
})
const upload=multer({storage});

const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect("mongodb+srv://abhinav01122004:CC2FizMCA8Uxd30P@cluster0.392tj0n.mongodb.net/sih",{useNewUrlParser:true},{useUnifiedTopology:true});

const notesSchema={
    name:String,
    description:String,
    price:Number,
    categories:String,
    color:String,
    image:String
}
const Note=mongoose.model("Note",notesSchema);

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",upload.single("image"),function(req,res){
    let newNote=new Note({
        name:req.body.name,
        description:req.body.description,
        categories:req.body.categories,
        color:req.body.color,
        price:req.body.price,
        image:req.file.path,
    })
    newNote.save();
    res.redirect("/");
})
 
app.listen(4000,function(){
    console.log("server is running on 4000");
})