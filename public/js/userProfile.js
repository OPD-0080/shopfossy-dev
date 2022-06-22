// IMPORTATION
import { getAuth,  onAuthStateChanged, sendEmailVerification, 
    EmailAuthProvider, updateProfile, updatePassword, 
    updateEmail, reauthenticateWithCredential } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { getStorage, ref, getDownloadURL, uploadString,} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-storage.js";
import { getFirestore, updateDoc, doc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
// ...

// VARIABLES
const userInputs = document.querySelectorAll(".content-input");
const editedButtons = document.querySelectorAll(".edit-btn");
const progressEL = document.querySelector(".upload-progress");
const contentOverall = document.querySelectorAll(".user-edited-content-container");
const nameTag = document.querySelector(".user-name-tag");
const emailTag = document.querySelector(".user-email-tag");
const telTag = document.querySelector(".user-tel-tag");
const passwordTag = document.querySelector(".user-password-tag");
const userAlert = document.querySelector(".user-edit-alert");
const userAlertText = userAlert.querySelector(".alert-text");
const userImageContainer = document.querySelector(".edited-image-wrap");
const imageFile = userImageContainer.querySelector(".image-file");
const userImageBox = userImageContainer.querySelector(".edited-image-container");
const confirmAlert = document.querySelector(".user-confirm-alert");
const confirmAlertText = confirmAlert.querySelector(".confirm-alert-text");
const confirmAlertBtn = confirmAlert.querySelector(".confirm-btn");
const reAuthPage = confirmAlert.querySelector(".re-auth-container");
const authPassInput = reAuthPage.querySelector(".re-auth-input");
const authPassBtn = reAuthPage.querySelector(".re-auth-btn");
const noteWrap = document.querySelector(".content-email");
const noteEmail = noteWrap.querySelector(".note");
const verifiedIconEmail = noteWrap.querySelector(".verify-icon");
const noteWrapPass = document.querySelector(".content-password");
const notePass = noteWrapPass.querySelector(".note");
const verifiedIconPass = noteWrapPass.querySelector(".verify-icon");
// ...
// Plugins initiation
const auth = getAuth();
const storage = getStorage();
const db = getFirestore();
// ...

onAuthStateChanged(auth, async (user) => {
    if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        //console.log(user);

        // getting user info
        // Destructuring user info
        const userVerificationStatus = user.emailVerified;
        if (userVerificationStatus) {
            noteEmail.classList.add("show");
            noteEmail.innerHTML = "Verified";
            verifiedIconEmail.classList.add("show");
        }else {
            noteEmail.classList.remove("show");
            noteEmail.innerHTML = "Not Verified";
            verifiedIconEmail.classList.remove("show");
        }
        // ...

        // checking if condition are met
        auth_status_name();
        auth_status_photo();
        auth_status_email();
        auth_status_all();
        auth_status_tel();
        // ...
    } 
})
function auth_status_name() {
    const userName = auth.currentUser.displayName;
    if (userName == null){
        nameTag.value = "Not Specified";
        // alert user to update profile
            userAlertText.innerHTML = "Profile Update Required !";
            userAlert_red();
        // ...
    }else {
        nameTag.value = userName;
    }
};
function auth_status_photo() {
    const userPhoto = auth.currentUser.photoURL;
    if (userPhoto == null){
        // alert user to update profile
            userAlertText.innerHTML = "Profile Update Required !";
            userAlert_red()
        // ...
    }else {
        userImageBox.style.backgroundImage = `url(${userPhoto})`;
        progressEL.classList.remove("collapse");  //  remove progress percentage bar
    }
};
function auth_status_email() {
    const userEmail = auth.currentUser.email;
    if (userEmail == null){
        // alert user to update profile
            userAlertText.innerHTML = "Profile Update Required !";
            userAlert_red()
        // ...
    }else {
        emailTag.value = userEmail;
    }
}
function auth_status_all() {
    const userName = auth.currentUser.displayName;
    const userPhoto = auth.currentUser.photoURL;
    if (userName == null || userPhoto == null) {
        // alert user to update profile
        userAlertText.innerHTML = "Profile Update Required !";
        userAlert_red()
        // ...
    }else {
        userAlert.classList.remove("alert");
    }
}
function auth_status_tel() {
    const res = localStorage.getItem("userTel");
    if (res == null || res == undefined || res == "") {
        telTag.value = "Not Specified";
    }else if (res) {
        telTag.value = res;
    }
}


// SELECTING PHOTO LOCALLY
userImageContainer.onclick = (e) => {
    if (e.target.classList.contains("edited-image-container")) {
        imageFile.click()
    }
}
imageFile.onchange = (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();
    //console.log(file);
    const fileName = file.name;
    const size =file.size;

    reader.onload = (e) => {
        var filePhoto = e.target.result;
        fileOutput(fileName, filePhoto, size, file);
    }
    reader.readAsDataURL(file);
}
function fileOutput(fileName, file, filePhoto, size) {
    const storageRef = ref(storage, `userProfileImages/${auth.currentUser.uid}`);
    // pushing image file into firebase storage and
    // Monitoring upload progress
    userAlertText.innerHTML = "Photo Uploading ...";
    uploadString(storageRef, file, 'data_url')
    .then((snapshot) => {
        // user alert
        userAlertText.innerHTML = "Photo Upload Successful !";
        userAlert_green();
        setTimeout(() => {
            userAlert.classList.remove("alert");
        }, 3000);
        // ...
        // download image url 
        getDownloadURL(storageRef).then((url) => {
            // update photo in firebase auth
            updatePhoto(url)
            // ...
        }).catch((error) => {
            // Handle any errors
            console.log(error);
        });
        // ... 
    })
}
// ....

// USER PROFILE CONTENT
contentOverall.forEach(container => {
    // FOR FULL NAME
    if (container.querySelector(".content-name")) {
        const subContainer = container.querySelector(".content-name");
        subContainer.onclick = (e) => {
            const inputTag = subContainer.querySelector(".content-input");

            if (e.target.classList.contains("i-edit")) {
                editSingleBtn(inputTag, subContainer); // enable edit btn

            }else if (e.target.classList.contains("i-close")) {
                closeSingleBtn(inputTag, subContainer); // enable close btn
                auth_status_name(); // set auth default info if user info not edited
            }
            if (e.target.classList.contains("i-save")) {
                const userFullName = inputTag.value; // get value of the input
                // updating profile Name
                updateProfile(auth.currentUser, {
                    displayName: userFullName 
                }).then(() => {
                    closeSingleBtn(inputTag, subContainer); // enable close btn
                     // user alert
                    userAlertText.innerHTML = "Profile Status: Name Updated  !"
                    userAlert_green();
                    setTimeout(() => {
                        userAlert.classList.remove("alert");
                        auth_status_name(); // check auth status
                    }, 3000);
                    
                }).catch((error) => {
                    console.log(error);
                    userAlertText.innerHTML = "Error in Updating Profile Name, Try Again !"
                    userAlert_red();
                    auth_status_name() // check auth status
                    setTimeout(() => {
                        userAlert.classList.remove("alert");
                    }, 3000);
                })
                // ...
            }
        }
    }
    // ....
    // FOR EMAIL
    if (container.querySelector(".content-email")) {
        const subContainer = container.querySelector(".content-email");
        subContainer.onclick = (e) => {
            const inputTag = subContainer.querySelector(".content-input");
            if (e.target.classList.contains("i-edit")) {
                // confirm alert to edit
                confirmAlertText.innerHTML = "Confirm to proceed to edit EMAIL !";
                confirmAlert.classList.add("collapse");
                // ... 
                // click confirm alert btn to activate edit input
                confirmAlert.onclick = (e) => {
                    if (e.target.classList.contains("confirm-btn")) {
                        editSingleBtn(inputTag, subContainer); // enable edit btn
                        // reAuthentication process
                        reAuthenticationProcess();
                        // ...
                    }else if (e.target.classList.contains("close-confirm-alert")) {
                        closeSingleBtn(inputTag, subContainer); // enable close btn
                        // restore authentication process to default
                        restoreAuthenticationProcess();
                        // ...
                        auth_status_email() // set auth default info if user info not edited
                    }
                }
                // ...
            }else if (e.target.classList.contains("i-close")) {
                closeSingleBtn(inputTag, subContainer); // enable close btn
                auth_status_email() // set auth default info if user info not edited
            }
            if (e.target.classList.contains("i-save")) {
                const newEmail = emailTag.value; // getting email input value;
                // updating email
                if (newEmail == "" || newEmail == undefined || newEmail == null) {
                    userAlertText.innerHTML = "Please Enter NEW EMAIL !"
                    userAlert_red();
                    setTimeout(() => {
                        userAlert.classList.remove("alert");
                    }, 1500);

                }else {
                    // Updating New Email
                    updateEmail(auth.currentUser, newEmail)
                    .then(() => {
                        closeSingleBtn(inputTag, subContainer) // enable close btn
                        // update user bio in fireStore Database
                        updateUserBio(newEmail);
                        // ...
                    }).catch((error) => {
                        // An error occurred
                        userAlertText.innerHTML = "Error in Updating EMAIL, Try Again !"
                        userAlert_red();
                        auth_status_email() // check auth status
                        setTimeout(() => {
                            userAlert.classList.remove("alert");
                        }, 3000);
                        // ...
                    });
                    // ...
                }
                // ...
            }
        }
    }
    // ....
    // FOR PHONE NUMBER
    if (container.querySelector(".content-tel")) {
        const subContainer = container.querySelector(".content-tel");
        subContainer.onclick = (e) => {
            const inputTag = subContainer.querySelector(".content-input");
            if (e.target.classList.contains("i-edit")) {
                editSingleBtn(inputTag, subContainer); // enable edit btn

            }else if (e.target.classList.contains("i-close")) {
                closeSingleBtn(inputTag, subContainer) // enable close btn
                //inputTag.value = "Not Specified"; // remove attribute value
                auth_status_tel();
            }
            if (e.target.classList.contains("i-save")) {
                const tel =  telTag.value;
                // store tel number in local storage
                localStorage.setItem("userTel", tel);

                setTimeout(() => {
                    //get local storage 
                    const res = localStorage.getItem("userTel");
                    telTag.value = res;
                }, 2000)
            }
        }
    }
    // ....
    // FOR PASSWORD
    if (container.querySelector(".content-password")) {
        const subContainer = container.querySelector(".content-password");
        subContainer.onclick = (e) => {
            const inputTag = subContainer.querySelector(".content-input");
            if (e.target.classList.contains("i-edit")) {
                // confirm alert to edit
                confirmAlertText.innerHTML = "Confirm to proceed to edit PASSWORD !";
                confirmAlert.classList.add("collapse");
                // ... 
                // click confirm alert btn to activate edit input
                confirmAlert.onclick = (e) => {
                    if (e.target.classList.contains("confirm-btn")) {
                        editSingleBtn(inputTag, subContainer); // enable edit btn
                        // reAuthentication process
                        reAuthenticationProcess();
                        // ...
                    }else if (e.target.classList.contains("close-confirm-alert")) {
                        closeSingleBtn(inputTag, subContainer); // enable close btn
                        confirmAlert.classList.remove("collapse"); // remove confirm alert
                    }
                }
                // ...

            }else if (e.target.classList.contains("i-close")) {
                closeSingleBtn(inputTag, subContainer) // enable close btn
                passwordTag.value = "....."; // remove attribute value
                // restore authentication process to default
                restoreAuthenticationProcess();
                // ...
            }
            if (e.target.classList.contains("i-save")) {
                const newPassword = passwordTag.value; // getting email input value;
                // updating email
                if (newPassword == "" || newPassword == undefined || newPassword == null) {
                    userAlertText.innerHTML = "Please Enter NEW PASSWORD !"
                    userAlert_red();
                    setTimeout(() => {
                        userAlert.classList.remove("alert");
                    }, 1500);

                }else {
                    // Updating New Email
                    updatePassword(auth.currentUser, newPassword)
                    .then(() => {
                        // Alert user
                        userAlertText.innerHTML = "Profile Status: PASSWORD Updated !"
                        userAlert_green();
                        closeSingleBtn(inputTag, subContainer) // enable close btn
                        notePass.innerHTML = "Password Changed";
                        notePass.classList.add("show");
                        setTimeout(() => {
                            userAlert.classList.remove("alert");
                        }, 3000);
                        // ...
                    }).catch((error) => {
                        // An error occurred
                        userAlertText.innerHTML = "Error in Updating PASSWORD, Try Again !"
                        userAlert_red();
                        setTimeout(() => {
                            userAlert.classList.remove("alert");
                        }, 3000);
                        // ...
                    });
                    // ...
                }
                // ...
            }
        }
    }
    // ....
});
function editSingleBtn(inputTag, subContainer) {
    inputTag.removeAttribute("readonly"); // activating input tag
    inputTag.classList.add("edit") // change state of the input'
    subContainer.querySelector(".i-edit").classList.add("collapse"); // collapse edit btn
    subContainer.querySelector(".i-close").classList.add("close"); // show close btn
    inputTag.value = "" // remove attribute value
    inputTag.focus(); // focusing input tag
    subContainer.querySelector(".save-btn").classList.add("active"); // show save btn
};
function closeSingleBtn(inputTag, subContainer) {
    inputTag.setAttribute("readonly", true); // activating input tag
    inputTag.classList.remove("edit") // change state of the input'
    subContainer.querySelector(".i-edit").classList.remove("collapse"); // collapse edit btn
    subContainer.querySelector(".i-close").classList.remove("close"); // show close btn
    subContainer.querySelector(".save-btn").classList.remove("active"); // remove save btn
}
function updatePhoto(url) {
    // updating profile Name
    userAlertText.innerHTML = "Updating photo ...";
    updateProfile(auth.currentUser, {
        photoURL: url

    }).then(() => {
        // display photo 
        userImageBox.style.backgroundImage = `url(${url})`;
        // ...
        // user alert
        userAlertText.innerHTML = "Photo Updated !";
        userAlert_green();
        setTimeout(() => {
            userAlert.classList.remove("alert");
            auth_status_photo() // check auth status
        }, 3000);
        // ...
    }).catch((error) => {
        console.log(error);

        if (error.code == "auth/invalid-profile-attribute") {
            userAlertText.innerHTML = "Error in Updating Photo, Try Again !";
            userAlert_red();
            setTimeout(() => {
                userAlert.classList.remove("alert");
                auth_status_photo() // check auth status
            }, 3000);
        }
    })
    // ...
}
function reAuthenticationProcess() {
    confirmAlertBtn.classList.add("collapse"); // remove alert confirm btn
    confirmAlertText.innerHTML = "Confirm PASSWORD for Authentication !";
    reAuthPage.classList.add("collapse"); // show re-auth page
    authPassInput.focus(); // focusing input
    
    // Re-authentication of user when btn is triggered
    authPassBtn.onclick = (e) => {
        const reAuthPassword = authPassInput.value;

        if (reAuthPassword == "" || reAuthPassword == null || reAuthPassword == undefined) {
            confirmAlertText.innerHTML = "Error !";
            setTimeout(() => {
                confirmAlertText.innerHTML = "Confirm PASSWORD for Authentication !";
            }, 1000);
        }else {
            const  user = auth.currentUser; // get user
            const password = reAuthPassword; //get user entered password

            reAuthentication(user, password);
        }
    }
}
async function reAuthentication(user, password) {
    
    confirmAlertText.innerHTML = "Checking Authentication ...!"; // Alert User auth status
    // TODO(you): prompt the user to re-provide their sign-in credentials
    var credential = EmailAuthProvider.credential(user.email, password);
    await reauthenticateWithCredential(user, credential)
    .then(() => {
        // User re-authenticated.
        confirmAlertText.innerHTML = "Authentication Successful !";
        // Restore default settings
        setTimeout(() => {
            emailTag.focus(); // focusing email input tag
            confirmAlertBtn.classList.remove("collapse"); // add alert confirm btn
            reAuthPage.classList.remove("collapse"); // restore default re-auth page
            confirmAlert.classList.remove("collapse"); // remove confirm alert
        }, 1500)
        // ...
    }).catch((error) => {
        // An error ocurred
        console.log(error);
        // ...
    });
}
function restoreAuthenticationProcess() {
    confirmAlertBtn.classList.remove("collapse"); //  restore default confirm btn
    confirmAlertText.innerHTML = "Confirm to proceed to edit EMAIL !";
    reAuthPage.classList.remove("collapse"); // restore default re-auth page
    confirmAlert.classList.remove("collapse"); // remove confirm alert
}
async function updateUserBio(newEmail) {
    // Update firebase database
    const docRef = doc(db, "Users", auth.currentUser.uid);
    if (newEmail) {
        await updateDoc(docRef, {
            Email: newEmail,
            TimeUpdated: serverTimestamp()

        }).then(() => {
            // Alert user
            userAlertText.innerHTML = "Profile Status: EMAIL Updated !"
            userAlert_green();
            setTimeout(() => {
                userAlert.classList.remove("alert");
                auth_status_email(); // check auth status
                // Verify new email
                newEmailVerification();
                // ...
            }, 3000);
            // ...
        }).catch((error) => {
            console.log(error.code);
        })
        // ...
    }
}
function newEmailVerification() {
    const user = auth.currentUser;
    sendEmailVerification(user)
    .then(() => {
        // alert user
        userAlertText.innerHTML = "Verification Link sent. Verify Email !"
        userAlert.classList.add("alert");
        userAlert_green();
        setTimeout(() => {
            userAlert.classList.remove("alert");
        }, 3000);
        // ...
    }).catch((error) => {
        console.log(error.code);
    })
}
function userAlert_red() {
    userAlert.style.background = "red";
    userAlert.classList.add("alert");
}
function userAlert_green() {
    userAlert.style.background = "green";
    userAlert.classList.add("alert");
}

// .....
