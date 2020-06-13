var age = Number(prompt("Whats your age?"));
if (age > 0) {
    var day = age * 365;
    alert(age + "years is roughly " + day + " days");
} else
    alert("Enter valid age")