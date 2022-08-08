//
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/public/sw.js')
    .then((res) => console.log("Service Worker is Registered", res))
    .catch((error) => {
        console.log(`Service Worker Error: ${error}`);
    })
}