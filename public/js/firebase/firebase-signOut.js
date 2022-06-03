import { getAuth,  signOut, deleteUser } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { getFirestore,  doc, getDoc, deleteDoc} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

var formOverlay = document.querySelector(".sign-in-overlay");

function signOutFunc() {
    const auth = getAuth();

    signOut(auth)
    .then(() => {
        // return to index page with signLog page on
        formOverlay.classList.add("collapse");
        //window.location.assign("index.html");
        
    })
}

function deleteAccount() {
    const auth = getAuth();
    const db = getFirestore();

    const user = auth.currentUser;

    deleteUser(user).then(() => {
    // User deleted.
        console.log("User Account deleted");
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
                console.log("User database deleted");
                setTimeout(() => {
                    // return to index page with signLog page on
                    formOverlay.classList.add("collapse");
                    //window.location.assign("index.html");
                    // ...
                }, 1000)
            })
            // ...
  
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }
}
export {signOutFunc, deleteAccount}

