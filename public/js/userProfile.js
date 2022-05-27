// IMPORTATION
//import { getAuth,  onAuthStateChanged, updateProfile, reauthenticateWithCredential } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
// ...

// VARIABLES
const userInputs = document.querySelectorAll(".content-input");
const editedButtons = document.querySelectorAll(".edit-btn");
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
//const confirmAlertBtn = confirmAlert.querySelector(".confirm-btn");

// ...

/*const auth = getAuth();
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
        function auth_status_name(userName) {
            if (userName == undefined){
                nameTag.value = "Not Specified"
                // alert user to update profile
                    userAlertText.innerHTML = "Profile Update Required !"
                    userAlert.classList.add("alert");
                // ...
            }else {
                nameTag.value = userName;
                userAlert.classList.remove("alert");
            }
        }auth_status_name();
        function auth_status_photo(userPhoto) {
            if (userPhoto == undefined){
                // alert user to update profile
                    userAlertText.innerHTML = "Profile Update Required !"
                    userAlert.classList.add("alert");
                // ...
            }else {
                userAlert.classList.remove("alert");
                userImageBox.style.backgroundImage = `url(${userPhoto})`;
            }
        }auth_status_photo();
        function auth_status_email(userEmail) {
            if (userEmail == undefined){
                // alert user to update profile
                    userAlertText.innerHTML = "Profile Update Required !"
                    userAlert.classList.add("alert");
                // ...
            }else {
                userAlert.classList.remove("alert");
                emailTag.value = userEmail;
            }
        }auth_status_email();
        // ...
    } 
})
*/

// SELECTING PHOTO LOCALLY
userImageContainer.onclick = (e) => {
    if (e.target.classList.contains("edited-image-container")) {
        imageFile.click()
    }
}
imageFile.onchange = (event) => {
    //const file = event.target.files[0];

    const reader = new FileReader();
    for (file of event.target.files) {
        console.log(file);

        const fileName = file.name;
        const size =file.size;

        reader.onload = (e) => {
            const filePhoto = e.target.result;
            fileOutput(fileName, filePhoto, size);
        }
        reader.readAsDataURL(file);
    }
}
function fileOutput(fileName, filePhoto, size) {
    userImageBox.style.backgroundImage = `url(${filePhoto})`; // will be remove later
    // updating profile Name
   /* updateProfile(auth.currentUser, {
        photoURL: filePhoto

    }).then(() => {
        // display photo 
        userImageBox.style.backgroundImage = `url(${filePhoto})`;
        // ...
        // user alert
        userAlertText.innerHTML = "Profile Status: Photo Updated !"
        userAlert.classList.add("alert");
        setTimeout(() => {
            userAlert.classList.remove("alert");
            function auth_status_photo() // check auth status
        }, 3000);
        // ...
    }).catch((error) => {
        console.log(error);
        userAlertText.innerHTML = "Error in Updating Photo, Try Again !"
        userAlert.classList.add("alert");
        setTimeout(() => {
            userAlert.classList.remove("alert");
            function auth_status_photo() // check auth status
        }, 3000);
    })*/
    // ...
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
                //function auth_status_name(userName); // set auth default info if user info not edited
            }
            if (e.target.classList.contains("i-save")) {
                const userFullName = inputTag.value; // get value of the input
                // updating profile Name
                /*updateProfile(auth.currentUser, {
                    displayName: userFullName 

                }).then(() => {
                     closeSingleBtn(inputTag, subContainer); // enable close btn
                    // user alert
                    userAlertText.innerHTML = "Profile Status: Name Updated  !"
                    userAlert.classList.add("alert");
                    setTimeout(() => {
                        userAlert.classList.remove("alert");
                        function auth_status_name() // check auth status
                    }, 3000);
                    
                }).catch((error) => {
                    console.log(error);
                    userAlertText.innerHTML = "Error in Updating Profile Name, Try Again !"
                    userAlert.classList.add("alert");
                    setTimeout(() => {
                        userAlert.classList.remove("alert");
                        function auth_status_name() // check auth status
                    }, 3000);
                })*/
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
                        confirmAlert.classList.remove("collapse"); // remove confirm alert
                        
                        // Re-authentication of user
                            /*const user = auth.currentUser;
                            // prompt the user to re-provide their sign-in credentials
                            const credential = promptForCredentials();
                            reauthenticateWithCredential(user, credential)
                            .then(() => {
                                // User re-authenticated

                                // ...
                            }).catch((error) => {
                                // An error ocurred

                                // ...
                            })*/
                        // ...

                    }else if (e.target.classList.contains("close-confirm-alert")) {
                        closeSingleBtn(inputTag, subContainer); // enable close btn
                        confirmAlert.classList.remove("collapse"); // remove confirm alert
                    }
                }
                // ...

            }else if (e.target.classList.contains("i-close")) {
                closeSingleBtn(inputTag, subContainer); // enable close btn
                //auth_status_email() // set auth default info if user info not edited
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
};
function closeSingleBtn(inputTag, subContainer) {
    inputTag.setAttribute("readonly", true); // activating input tag
    inputTag.classList.remove("edit") // change state of the input'
    subContainer.querySelector(".i-edit").classList.remove("collapse"); // collapse edit btn
    subContainer.querySelector(".i-close").classList.remove("close"); // show close btn
}
// .....
