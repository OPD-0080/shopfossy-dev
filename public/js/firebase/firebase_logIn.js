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
const headerText = document.querySelector(".signIn-header");

function logIn(email, password) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;

        if (user == null) {
            // alert user
            alertError.innerHTML = "Error in User Authentication. Try Again !";
            alertWrap.classList.add("show");
            alertWrap.style.background = "red";
            setTimeout(() => { 
                alertWrap.classList.remove("show");
            }, 3000)
        }
        else {
             // store data in database
            getDataFromFireStore(user);
            // ...
        }
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        
        if (errorCode == "auth/invalid-email") {
            alertError.innerHTML = "Invalid Email, Require Valid Email !";
            alertWrap.classList.add("show");
            alertWrap.style.background = "red";
            setTimeout(() => { 
                alertWrap.classList.remove("show");
            }, 3000)
        }else if (errorCode == "auth/internal-error") {
            alertError.innerHTML = "Invalid Password, Require Valid Password";
            alertWrap.classList.add("show");
            alertWrap.style.background = "red";
            setTimeout(() => { 
                alertWrap.classList.remove("show");
            }, 3000)
        }else if (errorCode == "auth/user-not-found") {
            alertError.innerHTML = "User NOT Found !";
            alertWrap.classList.add("show");
            alertWrap.style.background = "red";
            setTimeout(() => { 
                alertWrap.classList.remove("show");
            }, 3000)
        }else if (errorCode == "auth/wrong-password") {
            alertError.innerHTML = "Wrong Password !";
            alertWrap.classList.add("show");
            alertWrap.style.background = "red";
            setTimeout(() => { 
                alertWrap.classList.remove("show");
            }, 3000)
        }else if (errorCode == "auth/too-many-requests") {
            alertError.innerHTML = "Account DISABLE Temporary, TRY LATER !";
            alertWrap.classList.add("show");
            alertWrap.style.background = "red";
            setTimeout(() => { 
                alertWrap.classList.remove("show");
            }, 3000)
        }
        else if (errorCode == "auth/network-error") {
            alertError.innerHTML = "Bad Internet Connection. Try Again !";
            alertWrap.classList.add("show");
            alertWrap.style.background = "red";
            setTimeout(() => { 
                alertWrap.classList.remove("show");
            }, 3000)
        }else if (errorCode == "auth/network-request-failed") {
            alertError.innerHTML = "Bad Internet Connection. Try Again !";
            alertWrap.classList.add("show");
            alertWrap.style.background = "red";
            setTimeout(() => { 
                alertWrap.classList.remove("show");
            }, 3000)
        }
        console.log(errorCode);
    });

    async function getDataFromFireStore(user) {
        const db = getFirestore();

        let userId = user.uid;

        // user alert
        alertError.innerHTML = "Please Wait ...";
        alertWrap.style.background = "grey";
        alertWrap.classList.add("show");
        headerText.style.display = "none";
        // ...
        // get data from database
        const collectionRef = collection(db, "Users");
        const querySnapshot = await getDocs(collectionRef); // this return an array of document
            querySnapshot.forEach((doc) => {
            //console.log(`${doc.id} => ${doc.data()}`);
            let user_name = doc.data().UserName;
            let Email = doc.data().Email;
            let UID = doc.data().UID

            // checking id of the user
            if (UID == userId) {
                // getting first letter of the string 
                var firstLetter = user_name.charAt(0).toUpperCase();
                imageText.style.backgroundImage = `none`;
                imageText.innerHTML = `${firstLetter}`;
                // ...
                // Info display in DOM
                output(user, user_name, Email, firstLetter);
            }
            
        });
    };
    function output(user, user_name, Email, firstLetter) {
        if (user.photoURL == null) {
            userImages.forEach(userImage => {
                userImage.style.backgroundImage = "none";
                userImage.innerHTML = `${firstLetter}`;
            });
            if (user.displayName == null) {
                userNameEl.innerHTML = `${user_name}`;
            }else {
                userNameEl.innerHTML = user.displayName;
            }
            userEmailEl.innerHTML = Email;
            logInPageCollapse(user_name)

        }else if (user.displayName == null) {
            if (user.photoURL == null) {
                userImages.forEach(userImage => {
                    userImage.style.backgroundImage = "none";
                    userImage.innerHTML = `${firstLetter}`;
                });
            }else {
                userImages.forEach(userImage => {
                    userImage.style.backgroundImage = `url(${user.photoURL})`;
                })
            }
            userNameEl.innerHTML = `${user_name}`;
            userEmailEl.innerHTML = Email;
            logInPageCollapse(user_name)

        }
        else {
            userImages.forEach(userImage => {
                userImage.style.backgroundImage = `url(${user.photoURL})`;
            });
            userNameEl.innerHTML = user.displayName;
            userEmailEl.innerHTML = user.email;
            logInPageCollapse(user_name)
        }
    }
    function logInPageCollapse(user_name) {
        // ...
        setTimeout(() => {
            // user alert
            alertError.innerHTML = `Welcome ${user_name}}`;
            alertWrap.style.background = "green";
            alertWrap.classList.add("show");
            setTimeout(() => { 
                alertWrap.classList.remove("show");
            }, 3000)
            // ..
            // off display signLOgin page
            formOverlay.classList.remove("collapse");
            // ...
        }, 4500);
    }
}

export { logIn }