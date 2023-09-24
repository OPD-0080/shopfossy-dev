const webPush = require("web-push");
require("dotenv").config();


webPush.setVapidDetails("mailTo: opd@gmail.com", `${process.env.WEBPUSH_PUBLIC_KEYS}`, `${process.env.WEBPUSH_PRIVATE_KEYS}`)

const pushNotification = (req, res) => {
    const subscriber = req.body;

    // destructure data 
    const endPoint = subscriber.endpoint;
    const key = subscriber.keys.p256dh;
    const auth = subscriber.keys.auth;

    const data = {endPoint, key, auth};
    // ....
    console.log(data);

    // send to server for storage
    
    // ....
    const payload = JSON.stringify({title: "Shopfossy"})
    // send Notification to service worker
    webPush.sendNotification(subscriber, payload).catch(err => {console.log("web push error:", err);})
    // ...
}
module.exports = { pushNotification }