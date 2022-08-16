//
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/public/sw.js')
    .then((res) => {
        console.log("Service Worker is Registered", res);
    })
    .catch((error) => {
        if (error) {
            const errorEl = document.querySelector(".err-text");
            errorEl.innerHTML = "Recommendation: use 'Chrome' or 'Safari' !";

        }
    })
}