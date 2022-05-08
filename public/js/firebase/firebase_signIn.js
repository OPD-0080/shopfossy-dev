
import { getAuth, createUserWithEmailAndPassword, /*sendEmailVerification*/ } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { getFirestore, collection, setDoc, doc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
//import { getAuth, createUserWithEmailAndPassword } from "../node_modules/firebase/auth";
var alertError = document.querySelector(".error-message");
var alertWrap = document.querySelector(".error-alert-wrap");
var formOverlay = document.querySelector(".sign-in-overlay");
const inputEls = document.querySelectorAll(".input-tags");
const passError = document.querySelector(".s-error");
const userImages = document.querySelectorAll(".image-user");
const imageText = document.querySelector(".image-text");
const userNameEl = document.querySelector(".user-name");
const userEmailEl = document.querySelector(".user-email");

function signIn(firstName, lastName, email, userPassword, password) {
  const auth = getAuth();

  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
      const user = userCredential.user;
      const userId = user.uid;

      userBio(userId, firstName, lastName, email, userPassword, password)

      console.log(user);

      //emailVerification()
    // ...
  }) 
  .catch((error) => {
      const errorMessage = error.message;
      const errorCode = error.code;
      alertError.innerHTML = errorMessage;
      alertWrap.classList.add("show");
      setTimeout(() => { 
        alertWrap.classList.remove("show");
      }, 3000)

      console.log(errorMessage);
    // ..
  });
}

async function userBio(userId, firstName, lastName, email, userPassword, password) {
  const db = getFirestore();

  try {
    alertError.innerHTML = "PROCESSING ...";
    alertWrap.style.background = "grey";
    alertWrap.classList.add("show");

    const collectionRef = collection(db, "Users");
    await setDoc(doc(collectionRef, userId), {
      FirstName: firstName,
      LastName: lastName, 
      Email: email,
    });
      output(firstName, lastName, email);

  } catch (e) {
    // show error in DOM
    alertError.innerHTML = "Check Input Requirement";
    alertWrap.classList.add("show");
    console.error("Error creating user profile: ", e);
  }
}
function output(firstName, lastName, email) {
  /*1. alerting user message
    2. showing OFF the signIn page
  */

    // getting first letter of the string 
    var firstLetter = firstName.charAt(0).toUpperCase();
    var lastLetter = lastName.charAt(0).toUpperCase();
    imageText.innerHTML = `${firstLetter} ${lastLetter}`;

    // Alert message and display off DOM
    inputEls.forEach(el => {el.value = ""})
    alertError.innerHTML = "USER successfully created";
    alertWrap.style.background = "green";
    alertWrap.classList.add("show");
    setTimeout(() => { 
      alertWrap.classList.remove("show");
    }, 3000)
    setTimeout(() => { formOverlay.classList.remove("collapse") }, 5000);

    // display user info in Dashboard 
    userImages.forEach(userImage => {
      userImage.innerHTML = `${firstLetter} ${lastLetter}`;
    })
    userNameEl.innerHTML = `${firstLetter} ${lastLetter}`;
    userEmailEl.innerHTML = email;
    //userTimeSignIn.innerHTML = currentDateSignIn;
}
/*function emailVerification() {
  const auth = getAuth();
  // verify email
  sendEmailVerification(auth.currentUser)
  .then(() => {
    // Email verification sent!
    console.log("Verification link sent to your email");
    // ...
  });
}*/

export { signIn }