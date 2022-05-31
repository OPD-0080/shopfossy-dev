// IMPORTATION
import { getAuth,  onAuthStateChanged, EmailAuthProvider, updateProfile, updateEmail, reauthenticateWithCredential } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL  } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-storage.js";
// ...

// VARIABLES
const userInputs = document.querySelectorAll(".content-input");
const editedButtons = document.querySelectorAll(".edit-btn");
const progressEL = document.querySelector(".upload-progress");
const contentOverall = document.querySelectorAll(".user-edited-content-container");
const nameTag = document.querySelector(".user-name-tag");
const emailTag = document.querySelector(".user-email-tag");
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
// ...
// Plugins initiation
const auth = getAuth();
const storage = getStorage();
// ...

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
        // ...

        // checking if condition are met
        auth_status_name();
        auth_status_photo();
        auth_status_email();
        auth_status_all();
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
        fileOutput(fileName, filePhoto, size);
    }
    reader.readAsDataURL(file);
}
function fileOutput(fileName, file, filePhoto, size) {
    const storageRef = ref(storage, `userProfileImages/${auth.currentUser.uid}`);
    const metadata = {
        contentType: 'image/png'
    };
    // pushing image file into firebase storage;
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);
    // ...
    uploadTask.on('state_changed', (snapshot) => {
        console.log(snapshot);
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        // showing progress action in DOM
        progressEL.innerHTML = `${progress}%`
        // ...
        switch (snapshot.state) {
            case 'paused':
                console.log('Upload is paused');
            break;
            case 'running':
                console.log('Upload is running');
            break;
        }
        // remove progress percentage bar after upload
        if (progress == "100") {
            progressEL.classList.add("collapse");
        }
        // ...
    }, (error) => {
        // Handle unsuccessful uploads
        console.log(error);
    }, () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref)
        .then((downloadURL) => {
            console.log('File available at', downloadURL);
            userImageBox.style.backgroundImage = `url(${downloadURL})`; // will be remove later
            updatePhoto(downloadURL);
        });
    });
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
                    //inputTag.value = auth.currentUser.displayName; // Display name in DOM
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

                                reAuthenticationEmail(user, password);
                            }
                        }

                    }else if (e.target.classList.contains("close-confirm-alert")) {
                        closeSingleBtn(inputTag, subContainer); // enable close btn
                        confirmAlertBtn.classList.remove("collapse"); //  restore default confirm btn
                        confirmAlertText.innerHTML = "Confirm to proceed to edit EMAIL !";
                        reAuthPage.classList.remove("collapse"); // restore default re-auth page
                        confirmAlert.classList.remove("collapse"); // remove confirm alert
                    }
                }
                // ...

            }else if (e.target.classList.contains("i-close")) {
                closeSingleBtn(inputTag, subContainer); // enable close btn
                //auth_status_email() // set auth default info if user info not edited
            }
            if (e.target.classList.contains("i-save")) {
                const newEmail = emailTag.value; // getting email input value;
                // updating email
                if (newEmail == "" || newEmail == undefined || newEmail == null) {
                    userAlertText.innerHTML = "Please Enter New Email !"
                    userAlert_red();
                    setTimeout(() => {
                        userAlert.classList.remove("alert");
                    }, 1500);

                }else {
                    // Updating New Email
                    updateEmail(auth.currentUser, newEmail)
                    .then(() => {
                        // Alert user
                        userAlertText.innerHTML = "Profile Status: Email Updated !"
                        userAlert_green();
                        closeSingleBtn(inputTag, subContainer) // enable close btn
                        setTimeout(() => {
                            userAlert.classList.remove("alert");
                            auth_status_email() // check auth status
                        }, 3000);
                        // ...
                    }).catch((error) => {
                        // An error occurred
                        userAlertText.innerHTML = "Error in Updating Email, Try Again !"
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
                inputTag.value = "Not Specified"; // remove attribute value
                    
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
                        confirmAlert.classList.remove("collapse"); // remove confirm alert
                    
                    }else if (e.target.classList.contains("close-confirm-alert")) {
                        closeSingleBtn(inputTag, subContainer); // enable close btn
                        confirmAlert.classList.remove("collapse"); // remove confirm alert
                    }
                }
                // ...

            }else if (e.target.classList.contains("i-close")) {
                closeSingleBtn(inputTag, subContainer) // enable close btn
                passwordTag.value = "....."; // remove attribute value
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
function updatePhoto(downloadURL) {
    console.log(downloadURL);
    // updating profile Name
    /*updateProfile(auth.currentUser, {
        photoURL: downloadURL

    }).then(() => {
        // display photo 
        userImageBox.style.backgroundImage = `url(${downloadURL})`;
        // ...
        // user alert
        userAlertText.innerHTML = "Profile Status: Photo Updated !";
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
    // ...*/
}
async function reAuthenticationEmail(user, password) {
    
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
function userAlert_red() {
    userAlert.style.background = "red";
    userAlert.classList.add("alert");
}
function userAlert_green() {
    userAlert.style.background = "green";
    userAlert.classList.add("alert");
}

// .....
