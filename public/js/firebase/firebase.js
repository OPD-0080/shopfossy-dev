var admin = require("firebase-admin");

var serviceAccount = require("../json/main-categories/items-name-1/backup.json");

admin.initializeApp({
credential: admin.credential.cert(serviceAccount),
databaseURL: "https://klevatin-business-default-rtdb.firebaseio.com"
});

const fireStore = admin.firestore();
const path = require("path");
const fs = require("fs");
const directoryPath = path.join(_dirname, "files");

fs.readdir(directoryPath, (err, files) => {
    if (err) {
        return console.log("unable to scan directory: " + err);
    }

    files.forEach(file => {
        var lastDotIndex = js.lastIndexOf(".");

        var menu = require("./js/" + file);

        menu.forEach(obj => {
            fireStore
            .collection(file.substring(0, lastDotIndex))
            .doc(obj.id)
            .set(obj)
            .then(docRef => {
                console.log("Document written with ID: " + docRef);
            })
            .catch((error) => {
                console.log("Error adding document: " + error);
            })
        })
    })
}) 