var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");


mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

//setting up schema
var campgroundSchema = new mongoose.Schema({
    name:String,
    image:String,
    description:String
});

var Campground = mongoose.model("Campground", campgroundSchema);

//landing page
app.get("/", function(req, res){
   res.render("landing")
});

//camgrounds page
app.get("/index", function(req, res){
    //find all campgrounds from db and then render it
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err)
        } else {
            res.render("index", {campgrounds:allCampgrounds});
        }
    })
    //
});

//posting campgrounds
app.post("/index", function(req, res){
    //get data from form and add it to campground database
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = {name: name, image: image, description:description};
    Campground.create(newCampground, function(err, createdCampground){
        if (err){
            console.log(err);
        } else {
            res.redirect("/index");
        }
    });
});

//Form to create new campground
app.get("/index/new", function(req, res) {
    res.render("new"); 
});

//
app.get("/index/:id", function(req, res) {
//find campground with id
Campground.findById(req.params.id, function(err, foundCampground){
    if(err){
        console.log(err);
    } else {
        res.render("show", {campground:foundCampground});
    }
});

//render found campground
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server of YelpCamp started.");
});