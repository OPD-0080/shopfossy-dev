import {UI} from './main-categories/categories.js';
import {setCartValues} from './components/set_cart_values.js';
import {ashanti_reg, greater_accra_reg} from './form/cityList.js';
import {firestore_form} from './components/firestore_form.js';

import { getAuth,  onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

var newUI = new UI();
var cart = newUI.setApp(cart);
console.log(cart);

var formCloseBtn = document.querySelector(".form-close");
var formWrap = document.querySelector(".form-banner-container");
var formLogo = document.querySelector(".logo");
var checkOutBtn = document.querySelector(".cart-checkout");
var cityOptionEl = document.querySelector(".citySel");
var formContent = document.querySelector(".form-content");
var deliveryContent = document.querySelector(".delivery-content");
var paymentContent = document.querySelector(".payment-content");
var summaryContent = document.querySelector(".summary-content");


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
            
            FirebaseDatabase(uid);

            // collapsing signLog page form
          // ...
        } else {
            console.log("Don't have an account. Sign In");
          // User is signed out
            //window.location.assign("/index.html");
          // ...
        }
    });
}onAuthState();



var inputs = document.querySelectorAll("input");
var first_name, last_name, email, number, company, region, city, residential, digital, agreement;

inputs.forEach(input => {
    input.onkeyup = (e) => {
        var alertEl = e.target.previousElementSibling.children[0];
        if (e.target.classList.contains("first-name")) {
            first_name = e.target.value;
            
            // alerting user if input is empty or not
            alertEl.classList.add("on");
            if (e.target.value == "") {
                alertEl.classList.remove("on");
            }
        }
        if (e.target.classList.contains("last-name")) {
            last_name = e.target.value;
            
            // alerting user if input is empty or not
            alertEl.classList.add("on");
            if (e.target.value == "") {
                alertEl.classList.remove("on");
            }
        }
        if (e.target.classList.contains("email")) {
            email = e.target.value;

            // alerting user if input is empty or not
            alertEl.classList.add("on");
            if (e.target.value == "") {
                alertEl.classList.remove("on");
            }
        }
        if (e.target.classList.contains("tel")) {
            number = e.target.value;

            // alerting user if input is empty or not
            alertEl.classList.add("on");
            if (e.target.value == "") {
                alertEl.classList.remove("on");
            }
            else if (number.length > 11) {
                alertEl.classList.remove("on");
            }
        }
        if (e.target.classList.contains("company")) {
            var companyEl = e.target;

            // alerting user if input is empty or not
            /*alertEl.classList.add("on");
            if (e.target.value == "") {
                alertEl.classList.remove("on");
            }**/
            // for option only
            if (companyEl.value == "") {
                company = "Not Defined";
            }else {
                company = companyEl.value
            }
        }
        if (e.target.classList.contains("region")) {
            region = e.target;

            // alerting user if input is empty or not
            alertEl.classList.add("on");
            if (e.target.value == "") {
                alertEl.classList.remove("on");
            }

            var regionDrop = document.querySelector(".region-option");
            regionDrop.classList.add("drop");
            var regionOpt = document.querySelectorAll(".region-select");
            regionOpt.forEach(opt => {
                opt.onclick = (e) => {
                    var regionVal = e.target.innerText;
                    //console.log(regionVal);
                    region.value = regionVal;
                    region = region.value;
                    regionDrop.classList.remove("drop");

                
                    if (region == "Ashanti") {
                        //console.log(ashanti_reg);
                        var res = ""
                        ashanti_reg.forEach(data => {
                            res += `
                                <span class="city-select" value="">${data}</span>
                            `
                        });
                        cityOptionEl.innerHTML = res;

                        // alerting user if input is empty or not
                        alertEl.classList.add("on");
                        if (e.target.value == "") {
                            alertEl.classList.remove("on");
                        }

                    }else if (region == "Greater Accra") {
                        //console.log(greater_accra_reg);
                        var res = ""
                        greater_accra_reg.forEach(data => {
                            res += `
                                <span class="city-select" value="">${data}</span>
                            `
                        });
                        cityOptionEl.innerHTML = res;

                        // alerting user if input is empty or not
                        alertEl.classList.add("on");
                        if (e.target.value == "") {
                            alertEl.classList.remove("on");
                        }
                    }
                }
            });
            formContent.onclick = (e) => {
                regionDrop.classList.remove("drop");
            }
        }
        if (e.target.classList.contains("city")) {
            city = e.target;

            // alerting user if input is empty or not
            alertEl.classList.add("on");
            if (e.target.value == "") {
                alertEl.classList.remove("on");
            }

            var cityDrop = document.querySelector(".city-option");
            cityDrop.classList.add("drop");
            var cityOpt = document.querySelectorAll(".city-select");
            /*cityOpt.forEach(opts => {
                var optText = opts.innerHTML;
                console.log(optText);
            })*/
            cityOpt.forEach(opt => {
                opt.onclick = (e) => {
                    var cityVal = e.target.innerText;
                    //console.log(cityVal);
                    city.value = cityVal;
                    city = city.value;
                    cityDrop.classList.remove("drop");
                }
            });
            formContent.onclick = (e) => {
                cityDrop.classList.remove("drop");
            }
        }
        if (e.target.classList.contains("residential")) {
            residential = e.target.value;

            // alerting user if input is empty or not
            alertEl.classList.add("on");
            if (e.target.value == "") {
                alertEl.classList.remove("on");
            }
        }
        if (e.target.classList.contains("digital")) {
            digital = e.target.value;

            // alerting user if input is empty or not
            alertEl.classList.add("on");
            if (e.target.value == "") {
                alertEl.classList.remove("on");
            }
        }
    }
});
var agreementEl = document.querySelector(".agreement");
var fbt1 = document.querySelector(".fbtn1");
agreementEl.onclick = (e) => {
    if (e.target.checked = true) {
        agreement = "checked"
        // to activate "proceed to next" btn
        fbt1.classList.add("activated")
    }else {
        agreement = "Unchecked";
        fbt1.classList.remove("activated")
    }
}

var newSetValues = new setCartValues(cart)
var total_purchased = newSetValues.total;
var items_purchased = newSetValues.itemAll;


// DELIVERY METHOD START
var delivery_radio = document.querySelectorAll(".delivery-check");
var fbt2 = document.querySelector(".fbtn2");
var delivery_header;
delivery_radio.forEach(radio => {
    radio.onclick = (e) => {
        var radio = e.target;
        if (radio.classList.contains("radio_1")) {
            if (radio.checked = true) {
                delivery_header = radio.parentElement.children[1].innerText;

                var radio_content_El = radio.nextElementSibling.nextElementSibling;
                radio_content_El.classList.add("expand");

                // unchecked and collapsing content after another radio is selected;
                var radio_uncheck_2 = radio.parentElement.nextElementSibling.children[0];
                var radio_content_2 = radio.parentElement.nextElementSibling.children[2];
                //var radio_uncheck_3 = radio.parentElement.nextElementSibling.nextElementSibling.children[0];
                //var radio_content_3 = radio.parentElement.nextElementSibling.nextElementSibling.children[2];
                radio_uncheck_2.checked = false;
                radio_content_2.classList.remove("expand");
                //radio_uncheck_3.checked = false;
                //radio_content_3.classList.remove("expand");

                // activating submit btn in the DOM 
                fbt2.classList.add("activated");

                return (delivery_header)
            }
        }else if (radio.classList.contains("radio_2")) {
            if (radio.checked = true) {
                delivery_header = radio.parentElement.children[1].innerText;
                
                var radio_content_El = radio.nextElementSibling.nextElementSibling;
                radio_content_El.classList.add("expand");

                // unchecked and collapsing content after another radio is selected;
                var radio_uncheck_1 = radio.parentElement.previousElementSibling.children[0];
                var radio_content_1 = radio.parentElement.previousElementSibling.children[2];
                //var radio_uncheck_3 = radio.parentElement.nextElementSibling.children[0];
                //var radio_content_3 = radio.parentElement.nextElementSibling.children[2];
                radio_uncheck_1.checked = false;
                radio_content_1.classList.remove("expand");
                //radio_uncheck_3.checked = false;
                //radio_content_3.classList.remove("expand");

                // activating submit btn in the DOM 
                fbt2.classList.add("activated");

                return (delivery_header)
            }
        }
    }
})
// DELIVERY METHOD END


// PAYMENT METHOD START
var payment_radio = document.querySelectorAll(".payment-check");
var fbt3 = document.querySelector(".fbtn3");
var payment_header;
payment_radio.forEach(radio => {
    radio.onclick = (e) => {
        var radio = e.target;
        if (radio.classList.contains("radio_1")) {
            if (radio.checked = true) {
                payment_header = radio.parentElement.children[1].innerText;

                var radio_content_El = radio.nextElementSibling.nextElementSibling;
                radio_content_El.classList.add("expand");

                // unchecked and collapsing content after another radio is selected;
                var radio_uncheck_2 = radio.parentElement.nextElementSibling.children[0];
                var radio_content_2 = radio.parentElement.nextElementSibling.children[2];
                //var radio_uncheck_3 = radio.parentElement.nextElementSibling.nextElementSibling.children[0];
                //var radio_content_3 = radio.parentElement.nextElementSibling.nextElementSibling.children[2];
                radio_uncheck_2.checked = false;
                radio_content_2.classList.remove("expand");
                //radio_uncheck_3.checked = false;
                //radio_content_3.classList.remove("expand");

                // activating submit btn in the DOM 
                fbt3.classList.add("activated");

                return (payment_header)
            }
        }else if (radio.classList.contains("radio_2")) {
            if (radio.checked = true) {
                payment_header = radio.parentElement.children[1].innerText;
                
                var radio_content_El = radio.nextElementSibling.nextElementSibling;
                radio_content_El.classList.add("expand");

                // unchecked and collapsing content after another radio is selected;
                var radio_uncheck_1 = radio.parentElement.previousElementSibling.children[0];
                var radio_content_1 = radio.parentElement.previousElementSibling.children[2];
                //var radio_uncheck_3 = radio.parentElement.nextElementSibling.children[0];
                //var radio_content_3 = radio.parentElement.nextElementSibling.children[2];
                radio_uncheck_1.checked = false;
                radio_content_1.classList.remove("expand");
                //radio_uncheck_3.checked = false;
                //radio_content_3.classList.remove("expand");

                // activating submit btn in the DOM 
                fbt3.classList.add("activated");

                return (payment_header)
            }
        }
    }
})
// PAYMENT METHOD END

// EDIT BUTTONS START
var editWrap = document.querySelectorAll(".edited-wrap");
var okWrap = document.querySelectorAll(".ok-wrap");
//var ok_1 = document.querySelector("ok-1")
editWrap.forEach(btn => {
    btn.onclick = (e) => {
        if (e.target.classList.contains("edit-1")) {
            var edit_btn = e.target;
            formContent.classList.remove("collapse");
            deliveryContent.classList.remove("collapse");
            paymentContent.classList.remove("collapse");
            summaryContent.classList.remove("collapse");

            // showing off ok alert after btn is triggered;
            var okEl = edit_btn.previousElementSibling.previousElementSibling;
            okEl.classList.remove("off");

            // omitting previous ok-icon when btn is triggered
            okWrap.forEach(el => {
                if (el.classList.contains("ok-2")) {el.classList.remove("off")};
                if (el.classList.contains("ok-3")) {el.classList.remove("off")}
            })
        }
        if (e.target.classList.contains("edit-2")) {
            var edit_btn = e.target;
            deliveryContent.classList.add("collapse");
            paymentContent.classList.remove("collapse");
            summaryContent.classList.remove("collapse");

            // showing off ok alert after btn is triggered;
            var okEl = edit_btn.previousElementSibling.previousElementSibling;
            okEl.classList.remove("off");

            // omitting previous ok-icon when btn is triggered
            okWrap.forEach(el => {
                if (el.classList.contains("ok-3")) {el.classList.remove("off")};
            })
        }
        if (e.target.classList.contains("edit-3")) {
            var edit_btn = e.target;

            paymentContent.classList.add("collapse");
            deliveryContent.classList.remove("collapse");
            summaryContent.classList.remove("collapse");

            // showing off ok alert after btn is triggered;
            var okEl = edit_btn.previousElementSibling.previousElementSibling;
            okEl.classList.remove("off");
        }
    }
})
// EDIT BUTTONS END


var first_name_val, last_name_val, email_val, number_val, company_val, region_val, city_val, 
residential_val, digital_val, delivery_val, payment_val
function summary_variables() {
    first_name_val = document.querySelector(".fst_name");
    last_name_val = document.querySelector(".lst_name");
    email_val = document.querySelector(".s-email");
    number_val = document.querySelector(".s-tel");
    company_val = document.querySelector(".s-company");
    region_val = document.querySelector(".s-region");
    city_val = document.querySelector(".s-city");
    residential_val = document.querySelector(".s-residential");
    digital_val = document.querySelector(".s-digital");
    delivery_val = document.querySelector(".s-delivery");
    payment_val = document.querySelector(".s-payment");
}

var formBtnEl = document.querySelectorAll(".form-btn");
var customerArray = [];
formBtnEl.forEach(btn => {
    btn.onclick = (e) => {
        if (e.target.classList.contains("fbtn1")) {
            // checking if variables are not entered
            if (first_name == undefined || last_name == undefined || email == undefined || number == undefined || region == undefined || city == undefined || residential == undefined || digital == undefined || agreement == "Unchecked") {
                
                //  alert user error with message in DOM


            }else {
                try {
                    console.log("done");

                    //console.log(response, total_purchased, items_purchased, customerInfo);
                
                    // customer variables start
                    var customerInfo = {};
                    customerInfo.first_name = first_name;
                    customerInfo.last_name = last_name;
                    customerInfo.email = email;
                    customerInfo.number = number;
                    customerInfo.company = company;
                    customerInfo.region = region;
                    customerInfo.city = city;
                    customerInfo.residential = residential;
                    customerInfo.digital = digital;
                    customerInfo.agreement = agreement;
                    // customer variables end
    
                    // customer items purchased start
                    var response = cart.map(el => {
                        var id, UID, title, price, imgUrl, seller, category, amount;
    
                        UID = el.UID;
                        id = el.id;
                        title = el.title;
                        price = el.price;
                        imgUrl = el.imgUrl;
                        seller = el.seller;
                        category = el.subCategory;
                        amount = el.amount;

    
                        var cartObj = {id, UID, title, price, imgUrl, seller, category, amount};
                        return (cartObj)
                    })
                    // customer items purchased end
                    //console.log(response, total_purchased, items_purchased, customerInfo);
                    customerArray = [response, total_purchased, items_purchased, customerInfo]
                    console.log(customerArray);
                    // saving customer_details here 
                    Storage.saveCustomerInfo(customerArray);

                    // showing on ok alert after btn is triggered
                    var ok_1 = document.querySelector(".ok-1");
                    ok_1.classList.add("off");
    
                    // open the next slide
                    setTimeout(() => {
                        formContent.classList.add("collapse");
                        deliveryContent.classList.add("collapse");
                        summaryContent.classList.remove("active")
                    }, 2000);
                } catch (error) {
                    console.log(error);
                }
            }
        }else if (e.target.classList.contains("fbtn2")) {
            // variable of delivery method
            delivery_header
            console.log(delivery_header);

            // showing on ok alert after btn is triggered
            var ok_2 = document.querySelector(".ok-2");
            ok_2.classList.add("off");

            // open the next slide
            setTimeout(() => {
                //formContent.classList.add("collapse");
                deliveryContent.classList.remove("collapse");
                summaryContent.classList.remove("active");
                paymentContent.classList.add("collapse");
            }, 2000);

        }else if (e.target.classList.contains("fbtn3")) {
            // variable of payment method
            payment_header
            console.log(payment_header);

            // showing on ok alert after btn is triggered
            var ok_3 = document.querySelector(".ok-3");
            ok_3.classList.add("off");

            // open the next slide
            setTimeout(() => {
                //formContent.classList.add("collapse");
                paymentContent.classList.remove("collapse");
                deliveryContent.classList.remove("collapse");
                summaryContent.classList.add("collapse")
            }, 2000);

            // Summary Details here
            summary_details()

        }
    }
})
function summary_details() {
    // getting customerInfo from local Storage
    var customerInfo = Storage.getCustomerInfo();
    // getting the delivery method text
    delivery_header, payment_header
    
    //console.log(customerInfo);
    // summary variables
    summary_variables();
    console.log(customerInfo[3]);
    // Assigning variables for DOMEl display
    first_name_val.innerHTML = customerInfo[3].first_name;
    last_name_val.innerHTML = customerInfo[3].last_name;
    email_val.innerHTML = customerInfo[3].email;
    number_val.innerHTML = customerInfo[3].number;
    company_val.innerHTML = customerInfo[3].company;
    region_val.innerHTML = customerInfo[3].region;
    city_val.innerHTML = customerInfo[3].city;
    residential_val.innerHTML = customerInfo[3].residential;
    digital_val.innerHTML = customerInfo[3].digital;
    delivery_val.innerHTML = delivery_header;
    payment_val.innerHTML = payment_header;
}

// SUBMISSION OF DATA TO FIRESTORE DATABASE START
function FirebaseDatabase(uid) {
        
    var formBtn = document.querySelector(".form-container"); 
    formBtn.addEventListener("submit", (e) => {
        e.preventDefault();

        // getting customerInfo from local Storage
        var customerInfo = Storage.getCustomerInfo();
        // getting the delivery method text
        delivery_header, payment_header
        
        console.log(customerInfo);
        
        // SUBMISSION TO DATABASE
        firestore_form(uid, customerInfo, delivery_header, payment_header);

    });

// SUBMISSION OF DATA TO FIRESTORE DATABASE END
}
FirebaseDatabase()

class Storage {
    static saveCustomerInfo(customerArray) {
        localStorage.setItem("customerInfo", JSON.stringify(customerArray))
    }
    static getCustomerInfo() {
        if (localStorage.getItem("customerInfo")) {
            return JSON.parse(localStorage.getItem("customerInfo"))
        }
        else {
            return []
        }
    }
}

/*
// FORM SUBMISSION START
import {firestore_form} from './components/firestore_form.js';

var form = document.querySelector("#form");
try {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        // customer variables start
        var customerInfo = {};
        customerInfo.first_name = first_name;
        customerInfo.last_name = last_name;
        customerInfo.email = email;
        customerInfo.number = number;
        customerInfo.company = company;
        customerInfo.region = region;
        customerInfo.city = city;
        customerInfo.location = location;
        customerInfo.agreement = agreement;
        // customer variables end

        // customer items purchased start
        var response = cart.map(el => {
            var title, price, imgUrl, seller, category;

            title = el.title;
            price = el.price;
            imgUrl = el.imgUrl;
            seller = el.seller;
            category = el.subCategory;

            var cartObj = {title, price, imgUrl, seller, category};
            return (cartObj)
        })
        // customer items purchased end
        //console.log(response, total_purchased, items_purchased, customerInfo);

        // submit ALERT start
            var alertEl = document.querySelector(".form-alert");
            alertEl.classList.add("alert-on");
            setTimeout(() => {alertEl.classList.remove("alert-on")}, 2500);
        // submit ALERT end

        // firestore database for form start
            firestore_form(response, total_purchased, items_purchased, customerInfo)
        // firestore database for form end

        // to reset form after submit btn is triggered
        form.reset();

        // getting back to initial page after form is submitted
        setTimeout(() => {window.location.href = "/company-name-1.html"}, 5000);
    })
}catch (error) {
    console.log(error);
}
*/
