var alertEl = document.querySelector(".server_alert");
var formWrapper = document.querySelector(".form-wrapper");
var requestAuthEl = formWrapper.querySelector(".request-signIn-page");

if (alertEl !== null) {
    const server_alert = alertEl.querySelector(".user-alert");
    const error_message = server_alert.querySelector(".error");

    setTimeout(() => {
        server_alert.classList.add("on");
    }, 2000);
    setTimeout(() => {
        error_message.innerHTML = "Processing Invoice ...!"
    }, 6000);
    setTimeout(() => {
        server_alert.classList.remove("on");
    }, 10000);
    
    setTimeout(() => {
        window.location.assign("./thankyou")
    }, 11000);
} else {
    console.log("Awaiting server for notification render!");
}
const authStatus = requestAuthEl.getAttribute("data-authStatus");
if (authStatus == "User authenticated") {
    requestAuthEl.classList.remove("show");
}else if (authStatus == "User not authenticated") {
    requestAuthEl.classList.add("show");
}
