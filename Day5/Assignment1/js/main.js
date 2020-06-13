var button1 = document.getElementById("b1");
var button2 = document.getElementById("b2");
var r = document.getElementById("Reset");
var h1 = document.querySelector("#s");
var h2 = document.querySelector("#s2");
var p = document.querySelector("#spn")
var p1s = 0;
var p2s = 0;
var go = false
var inp = document.querySelector("input");
var win = 5

button1.addEventListener("click", function() {
    if (!go) {
        p1s++;
        if (p1s === win) {
            h1.classList.add("warn")
            go = true
        }
        h1.textContent = p1s
    }
})
button2.addEventListener("click", function() {
    if (!go) {
        p2s++
    }
    if (p2s === win) {
        h2.classList.add("warn")
        go = true;
    }
    h2.textContent = p2s
})
r.addEventListener("click", function() {
    p1s = 0
    p2s = 0
    h1.textContent = 0
    h2.textContent = 0
    h1.classList.remove("warn")
    h2.classList.remove("warn")
    go = false
})
inp.addEventListener("change", function() {
    p.textContent = inp.value
    win = Number(inp.value);
    reset();

})