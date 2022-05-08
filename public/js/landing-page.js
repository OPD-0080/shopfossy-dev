// Declaring Variables
const landingContainer = document.querySelector(".landing-container");
const landing = document.querySelector(".loading");
window.onload = () => {
    setTimeout(() => {
        fadeOut()
    }, 600);
    setTimeout(() => {
        landingReset()
    }, 1000);
}

function landingReset() {
    landingContainer.classList.add("active")
}
function fadeOut() {
    landingContainer.classList.add("close")
}