
var timeLeft = 100;
var downloadTimer = setInterval(() => {
    var e, 
    e = 100 - timeLeft;
    timeLeft -= 1; // continue to subtract in iteration 
    //console.log(e);

    var i1 = document.querySelector(".database-icon1");
    var i2 = document.querySelector(".database-icon2");
    var banner = document.querySelector(".database-banner");

    if (timeLeft <= 0) {
        clearTimeout(downloadTimer);
    }
    if ((e == 5) || (e == 10) || (e == 15) || (e == 20) || (e == 25) || (e == 30) || (e == 35) || (e == 40) || (e == 45) || (e == 50) || (e == 55) || (e == 60) || (e == 65) || (e == 70) || (e == 75) || (e == 80) || (e == 85) || (e == 90) || (e == 95) || (e == 100)) {
        animate(i1, i2, banner)
    }
}, 5000);
/*
function cal(timeLeft, e) {
    var e = 5 - timeLeft;
    timeLeft -= 1;
}
*/
function animate(i1, i2, banner) {
    i1.classList.add("i1-active");
    i2.classList.add("i2-active");
    banner.classList.add("banner-active");
    //banner.classList.add("banner-active");
    setTimeout(() => {
        i1.classList.remove("i1-active");
        i2.classList.remove("i2-active");
        banner.classList.remove("banner-active");
    }, 2000);
}
