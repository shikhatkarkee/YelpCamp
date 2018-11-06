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
    image:String
});

var Campground = mongoose.model("Campground", campgroundSchema);

//landing page
app.get("/", function(req, res){
   res.render("landing")
});

//camgrounds page
app.get("/campgrounds", function(req, res){
    //find all campgrounds from db and then render it
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err)
        } else {
            res.render("campgrounds", {campgrounds:allCampgrounds});
        }
    })
    //
});

//posting campgrounds
app.post("/campgrounds", function(req, res){
    //get data from form and add it to campground database
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    Campground.create(newCampground, function(err, createdCampground){
        if (err){
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

//
app.get("/campgrounds/new", function(req, res) {
    res.render("new"); 
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server of YelpCamp started.");
});

