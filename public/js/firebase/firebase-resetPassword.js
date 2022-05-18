import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

const tagHidden = document.querySelectorAll(".l-hidden");
const tagShow = document.querySelectorAll(".l-visible");
const headerImage = document.querySelector(".image-text");


function resetPassword(email) {
    const auth = getAuth();
    if (email == undefined) {
        alertError.innerHTML = `Enter Email Please !`;
        alertWrap.classList.add("show");
        setTimeout(() => { 
            alertWrap.classList.remove("show");
        }, 3000)

    }else if (email) {
        try {
            sendPasswordResetEmail(auth, email)
            .then(() => {
                // notify user a message;
                alertError.innerHTML = `Verify link sent to ${email}, for password reset`;
                alertWrap.classList.add("show");
                setTimeout(() => { 
                    alertWrap.classList.remove("show");
                }, 3000);
                // ...
                setInterval(() => {
                    // return to the login page
                    tagHidden.forEach(el => {
                        el.classList.remove("show");
                    });
                    tagShow.forEach(el => {
                        el.classList.remove("show");
                    });
                    headerText.innerHTML = "LogIn";
                    headerImage.classList.remove("change");
                    // ...
                }, 4500)
                
            })
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;

            console.log(errorMessage);

            alertError.innerHTML = `Unable to send RESET link. Try Again !`;
            alertWrap.classList.add("show");
            setTimeout(() => { 
                alertWrap.classList.remove("show");
            }, 3000)
        }
    }
}
export { resetPassword };