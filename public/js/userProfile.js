// VARIABLES
const formContainer = document.querySelector(".user-update-content");
const userInputs = document.querySelectorAll(".content-input");
const editedButtons = document.querySelectorAll(".edit-btn");
const progressEL = document.querySelector(".upload-progress");
const contentOverall = document.querySelectorAll(".user-edited-content-container");
const nameTag = document.querySelector(".user-name-tag");
const emailTag = document.querySelector(".user-email-tag");
const telTag = document.querySelector(".user-tel-tag");
const passwordTag = document.querySelector(".user-password-tag");
const imageSubmit = document.querySelector(".image-submit");
const userAlert = document.querySelector(".user-edit-alert");
const userAlertText = userAlert.querySelector(".alert-text");
const userImageContainer = document.querySelector(".edited-image-wrap");
const imageFile = userImageContainer.querySelector(".image-file");
const userImageBox = userImageContainer.querySelector(".edited-image-container");
const coverImageBox = document.querySelector(".cover-image");
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
const restrictBtn = document.querySelector(".restrict-btn");
const btn_container = document.querySelector(".delete-btn");
const delete_button = btn_container.querySelector(".delete-wrap");
const closeButton = document.querySelector(".user-edited-close");
const noteWrapName = document.querySelector(".content-name");
const noteName = noteWrapPass.querySelector(".note");
const verifiedIconName = noteWrapPass.querySelector(".verify-icon");

let fullName = "", email = "", tel = "", photo = "";


// CLOSE BUTTON (TO RETURN BACK TO HOME PAGE)
closeButton.onclick = (e) => {
    if (e.target.classList.contains("i")) {
        window.location.assign("index");
    }
}
// ....
// REDIRECTING PAGE TO REGISTER WHEN USER NOT AUTH 
(function(){
    if (restrictBtn !== null) {
        restrictBtn.onclick = () => {
            window.location.assign("register")
        }
    } else {
    }
})();
// ......
// VERIFY CONTENTS IN DOM FOR UPDATE STATUS
(function(){
    const data = {fullName: nameTag.value, email: emailTag.value, tel: telTag.value}
    // save previous data in session store
    let prevData = "";
    setTimeout(async () => {
        prevData = await JSON.parse(sessionStorage.getItem("EP"));
        if (prevData == null) {
            // alert user with notification
            required_profile_update();
            console.log("required update");
            // ...
        }else if (prevData !== null) {
            if ((data.fullName !== prevData.fullName) || (data.email !== prevData.email) || (data.tel !== prevData.tel)) {
                update_done()
                console.log("profile done");
                // check again if profile is updated
                setTimeout(() => {
                    check_for_update(data)
                }, 3000);
                // ...
            }else {
                // check again if profile is updated
                check_for_update(data)
                // ...
            }
            //console.log(prevData);
        }
    }, 500);
    // delay update for 60 sec then update session storage
    setTimeout(() => {sessionStorage.setItem("EP", JSON.stringify(data))}, 5000);


    // showing image content in DOM
    const user_pic_url = userImageBox.getAttribute("data-user-pic");
    if (user_pic_url.endsWith("null")) {
        console.log("Awaiting server responds...");
    }else {
        userImageBox.style.backgroundImage = `url(${user_pic_url})`;
        coverImageBox.style.backgroundImage = `url(${user_pic_url})`;
        progressEL.classList.remove("collapse");  //  remove progress percentage bar
    }
    // ...
})();
// .....

// SELECTING PHOTO LOCALLY
(function(){
    // showing image content in DOM
    const user_pic_url = userImageBox.getAttribute("data-user-pic");

    if (user_pic_url.includes("https:")) { // FOR GOOGLE AUTH 2.0
        console.log("Awaiting for Server....");

    }else { // FOR LOCALLY
        userImageContainer.onclick = (e) => {
            if (e.target.classList.contains("edited-image-container")) {
                imageFile.click()
            }
        }
        imageFile.onchange = async (event) => {
            const file = event.target.files[0];
            const reader = new FileReader();
    
            const settings = {
                file: file,
                maxSize: 350, // changing this value determine the image quality and size
                fileType: file.type
            }
            let size = ""
            const imageResult = await resizeImage(settings);
    
            if (imageResult.blob.size <= 1024) {
                size = (parseInt(imageResult.blob.size) / 1024).toFixed(2); // to KB
            }else if (imageResult.blob.size > 1024) {
                size = (parseInt(imageResult.blob.size) / 1024).toFixed(2); // to MB
            }
            if (size > 2560) {
                // alert user with notification
                console.log("2.5mb max image size required");
            }else {
                    // alert user with notification
                userAlertText.innerHTML = "Photo Uploading ...";
                setTimeout(() => {
                    imageSubmit.click();
                }, 1500);
                
            }
        }
    }
        progressEL.classList.remove("collapse");  //  remove progress percentage bar
    // ...
})();
// ............
// USER PROFILE CONTENT
(function(){
    contentOverall.forEach(container => {
        // FOR FULL NAME
        if (container.querySelector(".content-name")) {
            const subContainer = container.querySelector(".content-name");
            subContainer.onclick = (e) => {
                const inputTag = subContainer.querySelector(".content-input");

                if (e.target.classList.contains("i-edit")) {
                    editSingleBtn(inputTag, subContainer); // enable edit btn
                    checkToShowSubmitButton(inputTag, subContainer) // check to show submit button or not

                }else if (e.target.classList.contains("i-close")) {
                    closeSingleBtn(inputTag, subContainer); // enable close btn
                    restore_default_name() // set auth default info if user info not edited
                }
                if (e.target.classList.contains("i-save")) {
                    const userFullName = inputTag.value; // get value of the input
                    // sending data to server 
                    setTimeout(() => {
                        inputTag.type = "submit"; // changing input type from "file" to "submit"
                        //sending data to server to be uploaded to database
                        inputTag.click();
                    }, 1000)
                    // ...
                }
            }
        }
        // FOR EMAIL
        if (container.querySelector(".content-email")) {
            const subContainer = container.querySelector(".content-email");
            subContainer.onclick = (e) => {
                const inputTag = subContainer.querySelector(".content-input");

                if (e.target.classList.contains("i-edit")) {
                    editSingleBtn(inputTag, subContainer); // enable edit btn
                    checkToShowSubmitButton(inputTag, subContainer) // check to show submit button or not
    
                }else if (e.target.classList.contains("i-close")) {
                    closeSingleBtn(inputTag, subContainer); // enable close btn
                    restore_default_email() // set auth default info if user info not edited
                }
                if (e.target.classList.contains("i-save")) {
                    const user_email = inputTag.value; // get value of the input
                    // sending data to server 
                    setTimeout(() => {
                        emailTag.type = "submit"; // changing input type from "file" to "submit"
                        //sending data to server to be uploaded to database
                        emailTag.click();
                    }, 1000)
                    
                    // ...
                }
            }
        }
        // FOR TEL
        if (container.querySelector(".content-tel")) {
            const subContainer = container.querySelector(".content-tel");
            subContainer.onclick = (e) => {
                const inputTag = subContainer.querySelector(".content-input");

                if (e.target.classList.contains("i-edit")) {
                    editSingleBtn(inputTag, subContainer); // enable edit btn
                    checkToShowSubmitButton(inputTag, subContainer) // check to show submit button or not
    
                }else if (e.target.classList.contains("i-close")) {
                    closeSingleBtn(inputTag, subContainer); // enable close btn
                    restore_default_tel() // set auth default info if user info not edited
                }
                if (e.target.classList.contains("i-save")) {
                    const user_tel = inputTag.value; // get value of the input
                    // sending data to server 
                    setTimeout(() => {
                        telTag.type = "submit"; // changing input type from "file" to "submit"
                        //sending data to server to be uploaded to database
                        telTag.click();
                    }, 1000)
                    // ...
                }
            }
        }
        // FOR PASSWORD
        if (container.querySelector(".content-password")) {
            const subContainer = container.querySelector(".content-password");
            const passwordEye = subContainer.querySelector(".password-eye");
            const tag = subContainer.querySelector(".content-input");
            const eyeOpen = document.querySelector(".e-1");
            const eyeClose = document.querySelector(".e-2");
            // make password visible
            passwordEye.onclick = (e) => {
                if (e.target.classList.contains("e-1")) {
                    e.target.classList.add("visible");
                    eyeClose.classList.add("visible")
                    tag.type = "text";

                }else if (e.target.classList.contains("e-2")) {
                    e.target.classList.remove("visible");
                    eyeOpen.classList.remove("visible");
                    tag.type = "password";
                }
            }
            // ....
            subContainer.onclick = (e) => {
                const inputTag = subContainer.querySelector(".content-input");

                if (e.target.classList.contains("i-edit")) {
                    editSingleBtn(inputTag, subContainer); // enable edit btn

                    let message = "forgot my password";
                    confirm_text_to_verify(message) // verify before update
                    authPassBtn.value = "Confirm" // change submit button text
                    inputTag.removeAttribute("readonly") // make input tag writable
                    passwordEye.classList.add("off")

                    // retype to auth word for verification
                    confirmAlert.onclick = (e) => {
                        if (e.target.classList.contains("re-auth-btn")) {
                            // get input value and verify to confirm
                            const inputValue = authPassInput.value;
                            if (inputValue == message) {
                                // set parameter needed       
                                confirmAlertText.innerHTML = "Verifying ...!"
                                setTimeout(() => {
                                    confirmAlertText.innerHTML = "Proceed to RESET PASSWORD...!"
                                }, 1000);
                                setTimeout(() => {
                                    confirmAlert.classList.remove("collapse");
                                }, 2500);
                                // ...
                            }else {
                                confirmAlertText.innerHTML = "Confirm words NOT MATCHED !";
                                passwordEye.classList.remove("off")
                                setTimeout(() => {
                                    confirmAlertText.innerHTML = `Re-type '''${message}''' to confirm !`;
                                }, 1500);
                            }
                            // ...
                        }else if (e.target.classList.contains("close-confirm-alert")) {
                            // restore to defaults
                            confirmAlertText.innerHTML = message;
                            authPassInput.value = "";
                            confirmAlert.classList.remove("collapse");
                            closeSingleBtn(inputTag, subContainer); // enable close btn
                            restore_default_password();
                            passwordEye.classList.remove("off");
                            // ...
                        }
                    }
                    // ...`
                    // check to show submit button or not
                    checkToShowSubmitButton(inputTag, subContainer) 
                    // ...
                }else if (e.target.classList.contains("i-close")) {
                    closeSingleBtn(inputTag, subContainer); // enable close btn
                    restore_default_password() // set auth default info if user info not edited
                    tag.type = "password";
                    eyeClose.classList.add("visible");
                    passwordEye.classList.remove("off");
                    eyeOpen.classList.remove("visible");
                    eyeClose.classList.remove("visible");
                }
                if (e.target.classList.contains("i-save")) {
                    const user_tel = inputTag.value; // get value of the input
                    // sending data to server 
                    setTimeout(() => {
                        passwordTag.type = "submit"; // changing input type from "file" to "submit"
                        //sending data to server to be uploaded to database
                        passwordTag.click();
                    }, 1000)
                    // ...
                }
            }
        }


    });
})();
// .....
// DELETE USER ACCOUNT
(function(){
    delete_button.onclick = (e) => {
        // activate verification alert 
            var message = "delete my account";
            confirm_text_to_verify(message)
            // ... re-auth-btn
            // click confirm alert btn to activate edit input
            confirmAlert.onclick = (e) => {
                if (e.target.classList.contains("re-auth-btn")) {
                    // get input value and verify to confirm
                    const inputValue = authPassInput.value;
                    if (inputValue == message) {
                        // set parameter needed       
                        confirmAlertText.innerHTML = "Initiating procedure ...!"
                        setTimeout(() => {
                            // send to server to complete process
                            authPassBtn.type = "submit";
                            authPassBtn.click()
                        }, 2000);
                        // ...
                    }else {
                        confirmAlertText.innerHTML = "Confirm words NOT MATCHED !";
                        setTimeout(() => {
                            confirm_text_to_verify(message)
                            //confirmAlertText.innerHTML = message;
                        }, 1500);
                    }
                    // ...
                }else if (e.target.classList.contains("close-confirm-alert")) {
                    // restore to defaults
                    confirmAlertText.innerHTML = message;
                    authPassInput.value = "";
                    confirmAlert.classList.remove("collapse");
                    // ...
                }
            }
             // ...
        // ...
    }
})();
// ...

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
    subContainer.querySelector(".save-btn").classList.remove("active"); // remove save btn
}
function showSubmitButton(subContainer) {
    subContainer.querySelector(".save-btn").classList.add("active"); // show save btn
}
function removeSubmitButton(subContainer) {
    subContainer.querySelector(".save-btn").classList.remove("active"); // remove save btn
}
function checkToShowSubmitButton(inputTag, subContainer) {
    inputTag.onkeyup = (e) => {
        (e.target.value !== "") ? showSubmitButton(subContainer) : removeSubmitButton(subContainer);
    }
}
function remove_alert() {
    setTimeout(() => {
        userAlert.classList.remove("alert");
    }, 3000);
}
function userAlert_red() {
    userAlert.style.background = "red";
    userAlert.classList.add("alert");
}
function userAlert_green() {
    userAlert.style.background = "green";
    userAlert.classList.add("alert");
}
function profile_verified() {
    userAlertText.innerHTML = "Profile Verified !";
    userAlert_green();
    noteEmail.classList.add("show");
    noteEmail.innerHTML = "Verified";
    verifiedIconEmail.classList.add("show");
}
function update_done() {
    // alert user with notification
    userAlertText.innerHTML = "Update Successful !";
    userAlert_green();
    // ...
}
function cancel_update_process() {
    userAlertText.innerHTML = "Update Canceled !";
    userAlert_red(); 
}
function required_profile_update(){
    userAlertText.innerHTML = "Profile Update Required !";
    userAlert_red(); 
}
function check_for_update(data) {
    if ((data.fullName == "") || (data.email == "") || (data.tel == "")){
        // alert user to update profile
        required_profile_update()
        // ...
    }else {
        profile_verified();
        remove_alert()

    }
}
async function restore_default_name() {
    const prevData = await JSON.parse(sessionStorage.getItem("EP"));
    const res = nameTag.value;
    //console.log(prevData, res);
    if (prevData == null) {
        required_profile_update();
        nameTag.value = "";
    }else {
        if (res == ""){
            nameTag.value = prevData.fullName; // restore previous info
            // alert user to update profile
            cancel_update_process();
            setTimeout(() => {profile_verified()}, 2000)
            remove_alert()
            // ...
        }else {
            profile_verified()
        }
    }
};
function restore_default_email() {
    const res = emailTag.value;
    if (res == ""){
        emailTag.value = "";
        // alert user to update profile
        required_profile_update();
        // ...
    }else {
        profile_verified()
    }
};
async function restore_default_tel() {
    const prevData = await JSON.parse(sessionStorage.getItem("EP"));
    const res = telTag.value;

    if (prevData == null) {
        required_profile_update();
        telTag.value = "";
    }else {
        if (res == ""){
            telTag.value = prevData.tel;
           // alert user to update profile
            cancel_update_process();
            setTimeout(() => {profile_verified()}, 2000);
            remove_alert()
           // ...
        }else {
            profile_verified()
        }
    }
};
async function restore_default_password() {
    const res = passwordTag.value;
    if (res == ""){
        passwordTag.value = "....";
       // alert user to update profile
        cancel_update_process();
        setTimeout(() => {profile_verified()}, 2000);
        remove_alert()
       // ...
    }
};
function confirm_text_to_verify(message) {
    const msg = message;
     // confirm alert to edit
    const authText = `Re-type '''${msg}''' to proceed !`

    confirmAlertText.innerHTML = authText;
    authPassBtn.value = "Delete Account";
    confirmAlert.classList.add("collapse"); // show overall alert page
    confirmAlertBtn.classList.add("collapse") // deactivate confirm button
    reAuthPage.classList.add("collapse"); // activate authentication page
}
var resizeImage = function (settings) {
    var file = settings.file;
    var maxSize = settings.maxSize;
    var reader = new FileReader();
    var image = new Image();
    var canvas = document.createElement('canvas');

    var dataURItoBlob = function (dataURI) {
        var bytes = dataURI.split(',')[0].indexOf('base64') >= 0 ?
            window.atob(dataURI.split(',')[1]) :
            window.decodeURI(dataURI.split(',')[1]);
        var mime = dataURI.split(',')[0].split(':')[1].split(';')[0];
        var max = bytes.length;
        var ia = new Uint8Array(max);
        for (var i = 0; i < max; i++)
            ia[i] = bytes.charCodeAt(i);
        return new Blob([ia], { type: mime });
    };

    var resize = function () {
        var width = image.width;
        var height = image.height;
        if (width > height) {
            if (width > maxSize) {
                height *= maxSize / width;
                width = maxSize;
            }
        } else {
            if (height > maxSize) {
                width *= maxSize / height;
                height = maxSize;
            }
        }
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext('2d');
        context.drawImage(image, 0, 0, width, height);
        //canvas.getContext('2d').drawImage(image, width / 4, height / 4, width / 2, height / 2, 0, 0, 150, 150);
        var dataUrl = canvas.toDataURL(`${settings.fileType}`);
        
        //console.log("BLOB DATA:", dataUrl, dataURItoBlob(dataUrl), dataURItoBlob(dataUrl).size);
        const data = {blob: dataURItoBlob(dataUrl), url: dataUrl}
        return data;
    };
    // loading image url here
    return new Promise(function (ok, no) {
        if (!file.type.match(/image.*/)) {
            no(console.log("Not an image"));
            return;
        }
        reader.onload = function (readerEvent) {
            image.onload = function () { return ok(resize()); };
            image.src = readerEvent.target.result;
        };
        reader.readAsDataURL(file);
    });
};


