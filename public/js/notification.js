const notificationContainer = document.querySelector(".verification-alert-wrap");
const notification_text = notificationContainer.querySelector(".v-text");
const verifyBtn = notificationContainer.querySelector(".verify-btn");

if (notification_text.innerHTML.search("Please SignIn") == 0) {
    verifyBtn.innerHTML = "SignIn";
    notificationContainer.classList.add("collapse")
    verifyBtn.onclick = (e) => {
        window.location.assign("register")
    }
}else if (notification_text.innerHTML.search("Please SignIn") == -1) {
    notificationContainer.classList.remove("collapse")
}