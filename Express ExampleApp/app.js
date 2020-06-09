var express = require("express")
var app = express();

app.get("/", function(req, res) {
    res.send("Hi, There Wellcome");
})

app.get("/speak/:animal", function(req, res) {
    var animals = req.params.animal.toLowerCase();
    var sounds = {
        pig: "bllal",
        dog: "uhuhff",
        cat: "meow",
        cow: "moo"
    }
    var sound = sounds[animals]
    res.send("The " + animals + " says '" + sound + "'");
})

app.get("/repeat/:msg/:time", function(req, res) {
    var msg = req.params.msg
    var time = Number(req.params.time)
    var result = ""
    for (var i = 0; i < time; i++) {
        result += msg + " "
    }
    res.send(result)
})

app.get("*", function(req, res) {
    res.send("Sorry,page not found");
})

app.listen(3000, function() {
    console.log("started")
})