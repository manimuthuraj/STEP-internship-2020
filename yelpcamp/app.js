var express = require("express");
var app = express();
var methodOverride = require("method-override")
app.use(methodOverride("_method"))
app.set("view engine", "ejs");
app.use(express.static("partials"));
app.use(express.static(__dirname + "/public"));
var bodyp = require("body-parser")
var mongoose = require("mongoose")
var passport = require("passport")
LocalStrategy = require("passport-local")
var camp = require("./models/campschema")
var Comment = require("./models/comment")
var User = require("./models/user")
mongoose.connect("mongodb+srv://yelp:yelp@cluster0-lfy4s.mongodb.net/yelp?retryWrites=true&w=majority", { useNewUrlParser: true })
app.use(bodyp.urlencoded({ extended: true }));
var seedDb = require("./seeds.js")
    //seedDb();

var commentRoutes = require("./routes/comments")
var campgroundRoutes = require("./routes/campground")
var indexRoutes = require("./routes/index")

app.use(require("express-session")({
    secret: "Rusty is best",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
})

app.use(indexRoutes)
app.use("/campground", campgroundRoutes)
app.use("/campground/:id/comments", commentRoutes)

app.listen(3000, function() {
    console.log("started")
})