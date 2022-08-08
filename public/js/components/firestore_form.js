import { getFirestore, collection, setDoc, doc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

var validateError = document.querySelector(".user-alert");
var alertMsg = validateError.querySelector("#error");

function firestore_form(uid, customerInfo, delivery_header, payment_header) {
    const db = getFirestore();

    // show alert start
    // alert user error
    validateError.classList.add("on");
    alertMsg.innerHTML = "Processing...";
    // show alert end

    // CART PROFILE START
    customerInfo[0].forEach(item => {
        //fireStore_CartData(uid, UID, title, price, seller, category, quantity, img );
        async function fireStore_CartProfile() {
            try {  
                // fire-store database collection ref
                    // COLLECTION = "shopping Cart";
                    // DOC  = "user uid, first & last name"
                    // SUB-COLLECTION = "items"
                // ...
                const collectionRef_cart = collection(db, "Shopping Cart", `${uid}-${customerInfo[3].first_name}-${customerInfo[3].last_name}`, "items");
                await setDoc(doc(collectionRef_cart, `${item.id}`/* TODO(in production): change item.id to item.UID */), {
                    UID: item.UID,
                    title: item.title,
                    price: item.price,
                    seller: item.seller,
                    category: item.category,
                    Quantity: item.amount,
                    img: item.imgUrl,
                    time: serverTimestamp()
                });
    
                /* 
                    send notification to through email (using ADMIN SDK CLOUD MESSAGE)
                    as an alert to the admin
                    */
    
                console.log("Data submitted successfully");
    
            } catch (error) {
                console.log(` Shopping Cart Error: ${error}`);
            }
        }fireStore_CartProfile()
    });
    // CART PROFILE END

    // CLIENT PROFILE START
    //fireStore_CartProfile(el);
    async function fireStore_ClientProfile() {
        try {
            const collectionRef_client = collection(db, "Client Profile");
            await setDoc(doc(collectionRef_client, `${uid}-${customerInfo[3].first_name}-${customerInfo[3].last_name}`), {
                FirstName: customerInfo[3].first_name,
                LastName: customerInfo[3].last_name,
                Tel: customerInfo[3].number,
                Email: customerInfo[3].email,
                Region: customerInfo[3].region,
                City: customerInfo[3].city,
                Company: customerInfo[3].company,
                DigitalAddress: customerInfo[3].digital,
                ResidentialAddress: customerInfo[3].residential,
                Agreement: customerInfo[3].agreement,
                Delivery_Status: delivery_header,
                Payment_Status: payment_header,
                Time: serverTimestamp()
            });

            alertUser();

            // INVOICE START
            setTimeout(() => {
                const invoiceShow = invoiceDataShow(customerInfo, delivery_header, payment_header)
                
                // PRINTING INVOICE AS PDF 
                /*if (invoiceShow) {
                    invoicePDF();
                }*/
            }, 15000);
            // INVOICE END

        } catch (error) {
            console.log(`Client Profile Error: ${error}`);
            // show alert start
            validateError.classList.add("on");
            alertMsg.innerHTML = "Check & Fill Missing Input";
            setTimeout(() => {validateError.classList.remove("on")}, 5000);
            // show alert end
        }
    }fireStore_ClientProfile();
    // CLIENT PROFILE END

    // CART SUMMATION START
    async function cartSummation() {
        try {
            const collectionRef_total = collection(db, "Cart Total");
            await setDoc(doc(collectionRef_total, `${uid}-${customerInfo[3].first_name}-${customerInfo[3].last_name}`), {
                Quantity: customerInfo[2],
                TotalCost: customerInfo[1],
                Time: serverTimestamp()
            });
        } catch (error) {
            console.log(`cart Summation Error: ${error}`);
        }
        
    }cartSummation();
    // CART SUMMATION END

    // to reset form
    var form = document.querySelector("form");
    form.reset();

    // getting back to initial page after form is submitted
    /*setTimeout(() => {window.location.href = "/company-name-1.html"}, 5000);
    */

    function alertUser() {
        // USER ALERT AFTER SUBMISSION START
        validateError.classList.add("on");
        alertMsg.innerHTML = "Submission successfully";
        setTimeout(() => {alertMsg.innerHTML = "Preparing Invoice"}, 5000);
        setTimeout(() => {validateError.classList.remove("on")}, 10000);
        // USER ALERT AFTER SUBMISSION END
    }
    function invoiceDataShow(customerInfo, delivery_header, payment_header) {
        var invoiceEl = document.querySelector(".invoice-wrapper");
        invoiceEl.classList.add("on");

        var show = "";
        customerInfo[0].forEach(el => {
            // show purchased items
            show += `
            <div class="invoice-item-cell">
                <div><span> ${el.title} </span></div>
                <div><span> ${el.price} </span></div>
                <div><span> ${el.amount} </span></div>
                <div><span> ${(el.price * el.amount).toFixed(2)} </span></div>
            </div>
            `;
            var res = document.querySelector(".invoice-item-wrap");
            res.innerHTML = show;

            // grand total show
            var grandtotal = document.querySelectorAll(".i-total");
            grandtotal.forEach(el => el.innerHTML = customerInfo[1]);
        })

        // show payment & delivery methods
            var paymentWrap = document.querySelector(".invoice-payment-wrap");
            paymentWrap.querySelector(".payment-status").innerHTML = payment_header;
            paymentWrap.querySelector(".delivery-status").innerHTML = delivery_header;

        // show client data 
        var  show = ""; var show_media = ""
        customerInfo.forEach(el => {
            show = `
                <div class="client-name"> ${el.first_name} ${el.last_name} </div>
                <div class="client-tel"><span> ${el.number} </span></div>
                <div class="client-others">
                    <span> ${el.residential} </span>
                    <span> ${el.city} </span>
                    <span> ${el.region} </span>
                    <span> ${el.digital} </span>
                </div>
                <div class="client-email"><span> ${el.email} </span></div>
            `;
            show_media = `
                <li class="client-name"> ${el.first_name} ${el.last_name} </li>
                <li class="client-tel"> ${el.number} </li>
                <li class="client-email"> ${el.email} </li>
                <li class="client-region"> ${el.region} </li>
                <li class="client-city"> ${el.city}</li>
                <li class="client-resident"> ${el.residential} </li>
                <li class="client-digital"> ${el.digital} </li>
            `;
            var res = document.querySelector(".client-container");
            var res_media = document.querySelector(".client-container-media");
            res.innerHTML =show;
            res_media.innerHTML = show_media;
        })


        // showing invoice date and time
        var date = new Date();
        var monthArray = new Array();
            monthArray[0] = "Jan";
            monthArray[1] = "Feb";
            monthArray[2] = "Mar";
            monthArray[3] = "Apr";
            monthArray[4] = "May";
            monthArray[5] = "Jun";
            monthArray[6] = "Jul";
            monthArray[7] = "Aug";
            monthArray[8] = "Sep";
            monthArray[9] = "Oct";
            monthArray[10] = "Nov";
            monthArray[11] = "Dec";
        var monthVal = monthArray[date.getMonth()];
        var hour_state = "";
        (date.getHours() >= 12) ? (hour_state = "pm") : ( hour_state = "am");

        // showing invoice serial code
        var invoice_code = form_serial_codes();

        // showing invoice item purchased
        var invoice_show = ""
        invoice_show = `
            <div> Invoice </div>
            <div>Date: <span> ${monthVal} ${date.getDate()}, ${date.getFullYear()} </span></div>
            <div>Serial Code: <span> ${invoice_code} </span></div>
            <div>Time Issued: <span> ${date.getHours()}h : ${date.getMinutes()}m ${date.getSeconds()}s ${hour_state} </span></div>
        `;
        var invoice_header = document.querySelector(".invoice-header-wrap");
        invoice_header.innerHTML = invoice_show;

        return show;
    }
    function invoicePDF() {
        var element = document.getElementById('element-to-print');
        var opt = {
            margin:       1,
            filename:     'myfile.pdf',
            image:        { type: 'webp', quality: 1 },
            html2canvas:  { scale: 2 },
            jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        // New Promise-based usage:
        html2pdf().set(opt).from(element).save();

        // Old monolithic-style usage:
        //html2pdf(element, opt);
    }
    function form_serial_codes() {
        const base = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-@0123456789"

        const generate = (length) => {
            var show = "";
            for (let i = 0; i < length; i++) {
                show += base.charAt(Math.floor(Math.random() * base.length))
            }
            return show;
        }
        return generate(7)
    }
}
export {firestore_form}