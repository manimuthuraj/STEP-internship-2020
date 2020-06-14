var express = require("express")
var router = express.Router();
var camp = require("../models/campschema")

router.get("/", function(req, res) {

    camp.find({}, function(err, allcam) {
        if (err) {
            console.log(err)
        } else {
            res.render("campgrounds/campground", { campgrounds: allcam, currentUser: req.user })
        }
    })
})

router.post("/", isLoggedIn, function(req, res) {
    var name = req.body.name
    var image = req.body.image
    var description = req.body.description
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newcamp = { name: name, image: image, description: description, author: author }
    camp.create(newcamp, function(err, cam) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campground")
        }
    })
})

router.get("/new", isLoggedIn, function(req, res) {
    res.render("campgrounds/new")
})

router.get("/:id", function(req, res) {

    camp.findById(req.params.id).populate("comments").exec(function(err, found) {
        if (err) {
            console.log(err)
        } else {
            res.render("campgrounds/show", { campground1: found })
        }
    })
})

router.get("/:id/edit", checkCampgroundOwnership, function(req, res) {
    camp.findById(req.params.id, function(err, foundCampground) {
        if (err) {
            res.redirect("/campground")
        } else {
            res.render("campgrounds/edit", { campground: foundCampground })
        }
    })

})

router.put("/:id", checkCampgroundOwnership, function(req, res) {
    camp.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
        if (err) {
            res.redirect("/campground")
        } else {
            res.redirect("/campground/" + req.params.id)
        }
    })
})

router.delete("/:id", checkCampgroundOwnership, function(req, res) {
    camp.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            console.log(err)
            res.redirect("/campground")
        } else {
            res.redirect("/campground")
        }
    })

})


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login")
}

function checkCampgroundOwnership(req, res, next) {
    if (req.isAuthenticated()) {
        camp.findById(req.params.id, function(err, foundCampground) {
            if (err) {
                res.redirect("/campground")
            } else {
                if (foundCampground.author.id.equals(req.user._id)) {
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
module.exports = router;