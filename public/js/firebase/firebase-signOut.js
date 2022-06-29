import { getAuth,  signOut, deleteUser } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { getFirestore,  doc, getDoc, deleteDoc} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";


const userNameEl = document.querySelector(".user-name");
const userEmailEl = document.querySelector(".user-email");
const userImages = document.querySelectorAll(".image-user");
const userBtnWrapper = document.querySelector(".user-btns");
const btnOff = userBtnWrapper.querySelector(".off");
const btnOn = userBtnWrapper.querySelector(".in");
const userAlert = document.querySelector(".user-edit-alert");
const userAlertText = userAlert.querySelector(".alert-text");

function signOutFunc() {
    const auth = getAuth();

    signOut(auth)
    .then(() => {
        // return to index page with signLog page on
        //window.location.assign("../../index.html");
        // activating buttons 
        btnOff.classList.remove("show");
        btnOn.classList.remove("show");
        // ...
        userImages.forEach(userImage => {
            userImage.style.backgroundImage = "url(../img/icons/user.png)";
            userImage.innerHTML = "";
        });
        userEmailEl.innerHTML = "SignIn at home page";
        userNameEl.innerHTML = "Not SignIn";
    })
}

function deleteAccount() {
    const auth = getAuth();
    const db = getFirestore();

    const user = auth.currentUser;

    deleteUser(user).then(() => {
        // deleting data fireStore database using it uid
        deleteUSerFromDatabase(user);

    }).catch((error) => {
    // An error ocurred
        console.log(error);
        if (error.code == "auth/requires-recent-login") {
            signOutFunc()
        }
    // ...
    });
    async function deleteUSerFromDatabase(user) {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            //console.log("Document data:", docSnap.data());

            // deleting data
            await deleteDoc(doc(db, "Users", `${user.uid}`))
            .then(() => {
                // Alert user a notification
                // user alert
                alertNotification()
                // ...

                setTimeout(() => {
                    // return to index page with signLog page on
                    formOverlay.classList.add("collapse");
                    // ...
                }, 1000)
            })
            // ...
  
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }
    function alertNotification() {
        userAlertText.innerHTML = "User Account Deleted !";
        userAlert.style.background = "green";
        userAlert.classList.add("alert");
        setTimeout(() => {
            userAlert.classList.remove("alert");
        }, 800);
    }
}
export {signOutFunc, deleteAccount}

