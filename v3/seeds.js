var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {   name: "Oregon Campground",
        image: "https://img.sunset02.com/sites/default/files/styles/4_3_horizontal_-_1200x900/public/image/2016/10/main/hoodview-campground-0510.jpg?itok=xo0RuR6u",
        description: "Campground in oregon"
    },
    {   name: "Wild Willy Hotsprings",
        image: "http://ift.tt/1LHNiQl",
        description: "Campground in California"
    },
    {   name: "Bear Rocks",
        image: "http://ift.tt/1LHNiA1",
        description: "Campground in West Virginia"
    }
];

function seedDB(){
    //Remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("campground removed.");
            //add few campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err);
                    } else{
                        console.log("added campground.")
                        //create comment
                        Comment.create(
                            {
                                text: "text part of the comment",
                                author: "sk"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else{
                                    campground.comments.push();
                                    campground.save();
                                    console.log("added comment.");
                                }
                            }
                        );
                    }
                }); 
            });
            
        }
    });
}

module.exports = seedDB;