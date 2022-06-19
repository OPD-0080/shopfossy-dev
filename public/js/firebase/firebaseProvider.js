import { getAuth, signInWithPopup, GoogleAuthProvider} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { getFirestore, collection, setDoc, doc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

const signLogWrap = document.querySelectorAll(".signLogWrap");
const signLogHeader = document.querySelector(".signIn-header");
const userImages = document.querySelectorAll(".image-user");
const userNameEl = document.querySelector(".user-name");
const userEmailEl = document.querySelector(".user-email");
var formOverlay = document.querySelector(".sign-in-overlay");
var alertError = document.querySelector(".error-message");
var alertWrap = document.querySelector(".error-alert-wrap");
const imageText = document.querySelector(".image-text");

const db = getFirestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();

function authProvider_goggle() {
    signInWithPopup(auth, provider)
    .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user);

        const userId = user.uid;

        // Destructuring user info
        const userName = user.displayName;
        const userEmail = user.email;
        const userPhoto = user.photoURL;

        userBio(userId, userName, userEmail);
        output(userName, userEmail, userPhoto);

        // ...
    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);

        if (error.code === 'auth/account-exists-with-different-credential')  {
            alertError.innerHTML = "Account exist with different credential";
            alertWrap.style.background = "red";
            alertWrap.classList.add("show");
            setTimeout(() => { 
                alertWrap.classList.remove("show");
            }, 3000);
        }
    });
    async function userBio(userId, userName, userEmail) {
        // User alert
        alertError.innerHTML = "PROCESSING ...";
        alertWrap.style.background = "grey";
        alertWrap.classList.add("show");
        // ...
        // save data in fireStore database
        const collectionRef = collection(db, "Users");
        await setDoc(doc(collectionRef, userId), {
            FullName: userName,
            Email: userEmail,
            UID: userId,
            TimeCreated: serverTimestamp()
        });
        // ...
        confirmationAlert(userName)
    }
    function confirmationAlert(userName) {
        // Alert message and display off DOM
        setTimeout(() => {
            // displaying login info on DOM
            signLogHeader.innerHTML = `Welcome ${userName}`;

            alertError.innerHTML = "USER successfully created";
            alertWrap.style.background = "green";
            alertWrap.classList.add("show");
        }, 3000)
        setTimeout(() => { 
            alertWrap.classList.remove("show");
        }, 4000);
        // ...
        // showing off the login page
        signLogWrap.forEach(el => el.style.display = "none");
        setTimeout(() => { 
            formOverlay.classList.remove("collapse") 
        }, 5000);
        // ...
    }
    function output(userName, userEmail, userPhoto) {
        userNameEl.innerHTML = userName;
        userEmailEl.innerHTML = userEmail;
        if (userPhoto == null || userPhoto == undefined || userPhoto == "") {
            imageText.innerHTML = `${userName.charAt(0).toUpperCase()}`;
            userImages.forEach(userImage => {
                userImage.style.backgroundImage = `none`;
            });
        }else {
            userImages.forEach(userImage => {
                userImage.style.backgroundImage = `url(${userPhoto})`;
            });
        }
    }
};
export { authProvider_goggle }