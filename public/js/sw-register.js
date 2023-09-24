//
(async function(){
    const publicVapidKey = 'BJ1aJWRskCNB3bviPrJ6hXRrpAVQmeUB0xswiyp7ZZMrvQNUXTGcW9w0Hy7tzEkoVfW7hAfSoZNrllf1Bmxrrow'

    if ('serviceWorker' in navigator) {
        try {
            // REGISTRATION OF SERVICE WORKER FILE
            const registration = await navigator.serviceWorker.register('../sw.js');
            console.log("service worker registration:", registration);
            // ....
            

            
            // REGISTRATION OF PUSH MANAGER WITH SERVICE WORKER
            /*const subscription = await registration.pushManager.getSubscription()
            console.log(subscription);*/

           /* if (subscription == null || subscription == undefined) {
                console.log("request notification permission");

                const isPermission = await Notification.requestPermission();
                if (isPermission == "granted") {
                    console.log("Request permission:", isPermission);
                    //console.log(urlBase64ToUnit8Array(publicVapidKey));
                    
                    const subscriber = await registration.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: urlBase64ToUnit8Array(publicVapidKey) // convert the public
                    })
                    console.log("subscriber details:", subscriber);
                    sendDatToServer(subscriber)
                }
                
            }else {
                console.log("already subscribe fro notification");
                // get the subscription data and send to server to store
                const subscriber = await registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUnit8Array(publicVapidKey) // convert the public
                })
                console.log("subscriber details:", subscriber);
                sendDatToServer(subscriber)
                // ....
            }*/
        } catch (error) {
            if (error) {
                const errorEl = document.querySelector(".err-text");
                errorEl.innerHTML = "Recommendation: use 'Chrome' or 'Safari' !";
    
            }
        }
    }

    function urlBase64ToUnit8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/');
    
        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);
    
        for (let i = 0; i < rawData.length; i++) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    };
    function sendDatToServer(subscriber) {
        fetch("/subscriber", {
            method: "POST",
            body: JSON.stringify(subscriber),
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
})();