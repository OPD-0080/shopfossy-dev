import { getAuth,  onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";


var formOverlay = document.querySelector(".sign-in-overlay");
const userImages = document.querySelectorAll(".image-user");
const userNameEl = document.querySelector(".user-name");
const userEmailEl = document.querySelector(".user-email");


function onAuthState() {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;
            console.log(user);

            
            // getting user info
            // Destructuring user info
            const userName = user.displayName;
            const userEmail = user.email;
            const userPhoto = user.photoURL;

            // Displaying user in DOM
            output(userName, userEmail, userPhoto);


            // collapsing signLog page form
            formOverlay.classList.remove("collapse");
          // ...
        } else {
          // User is signed out
            formOverlay.classList.add("collapse")
          // ...
        }
    });


    function output(userName, userEmail, userPhoto) {
        userImages.forEach(userImage => {
            userImage.style.backgroundImage = `url(${userPhoto})`;
        })
        userNameEl.innerHTML = userName;
        userEmailEl.innerHTML = userEmail;

    }
}
export { onAuthState }