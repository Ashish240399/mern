const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const cors=require("cors");
const path=require("path");
const  mongoose  = require("mongoose");
const port=process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(cors());
mongoose.connect("mongodb+srv://Ashish7797:Ashish7797@cluster0.3get3.mongodb.net/MoviesDB?retryWrites=true&w=majority")
const moviesSchema={
    title:{type:String},
    date:{type:String}
}
const Movie = mongoose.model("movie",moviesSchema)
app.get("/movies",(req,res)=>{
    Movie.find().then(movies=>res.json(movies))
})
app.post("/newmovie",(req,res)=>{
    const title=req.body.title;
    const date=req.body.date;
    const newMovie=new Movie({
        title,
        date
    })
    newMovie.save();
})
app.delete("/delete/:id",(req,res)=>{
    const id=req.params.id;
    Movie.findByIdAndDelete({_id:id},function(err){
        if(!err){
            console.log("deleted")
        }
        else{
            console.log(err)
        }
    })
})
if(process.env.NODE_ENV==="production"){
    app.use(express.static("mern-practice/build"))
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'mern-practice','build','index.html'))
    })
}
app.listen(port,()=>{
    console.log("Listening to express")
})