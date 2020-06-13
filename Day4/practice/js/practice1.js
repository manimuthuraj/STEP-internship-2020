//functions
function isEven(a) {
    if (a % 2 === 0) {
        return true;
    } else {
        return false;
    }
}

document.write(isEven(6))

//factorial
function factorial(b) {
    result = 1;
    for (i = 1; i <= b; i++) {
        result = result * i;
    }
    return result;
}
document.write(factorial(4))
    //kebab
function kebab(str) {
    var d = str.replace(/-/g, "_")
    document.write(d);
}
kebab("h-i-")

//
var h = 6

function f() {
    var r = 5;
    document.write(h)
}
f();

function sing() {
    document.write("hi");
}
//setInterval(sing,1000

var color = [1, 3, 88, 8]
document.write(color)
color.push(99)
document.write(color)
color.pop(99)
document.write(color)
color.unshift(5)
document.write(color)
document.write(color.indexOf(5))
document.write(color[color.length])