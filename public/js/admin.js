const nav1 = document.querySelector(".nav-wrap");
const nav2 = document.querySelector(".nav-container");
const menu = document.querySelector(".hunburger-container");

// SIGN IN VARIABLES
const signOutBtn = document.querySelector(".sign-out-btn");
const signOutIcon = document.querySelector(".login-in-icon");
const signBanner = document.querySelector(".sign-banner");

// FORM SUBMISSION
const form = document.querySelector(".signIn-container");
class DataList {
    async list() {
        var result = await fetch("/public/json/admin/admin.json");
        var data = await result.json();
        
        var res = data.signInData;
        res.map(el => {
            var {companyName} = el.sys;
            var {adminId, password} = el.fields;
            return (companyName, adminId, password)
        })
        return res
    }
}
class LogicData {
    variables(res) {

        //variables 
        var alertEl = document.querySelectorAll(".cell");
        var inputs = document.querySelectorAll(".inputs");

        // to remove the red notice when any key is press
        inputs.forEach(input => {
            input.onkeyup = (e) => {
                if (e.target.classList.contains("admin-input") || e.target.classList.contains("password")) {
                    alertEl.forEach(alert => {
                        alert.classList.remove("red-notice");
                    })
                }
            }
        })
        
        // run these codes when the enter key is pressed on keyboard
        form.addEventListener("submit", submitForm);
        function submitForm(el) {
            try {
                el.preventDefault();

                var adminEl = document.querySelector(".admin-input").value;
                var passEl = document.querySelector(".password").value;
                var alerts = document.querySelectorAll(".cell");
                var checkers = document.querySelectorAll(".checker");

                var objData;
                // input admin id, if correct get that result
                objData = findData(adminEl);
                //console.log(objData);
                

                if (passEl === objData.fields.password ) {
                    // opening to another page after submission
                    // GO TO THE DATABASE JS FILE AND USE THE DATABASE EXTENSION URL....
                    // ....AND LINK IT THE DATABASE JS FILE.
                    var databaseUrl = objData.fields.databaseUrl;

                    // the setTimeOut function is set to delay the progress and allow the animate to complete before executing the rest of the code.
                    setInterval(() => {
                        window.location.href = `${databaseUrl}`;
                        console.log("password correct");
                    }, 5000);

                    setTimeout(() => {
                        const adminImg = document.querySelector(".user-image-container");
                        const welcomeNote = document.querySelector(".welcome-note");

                        adminImg.classList.add("fade-left")
                        welcomeNote.classList.add("fade-right")
                    }, 150);

                    // displaying the welcome text and the image of the company
                    setTimeout(() => {
                        welcomeDisplay(objData);
                        const contentTitle = document.querySelector(".content-title");
                        contentTitle.classList.add("off");
                    }, 0);
                    
                    
                    // add the correct icon when password matches with database
                    checkers.forEach(checker => {
                        checker.classList.add("visible")
                    })
                    alerts.forEach(alert => {
                        alert.classList.remove("red-notice");
                    })
                }else{
                    //if password is does not march with database, then alert in red color
                    alerts.forEach(alert => {
                        alert.classList.add("red-notice");
                    });
                    checkers.forEach(checker => {
                        checker.classList.remove("visible")
                    })
                }
            } catch (error) {
                console.log(error);
            }
        }
        function findData(adminEl) {
            // comparing the user input to the admin id of the database
            var dataRes = res.find(el => {
                if (el.fields.adminId == adminEl) {
                    return (el.fields.adminId)
                }else{
                    var alerts = document.querySelectorAll(".cell");
                    alerts.forEach(alert => {
                        alert.classList.add("red-notice");
                    });
                    return ""
                }
            });
            return dataRes
        }
        function welcomeDisplay(objData) {
            var displayItem = `
            <div class="user-image-container">
                <div class="user-image"><img src=${objData.fields.img} alt=""></div>
            </div>
            <div class="welcome-note">Hi ${objData.sys.companyName}</div>
            `;
            const mediaBanner = document.querySelector(".media-banner");
            mediaBanner.classList.add("visible");
            mediaBanner.innerHTML = displayItem;

        } 
    }
    
}

document.addEventListener("DOMContentLoaded", () => {
    var dataList = new DataList();
    var logic = new LogicData()

    dataList.list().then(res => {
        logic.variables(res)
    })
})