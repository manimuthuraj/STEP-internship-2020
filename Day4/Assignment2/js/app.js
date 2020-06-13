function print(arry) {

    for (var i = arry.length - 1; i >= 0; i--) {
        console.log(arry[i])
    }

}
print([1, 2, 3, 4])

//uniform
function uniform(arr) {
    var first = arr[0]
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] !== first) {
            return false;
        }
    }
    return true;
}

//sum
function sum(num) {
    c = 0;
    for (var i = 0; i < num.length; i++) {
        c += num[i];

    }
    return c;

}
//max
function max(arr) {
    var max = arr[0]
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}