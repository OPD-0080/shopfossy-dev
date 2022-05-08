
var statusWrap = document.querySelectorAll(".online-status-wrap");
var statusToggle = document.querySelectorAll(".status-toggle");
var statusText = document.querySelectorAll(".status-text");

function connection_status() {
    if (navigator.onLine) {
        statusToggle.forEach(el => el.classList.add("status"));
        statusText.forEach(el => el.innerText = "Online");
        setTimeout(() => {statusWrap.forEach(el => el.classList.add("slide"))}, 10000);
    }
    else {
        statusToggle.forEach(el => el.classList.remove("status"));
        statusText.forEach(el => el.innerText = "Offline");
        statusWrap.forEach(el => el.classList.remove("slide"))
    }
}

// when WINDOWS loads
//window.onload = () => {connection_status()}

// adding event listener ONLINE and OFFLINE to window
window.addEventListener('online', () => {
    connection_status();
    statusText.forEach(el => el.innerText = "And we're Online")
})
window.addEventListener('offline', () => {
    connection_status();
    statusText.forEach(el => el.innerText = "Hey, you're offline")
})
export {statusToggle, statusText, statusWrap}