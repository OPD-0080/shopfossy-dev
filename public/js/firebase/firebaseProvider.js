import { getAuth, signInWithPopup, GoogleAuthProvider, OAuthProvider, FacebookAuthProvider, fetchSignInMethodsForEmail } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { getFirestore, collection, setDoc, doc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

const signLogWrap = document.querySelectorAll(".signLogWrap");
const signLogHeader = document.querySelector(".signIn-header");
const userImages = document.querySelectorAll(".image-user");
const userNameEl = document.querySelector(".user-name");
const userEmailEl = document.querySelector(".user-email");
const userTimeSignIn = document.querySelector(".user-time");
var formOverlay = document.querySelector(".sign-in-overlay");
var alertError = document.querySelector(".error-message");
var alertWrap = document.querySelector(".error-alert-wrap");


function authProvider_goggle() {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

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
        const timeOfCreation = user.metadata.creationTime;

        userBio(userId, userName, userEmail, timeOfCreation);
        showUserAlert(userName)
        output(userName, userEmail, userPhoto);

        // ...
    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...

        /*if (error.code === 'auth/account-exists-with-different-credential')  {
            console.log("User's email already exists.");
            // The email of the user's account used.
            const email = error.email;

            fetchSignInMethodsForEmail(auth, email).then(function(methods) {

            }
        }*/
    });
    async function userBio(userId, userName, userEmail, timeOfCreation) {
        const db = getFirestore();
        const collectionRef = collection(db, "Users");
        await setDoc(doc(collectionRef, userId), {
            FullName: userName,
            Email: userEmail,
            TimeOfCreation: timeOfCreation
        });
    }
    function showUserAlert(userName) {

        alertError.innerHTML = "PROCESSING ...";
        alertWrap.style.background = "grey";
        alertWrap.classList.add("show");

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
        }, 6000);

        // showing off the login page
        signLogWrap.forEach(el => el.style.display = "none");
        setTimeout(() => { formOverlay.classList.remove("collapse") }, 12000);
    }
    function output(userName, userEmail, userPhoto) {
        
        userImages.forEach(userImage => {
            userImage.style.backgroundImage = `url(${userPhoto})`;
        })
        userNameEl.innerHTML = userName;
        userEmailEl.innerHTML = userEmail;
    }
};


function authProvider_facebook() {
    const auth = getAuth();
    const provider = new FacebookAuthProvider();

    signInWithPopup(auth, provider)
    .then((result) => {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        
        // The signed-in user info.
        const user = result.user;
        console.log(user);

        const userId = user.uid;

        // Destructuring user info
        const userName = user.displayName;
        const userEmail = user.email;
        const userPhoto = user.photoURL;

        showUserAlert(userName)
        output(userName, userEmail, userPhoto);

        // ...
    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);

        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);
        // ...

        /*if (error.code === 'auth/account-exists-with-different-credential')  {
            console.log("User's email already exists.");
            // The email of the user's account used.
            const email = error.email;

            fetchSignInMethodsForEmail(auth, email).then(function(methods) {

            }
        }*/
    });

    function showUserAlert(userName) {

        alertError.innerHTML = "PROCESSING ...";
        alertWrap.style.background = "grey";
        alertWrap.classList.add("show");

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
        }, 6000);

        // showing off the login page
        signLogWrap.forEach(el => el.style.display = "none");
        setTimeout(() => { formOverlay.classList.remove("collapse") }, 12000);
    }
    function output(userName, userEmail, userPhoto) {

        userImages.forEach(userImage => {
            userImage.style.backgroundImage = `url(${userPhoto})`;
        })
        userNameEl.innerHTML = userName;
        userEmailEl.innerHTML = userEmail;
    }
};

function authProvider_apple() {
    const auth = getAuth();
    const provider = new OAuthProvider('apple.com');

    signInWithPopup(auth, provider)
    .then((result) => {
        // The signed-in user info.
        const user = result.user;
        console.log(user);

        // Apple credential
        const credential = OAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        const idToken = credential.idToken;


        // Destructuring user info
        const userName = user.displayName;
        const userEmail = user.email;
        const userPhoto = user.photoURL;

        showUserAlert(userName)
        output(userName, userEmail, userPhoto);

        // ...
    })
    .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // The email of the user's account used.
        const email = error.email;
        // The credential that was used.
        const credential = OAuthProvider.credentialFromError(error);

        // ...
    });

    function showUserAlert(userName) {

        alertError.innerHTML = "PROCESSING ...";
        alertWrap.style.background = "grey";
        alertWrap.classList.add("show");

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
        }, 6000);

        // showing off the login page
        signLogWrap.forEach(el => el.style.display = "none");
        setTimeout(() => { formOverlay.classList.remove("collapse") }, 12000);
    }
    function output(userName, userEmail, userPhoto) {

        userImages.forEach(userImage => {
            userImage.style.backgroundImage = `url(${userPhoto})`;
        })
        userNameEl.innerHTML = userName;
        userEmailEl.innerHTML = userEmail;
    }
}
export { authProvider_goggle, authProvider_facebook, authProvider_apple }