nos = 6
var color = generatecolor(nos);
var x = document.querySelectorAll(".squ")
var selected = sele();
var cd = document.getElementById("CD")
cd.textContent = selected
text = document.getElementById("text")
var h1 = document.querySelector("h1")
var set = document.getElementById("set")

var easy = document.getElementById("easy")
var easy = document.getElementById("easy")

for (i = 0; i < color.length; i++) {
    x[i].style.backgroundColor = color[i]

    x[i].addEventListener("click", function() {
        if (this.style.backgroundColor == selected) {
            text.textContent = "won"
            colorchange(selected)
            h1.style.backgroundColor = selected
            set.textContent = "Paly again"
        } else {
            this.style.backgroundColor = "black"
            text.textContent = "try again"
        }
    })
}

function colorchange(change) {
    for (i = 0; i < color.length; i++) {
        x[i].style.backgroundColor = change
    }
}

function sele() {
    var random = Math.floor(Math.random() * color.length);
    return color[random];
}

function generatecolor(num) {
    var arr = []
    for (var i = 0; i < num; i++) {
        arr.push(randomColor())
    }
    return arr;
}

function randomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}

set.addEventListener("click", function() {
    color = generatecolor(nos)
    selected = sele();
    cd.textContent = selected
    for (i = 0; i < color.length; i++) {
        x[i].style.backgroundColor = color[i]
    }
    h1.style.backgroundColor = "blueviolet"
})
easy.addEventListener("click", function() {
    easy.classList.add("buttons")
    hard.classList.remove("buttons")
    nos = 3;
    color = generatecolor(nos)
    selected = sele();
    cd.textContent = selected;
    for (var i = 0; i < x.length; i++) {
        if (color[i]) {
            x[i].style.backgroundColor = color[i];
        } else {
            x[i].style.display = "none";
        }
    }

})
hard.addEventListener("click", function() {
    hard.classList.add("buttons")
    easy.classList.remove("buttons")
    nos = 6
    color = generatecolor(nos)
    selected = sele();
    cd.textContent = selected;
    for (var i = 0; i < x.length; i++) {

        x[i].style.backgroundColor = color[i];
        x[i].style.display = "block"
    }
})