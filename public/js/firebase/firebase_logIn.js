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

        // store data in database
        getDataFromFireStore(user);
        //output(user)
        // ...
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
            alertError.innerHTML = "Internet Status: BAD !";
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
        // save data into database
        const collectionRef = collection(db, "Users");
        const querySnapshot = await getDocs(collectionRef); // this return an array of document
            querySnapshot.forEach((doc) => {
            //console.log(`${doc.id} => ${doc.data()}`);
            let F_name = doc.data().FirstName;
            let L_name = doc.data().LastName;
            let email = doc.data().Email;

            // getting first letter of the string 
            var firstLetter = F_name.charAt(0).toUpperCase();
            var lastLetter = L_name.charAt(0).toUpperCase();
            imageText.style.backgroundImage = `none`;
            imageText.innerHTML = `${firstLetter} ${lastLetter}`;
            // ...
            
            // Info display in DOM
            output(F_name, L_name, email, firstLetter, lastLetter);
            // ...

            setTimeout(() => {
                // off display signLOgin page
                formOverlay.classList.remove("collapse");
                // ...
            }, 3000);
        });
    };
    function output(F_name, L_name, email, firstLetter, lastLetter) {
        userImages.forEach(userImage => {
            userImage.innerHTML = `${firstLetter} ${lastLetter}`;
        })
        userNameEl.innerHTML = `${F_name} ${L_name}`;
        userEmailEl.innerHTML = email;
    }
}

export { logIn }