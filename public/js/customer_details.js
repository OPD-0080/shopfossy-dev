import {UI} from './main-categories/categories.js';
import {setCartValues} from './components/set_cart_values.js';
import {ashanti_reg, greater_accra_reg} from './form/cityList.js';
//import {firestore_form} from './components/firestore_form.js';
//import { getAuth,  onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

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
var requestSignInWrap = document.querySelector(".request-signIn-page");
var orderedContent = document.querySelector(".order-content");

// SHOW CART ORDERED AS PREVIEW
var orderedRes = "";
cart.forEach(el => {
    orderedRes += `
    <div>
        <div class="order-image-wrap">
            <img src="img/main-categories/${el.imgUrl}" alt="img">
            <input type="text" name="order_img" id="order_img" readonly value="img/main-categories/${el.imgUrl}">
        </div>
        <div class="ordered-des">
            <ul>
                <li> Name: <input type="text" name="order_title" id="order_title" readonly value="${el.title}"></li>
                <li> UID: <input type="text" name="order_UID" id="order_UID" readonly value="${el.UID}"></li>
                <li> Price: GHC <input type="text" name="order_price" id="order_price" readonly value="${el.price}"></li>
                <li> Qty: <input type="text" name="order_amount" id="order_amount" readonly value="${el.amount}"></li>
            </ul>
        </div>
    </div>
    `;
    orderedContent.innerHTML = orderedRes;
})
// .....
// SHOW SERIAL CODE 
function serialCode() {
    const base = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-@0123456789"

    const generate = (length) => {
        var show = "";
        for (let i = 0; i < length; i++) {
            show += base.charAt(Math.floor(Math.random() * base.length))
        }
        return show;
    }
    return generate(5)
}
sessionStorage.setItem("serialCode", JSON.stringify(serialCode()));
document.querySelector(".serial-code-wrapper").innerHTML = `Serial #: <input type="text" name="order_number" id="order_number" readonly value="${JSON.parse(sessionStorage.getItem("serialCode"))}">`;
// ...


// BILL TO START
var inputs = document.querySelectorAll("input");
var first_name, last_name, email, number, company, region, city, city_alt, residential, digital, agreement;

inputs.forEach(input => {
    input.onkeyup = (e) => {

        // get notify element
        var alertEl = e.target.previousElementSibling.children[0];

        if (e.target.classList.contains("first-name")) {
            first_name = e.target.value;
            
            // alerting user if input is empty or not
            if (e.target.value.length >= e.target.getAttribute("minlength")) {
                alertEl.classList.add("color");
            }else if (e.target.value == "" ) {alertEl.classList.remove("color");}
            else {alertEl.classList.remove("color");}

        }
        if (e.target.classList.contains("last-name")) {
            last_name = e.target.value;
            
            // alerting user if input is empty or not
            if (e.target.value.length >= e.target.getAttribute("minlength")) {
                alertEl.classList.add("color");
            }else if (e.target.value == "" ) {alertEl.classList.remove("color");}
            else {alertEl.classList.remove("color");}
        }
        if (e.target.classList.contains("email")) {
            var regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            
            if (e.target.value.match(regexp)) {
                email = e.target.value;
                // alert user
                alertEl.classList.add("color");
            }else {
                alertEl.classList.remove("color");
            }
        }
        if (e.target.classList.contains("tel")) {
            //checking for only numbers being input
            
            if (Number(e.target.value)) {
                number = Number(e.target.value);
                if (e.target.value.length >= e.target.getAttribute("maxlength")) {
                    alertEl.classList.add("color");
                }else if (e.target.value == "" ) {alertEl.classList.remove("color");}
                else {alertEl.classList.remove("color");}
            }else {alertEl.classList.remove("color");}
            // ...
            // alerting user if input is empty or not
        }
        if (e.target.classList.contains("company")) {
            var companyEl = e.target;

            // for option only
            if (companyEl.value == "" || companyEl.value == undefined) {
                company = "None";
                alertEl.classList.remove("color");
            }else {
                company = companyEl.value
                alertEl.classList.add("color");
            }
        }
        if (e.target.classList.contains("residential")) {
            residential = e.target.value;

            // alerting user if input is empty or not
            if (e.target.value.length >= e.target.getAttribute("minlength")) {
                alertEl.classList.add("color");
            }else if (e.target.value == "" ) {alertEl.classList.remove("color");}
            else {alertEl.classList.remove("color");}
        }
        if (e.target.classList.contains("digital")) {
            var note = e.target.nextElementSibling.nextElementSibling;

            if (e.target.value.match("[A-Z, A-z, a-z]{2}[0-9]{3}[0-9]{4}")) {
                digital = e.target.value;
                // alert user
                alertEl.classList.add("color");
                note.style.visibility = "hidden";
            }
            else {
                note.style.visibility = "visible";
                note.innerHTML = "* Required Format needed: AZ####### , ignore spacing *";
                note.style.background = "red";
                alertEl.classList.remove("color");
            }
        }
    }
});

// DISPLAYING CURRENT USER INFO IN CHECKOUT PAGE
function set_default_parameters_in_checkout() {
    const companyInputTag = formContent.querySelector(".company");
    const emailInputTag = formContent.querySelector(".email");

    // For company input tag (set default value to None)
    company = companyInputTag.value;
    // ...........................
    // For email input tag
    if (emailInputTag.value !== "" || emailInputTag.value !== null || emailInputTag.value !== undefined) {
        // display current user email to the input tag
        email = emailInputTag.value;
        emailInputTag.previousElementSibling.children[0].classList.add("color"); // indicator to green color
    }else {
        emailInputTag.previousElementSibling.children[0].classList.remove("color"); // indicator to red color
    }
}
set_default_parameters_in_checkout()
// .......................................

// SELECT REGION AND CITY 
var selectedOptionRegion = document.querySelectorAll(".select-option-region");
selectedOptionRegion.forEach(el => {
    el.onchange = (e) => {

        region =  e.target.value;
        // user alert
        var alertEl = e.target.parentElement.parentElement.children[0].children[0];
        alertEl.classList.add("color");
        
        if (region == "Ashanti" || region == "ashanti") {
            //console.log(ashanti_reg);
            var res = ""
            ashanti_reg.forEach(data => {
                res += `
                <option class="select-option-city" value="${data}">${data}</option>
                `
            });
            cityOptionEl.innerHTML = res;

        }else if (region == "Greater Accra" || region == "greater accra") {
            //console.log(ashanti_reg);
            var res = ""
            greater_accra_reg.forEach(data => {
                res += `
                <option class="select-option-city" value="${data}">${data}</option>
                `
            });
            cityOptionEl.innerHTML = res;
        }
    }
})
var selectedOptionCity = document.querySelectorAll(".select-option-city");
var cityAltEl = document.querySelector(".city-alt");
cityAltEl.onkeyup = (e) => {
    var alertEl = e.target.parentElement.children[0].children[0];
    if (e.target.value.length >= e.target.getAttribute("minlength")) {
        city_alt = e.target.value;
        alertEl.classList.add("color");
    }else if (e.target.value == "" ) {alertEl.classList.remove("color");}
    else {alertEl.classList.remove("color");}
}
selectedOptionCity.forEach(el => {
    el.onchange = (e) => {
        city =  e.target.value;
         // user alert
        var alertEl = e.target.parentElement.parentElement.children[0].children[0];
        alertEl.classList.add("color");
    }
})
// ..............................
// TOGGLE BUTTON START
const toggleWrap = document.querySelector(".toggle-btn-wrap");
toggleWrap.onclick = (e) => {
    if (e.target.classList.contains("toggle-btn")) {
        e.target.classList.toggle("active");
        toggleWrap.classList.toggle("shift");

        // switch input
        e.target.parentElement.previousElementSibling.classList.toggle("on");
        e.target.parentElement.parentElement.children[2].classList.toggle("on")
    }
}
// TOGGLE BUTTON END

var agreementEl = document.querySelector(".agreement");
var fbt1 = document.querySelector(".fbtn1");
agreementEl.onclick = (e) => {
    if (e.target.checked = true) {
        agreement = e.target.value;
        // to activate "proceed to next" btn
        fbt1.classList.add("activated")
    }else {
        agreement = "Unchecked";
        fbt1.classList.remove("activated")
    }
}
// BILL TO END

var newSetValues = new setCartValues(cart);
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
                delivery_header = e.target.value;

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
                delivery_header = e.target.value;
                
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
var eds = document.querySelectorAll(".eds");
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

// CUSTOMER DETAILS VARIABLES
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
// ...

// PROCEED BUTTONS START
var formBtnEl = document.querySelectorAll(".form-btn");
var validateInput = document.querySelectorAll(".validation");
const digitalDefaultInput = document.querySelector(".digital");
var customerArray = [];
formBtnEl.forEach(btn => {
    btn.onclick = (e) => {
        if (e.target.classList.contains("fbtn1")) {
            
            // checking if variables are not entered;
            var message = "";
            validateInput.forEach(validate => {
                if (!validate.checkValidity()) {
                    message = "error"
                    return message;
                }   
            })
            if (message) {
                // alert user error
                var validateError = document.querySelector(".user-alert");
                const error = validateError.querySelector("#error");
                error.innerHTML = "Please Validate Inputs ! ";
                validateError.classList.add("on");
                setTimeout(() => {validateError.classList.remove("on")}, 5000);
            }else {
                try {
                    // Enable edited button
                    eds.forEach(el => {
                        if (el.classList.contains("form-title") || el.classList.contains("delivery-title")){
                            el.classList.add("off")
                        }
                    })
                    // ...

                    // make city logic
                    if (cityAltEl.value == "Not Specified") {
                        city
                    }else if (city == undefined || city == null || city == "" || city == "Not Specified") {
                        city = city_alt
                    }
                    // ...
                    //make digital address logic
                    if (digitalDefaultInput.value == "Not Specified" || digitalDefaultInput.value == "") {
                        digital = digitalDefaultInput.value;
                    }
                     // ...

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
                    // ...
                    // showing on ok alert after btn is triggered
                    var ok_1 = document.querySelector(".ok-1");
                    ok_1.classList.add("off");
                    // ...
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

            // showing on ok alert after btn is triggered
            var ok_2 = document.querySelector(".ok-2");
            ok_2.classList.add("off");
            // ...
            // Enable edited button
            eds.forEach(el => {
                if (el.classList.contains("payment-title") || el.classList.contains("delivery-title")){
                    el.classList.add("off")
                }
            })
            // ...
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
    // ...
    // summary variables
    summary_variables();
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
// PROCEED BUTTONS END


// STORAGE SECTION
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
// ...
