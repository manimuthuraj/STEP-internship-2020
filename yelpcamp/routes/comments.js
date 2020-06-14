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

router.get("/:comment_id/edit", checkCommentOwnership, function(req, res) {
    Comment.findById(req.params.comment_id, function(err, foundComments) {
        if (err) {
            res.redirect("/campground")
        } else {
            res.render("comments/edit", { campground_id: req.params.id, comment: foundComments })
        }
    })
})

router.put("/:comment_id", checkCommentOwnership, function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
        if (err) {
            res.redirect("/campground")
        } else {
            res.redirect("/campground/" + req.params.id);
        }
    })
})

router.delete("/:comment_id", checkCommentOwnership, function(req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function(err) {
        if (err) {
            res.redirect("/campground")
        } else {
            res.redirect("/campground/ " + req.params.id)
        }
    })
})

function checkCommentOwnership(req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            if (err) {
                res.redirect("/campground")
            } else {
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.send("/campground")
                }
            }
        })
    } else {
        res.redirect("/campground")
    }
}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login")
}

module.exports = router;