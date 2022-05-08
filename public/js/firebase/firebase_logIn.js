import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { getFirestore ,collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js"; 

var alertError = document.querySelector(".error-message");
var alertWrap = document.querySelector(".error-alert-wrap");
var formOverlay = document.querySelector(".sign-in-overlay");
const inputEls = document.querySelectorAll(".input-tags");
const imageText = document.querySelector(".image-text");
const userImages = document.querySelectorAll(".image-user");
const userNameEl = document.querySelector(".user-name");
const userEmailEl = document.querySelector(".user-email");

function logIn(email, password) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;

        getDataFromFireStore(user);
        //output(user)
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        alertError.innerHTML = "User & Password NOT found in database";
        alertWrap.classList.add("show");
        setTimeout(() => { 
            alertWrap.classList.remove("show");
        }, 3000)

        console.log(errorCode, errorMessage);
    });

    async function getDataFromFireStore(user) {
        const db = getFirestore();

        let currentUserId = user.uid;

        const collectionRef = collection(db, "Users");
        const querySnapshot = await getDocs(collectionRef); // this return an array of document
            querySnapshot.forEach((doc) => {
            //console.log(`${doc.id} => ${doc.data()}`);
            let F_name = doc.data().FirstName;
            let L_name = doc.data().LastName;
            let email = doc.data().email;
            let currentDateSignIn = doc.data().metadata.creationTime;

            // getting first letter of the string 
            var firstLetter = F_name.charAt(0).toUpperCase();
            var lastLetter = L_name.charAt(0).toUpperCase();
            imageText.innerHTML = `${firstLetter} ${lastLetter}`;
            console.log(doc.data());
            

            output(user, F_name, L_name, email, currentDateSignIn, firstLetter, lastLetter);
        });
    };
    function output(user, F_name, L_name, email, currentDateSignIn, firstLetter, lastLetter) {
        console.log(user);
        
        userImages.forEach(userImage => {
            userImage.innerHTML = `${firstLetter} ${lastLetter}`;
        })
        userNameEl.innerHTML = `${F_name} ${L_name}`;
        userEmailEl.innerHTML = email;
        userTimeSignIn.innerHTML = currentDateSignIn;

    }
}
export { logIn }