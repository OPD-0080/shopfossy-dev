import { getAuth,  signOut, deleteUser } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

var formOverlay = document.querySelector(".sign-in-overlay");

function signOutFunc() {
    const auth = getAuth();

    signOut(auth)
    .then(() => {
        // return to index page with signLog page on
        formOverlay.classList.add("collapse");
        window.location.assign("index.html");
        
    })
}

function deleteAccount() {
    const auth = getAuth();

    const user = auth.currentUser;

    deleteUser(user).then(() => {
    // User deleted.
        console.log("User Account deleted");
        // return to index page with signLog page on
        formOverlay.classList.add("collapse");
        window.location.assign("index.html");
        

    }).catch((error) => {
    // An error ocurred
        console.log(error);
    // ...
    });

}
export {signOutFunc, deleteAccount}

