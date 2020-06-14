var express = require("express");
const { route } = require("./campground");
var router = express.Router({ mergeParams: true });
var camp = require("../models/campschema")
var Comment = require("../models/comment");
const comment = require("../models/comment");

router.get("/new", isLoggedIn, function(req, res) {
    camp.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err)
        } else {
            res.render("comments/new", { campground: campground })
        }
    })
})


router.post("/", isLoggedIn, function(req, res) {
    camp.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err)
            res.redirect("/campground")
        } else {
            Comment.create(req.body.comment, function(err, Comment) {
                if (err) {
                    console.log(err)
                } else {
                    Comment.author.id = req.user._id;
                    Comment.author.username = req.user.username
                    Comment.save();
                    campground.comments.push(Comment)
                    campground.save();
                    res.redirect("/campground/" + campground._id)
                }
            })
        }
    })
})

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login")
}

module.exports = router;