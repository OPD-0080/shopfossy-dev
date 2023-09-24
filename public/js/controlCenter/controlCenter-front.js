// IMPORTATION 
import { fetch_cc_entryOptions, fetch_cc_entryOptions_deafaults } from "../../utils/cc/fetchAPI.js";
// ...

const sideBarContainer = document.querySelector(".sidebar-content-container");
const sidebarListEls = sideBarContainer.querySelectorAll("li");
const toggleWrap = document.querySelector(".theme-toggle-wrap");
const toggleBtn = document.querySelector(".toggle-wrap");
const pages = document.querySelectorAll(".page-sections");
const pageDashboard = document.querySelector(".dashboard-container");

// FOR UPLOADING PHOTOS
//const photo_upload_cover = document.querySelector(".photo-upload-cover");
//const photo_upload_btn = photo_upload_cover.querySelector("#photo-upload");
//const cc_submit_btn = document.querySelector(".entry-photo-btn");
//const db_alert_wrap = document.querySelector(".db-alert");
//const db_alert = db_alert_wrap.querySelector(".db-alert-text");
///const images_container = document.querySelector(".entry-photo-preview");
//const upload_image_cover = images_container.querySelector(".photo-upload-cover");
//const preview_wrap = document.querySelector(".photos");
//const previews = preview_wrap.querySelectorAll(".photo");
//const upload_switch_btn = document.querySelector(".upload-switch");
// .....
// FOR ENTRIES SECTION 
//const db_preview_btn_wrap = document.querySelector(".db-preview-btn");
//const db_save_btn = db_preview_btn_wrap.querySelector("#save-btn");
//const db_preview_btn = document.querySelector("#preview-btn");
//const tb_addon_wrap = document.querySelector(".table-addon-btn");
//const tb_addon = tb_addon_wrap.querySelector(".tb-addon");
//const tb_delete_wrap = document.querySelector(".table-delete-btn");
//const tb_delete = tb_delete_wrap.querySelector(".tb-delete");

//const tabe_wrapper = document.querySelector(".tables-entries-wrap");
//const table_columns_container = table_wrapper.querySelector(".table-columns-container");

//const menu_container = document.querySelector(".menu");
//const select_company = menu_container.querySelector("#select-company");
//const db_entries = document.querySelector(".db-entries");
//const entry_seller = db_entries.querySelector("#seller");
//const entry_price = db_entries.querySelector("#price");
//const entry_priceFtr = db_entries.querySelector("#priceFtr");
//const entry_shipCost = db_entries.querySelector("#shipCost");
//const select_router = menu_container.querySelector("#select-router-url");
//const formTag = document.querySelector(".db-container");
//const save_btn = document.querySelector("#save-btn");
//const form_preview_submit_tag = document.querySelector(".form-preview-submit");
//const preview_subit_close_btn = document.querySelector(".preview-close-btn");
//const preview_submit_wrapper = document.querySelector(".preview-submit-wrapper");
//const empty_submit_preview = preview_submit_wrapper.querySelector(".preview-empty-content");
//const preview_submit_btn = preview_submit_wrapper.querySelector(".preview-submit-btn");


// ......

// SIDE BAR SECTION
(function() {
    sidebarListEls.forEach(list => {
        list.onclick = (e) => {
            const id = e.target.dataset.id;
            sideBarContainer.querySelector(".active").classList.remove("active")
            e.target.classList.add("active");

            pages.forEach(page => {
                const pageId = page.getAttribute("data-slide");
                if (id == pageId) { // compare ids
                    // show content in DOM
                        page.classList.add("switch");
                        pageDashboard.classList.add("off");

                    // ...
                }else if (id == "dashboard") {
                    page.classList.remove("switch");
                    pageDashboard.classList.remove("off")
                }
                else {
                    // show off content in DOM
                        page.classList.remove("switch");
                        pageDashboard.classList.add("off")
                    // ..
                }
            })
        }
    })
})();
// .......
// TOGGLE SECTION
toggleWrap.onclick = (e) => {
    if (e.target.classList.contains("i") || e.target.classList.contains("toggle-wrap")) {
        toggleWrap.classList.toggle("shift");
    }
}
// .........
// UPLOADING PHOTOS
/*(function(){
    photo_upload_cover.onclick = () => {
        photo_upload_btn.click()
    }
    photo_upload_btn.onchange = (e) => {
        const data = e.target.files;

        // max image to be uploaded is 6
        if (data.length <= 6) {
            // destructuring file data
            const file = {};
            file.name = data.name;
            file.size = data.size;
            
            // ....
            let images = [], imageUrls = [];
            images = [data[0], data[1], data[2], data[3], data[4], data[5]];

            const imageFiles = getUniqueArray(images);
            
            switch_to_preview_mode();
            let show = "";
            for (let i = 0; i < imageFiles.length; i++) {
                const file = imageFiles[i];
                const reader = new FileReader();

                // Checking if upload image is in "webp" format and the name is a number
                if (!isNaN(file.name.split(".")[0])) {
                    if (file.name.endsWith(".webp")) {
                        dataUrl(reader, file);
                        reader.onload = () => {
                            const url = reader.result;
        
                            show += ` <li class="photo"><img src="${url}" alt=""></li> `;
                            preview_wrap.innerHTML = show
                        }
                    }else {
                        const err = "Upload Images Format must be in ''.webp''  !"
                        error_handling(err)
                    }
                }else {
                    const err = "Uploaded Image Name must be a NUMBER  !"
                    error_handling(err)
                }

                
            }
            console.log("UPLOAD FILES ....",imageFiles);

        }else {
            const err = "Upload Image Exceeds Limit"
            error_handling(err)
        }
        // .....
       // cc_submit_btn.type = "submit";
        //cc_submit_btn.click();
    }
    const getUniqueArray = (arr) =>  {
        var result = [];
        
        for (var i=0, l=arr.length; i<l; i++)
            if (result.indexOf(arr[i]) === -1 && arr[i] !== undefined)
                result.push(arr[i]);
        return result;
    }
    const dataUrl = (reader, file) => {
        reader.readAsDataURL(file)
    }
    const switch_to_preview_mode = () => {
        // activate image preview and deactivate upload cover
        upload_image_cover.classList.add("deactivate");
        preview_wrap.classList.add("preview");
        upload_switch_btn.classList.add("activate");

        upload_switch_btn.onclick = () => {
            upload_image_cover.classList.remove("deactivate");
            preview_wrap.classList.remove("preview");
            upload_switch_btn.classList.remove("activate");
        }
        //.....
    }
    const error_handling = (msg) => {
        db_alert.innerText = `${msg} !`;
        db_alert_wrap.classList.add("active")
        setTimeout(() => { db_alert_wrap.classList.remove("active") }, 10000);

        console.log(".....ERROR HANDLING ......");
    }
})();*/
// ..............
// ENTRIES 
/*(function(){
    let refNum = 0, refs = [];
    // ADD TABLE COLUMN
    tb_addon.onclick = (e) => {
        refNum += 1 
        
        refs.push(refNum);
        new Storage().saveRefsData(refs);
        //console.log("...ADD TABLE ....", refs);
        // adding columns to table
        const isTableAdded = add_table_column(refs);
        if (isTableAdded == 200) {
            // activate delete btn and deactivate add btn table columns reaches 15
                tb_delete_wrap.classList.add("activate");
            (table_columns_container.children.length >= 15) ? tb_addon_wrap.classList.add("deactivate") :  tb_addon_wrap.classList.remove("deactivate")
            // ...
            proceedToDeleteColumn(refs);
        }
        // ....
    }
    // ...
    const add_table_column = (arr) => {
        // save table input data before array reset when adding table columns
        const data = save_data_before_table_add();    
        // .......
        // INITIAL ADDING OF TABLE COLUMN
        let showRef = "";
        for (let i = 0; i < arr.length; i++) {
            const ref = arr[i];
            
            showRef += `
                <tr class="table-cols" data-col="${ref}">
                    <td> # </td>
                    <td><textarea id="tb_para_${ref}" name="tb_para_${ref}" class="cols-para" cols="10" rows="4"></textarea></td>
                    <td><textarea id="tb_det_${ref}" name="tb_det_${ref}" class="cols-det" cols="10" rows="4"></textarea></td>
                </tr>
            `;
            table_columns_container.innerHTML = showRef;
        };
        // ....................
        // UPDATING PREVIOUS TABLE COLUMN VALUE AFTER ADDING A COLUMN
        if (data) {
            const table_columns = table_columns_container.querySelectorAll(".table-cols");
            for (let i = 0; i < data.length; i++) {
                const el = data[i];
                const table_column = table_columns[i];

                const cols_para = table_column.querySelector(".cols-para");
                const cols_det = table_column.querySelector(".cols-det");

                cols_para.value = el.para_val;
                cols_det.value = el.det_val;
            }
        }
        // ......................
        return 200;
    }
    const save_data_before_table_add = () => {
        const table_columns = table_columns_container.querySelectorAll(".table-cols");
        let data = [], resp = "";

        for (let i = 0; i < table_columns.length; i++) {
            const table_column = table_columns[i];
            
            const cols_para = table_column.querySelector(".cols-para");
            const cols_det = table_column.querySelector(".cols-det");
            const para_val = cols_para.value;
            const det_val = cols_det.value;

            const data_obj = {para_val, det_val};
            data = [...data, data_obj];

            const isDataSaved = new Storage().saveData(data);
            if (isDataSaved == undefined) {
                resp = true;
            }
        }
        if (resp) {
            return new Storage().getData();
        }
    
    }
    const update_table_on_delete = (arr) => {
        // save table input data before array reset when adding table columns
        const data = save_data_after_table_deletion(); 
        //console.log(data);   
        // .......
        // INITIAL ADDING OF TABLE COLUMN
        let showRef = "";
        for (let i = 0; i < arr.length; i++) {
            const ref = arr[i];
            
            showRef += `
                <tr class="table-cols" data-col="${ref}">
                    <td> # </td>
                    <td><textarea id="tb_para_${ref}" name="tb_para_${ref}" class="cols-para" cols="10" rows="4"></textarea></td>
                    <td><textarea id="tb_det_${ref}" name="tb_det_${ref}" class="cols-det" cols="10" rows="4"></textarea></td>
                </tr>
            `;
            table_columns_container.innerHTML = showRef;
        };
        // ....................
        // UPDATING PREVIOUS TABLE COLUMN VALUE AFTER ADDING A COLUMN
        if (data) {
            const table_columns = table_columns_container.querySelectorAll(".table-cols");
            // remove the last data from array
            data.pop();
            // ...
            for (let i = 0; i < data.length; i++) {
                const el = data[i];
                const table_column = table_columns[i];

                const cols_para = table_column.querySelector(".cols-para");
                const cols_det = table_column.querySelector(".cols-det");

                cols_para.value = el.para_val;
                cols_det.value = el.det_val;
                
            }
        }
        // ......................
        return 200;
    }
    const save_data_after_table_deletion = () => {
        let data = [], resp = "";
        const table_columns = table_columns_container.querySelectorAll(".table-cols");
        // remove element from DOM content
        table_columns_container.removeChild(table_columns_container.children[table_columns.length - 1])
        // ....
        //console.log(table_columns);

        for (let i = 0; i < table_columns.length; i++) {
            const table_column = table_columns[i];
            
            const cols_para = table_column.querySelector(".cols-para");
            const cols_det = table_column.querySelector(".cols-det");
            const para_val = cols_para.value;
            const det_val = cols_det.value;

            const data_obj = {para_val, det_val};
            data = [...data, data_obj];

            const isDataSaved = new Storage().saveData(data);
            if (isDataSaved == undefined) {
                resp = true;
            }
        }
        if (resp) {
            return new Storage().getData();
        }
    }
    const proceedToDeleteColumn = (refs) => {
        tb_delete.onclick = (e) => {
            const element = e.target;
            refs.pop();
            new Storage().saveRefsData(refs);
            
            update_table_on_delete(refs, element);
            // disable delete btn if array is empty and activate add btn if ref tb-columns is 15
            tb_addon_wrap.classList.remove("deactivate");
            if (refs.length == 0) {
                tb_delete_wrap.classList.remove("activate");
            }
            // ...
            console.log(".....TABLE DELETE ..... ", refs);
        }
    }
})();*/
/*class Storage {
    saveData(data) {
        return sessionStorage.setItem("tb", JSON.stringify(data));
    }
    getData() {
        return JSON.parse(sessionStorage.getItem("tb"));
    }
    saveRefsData(data) {
        sessionStorage.setItem("refs", JSON.stringify(data))
    }
    getRefsData() {
        return JSON.parse(sessionStorage.getItem("refs"));
    }
}*/
// ...............

// AUTO FILL VALUES IN ENTRIES SECTION 
/*(async () => {
    // fetch entry option JSON file
    const options = await fetch_cc_entryOptions();
    const default_options = await fetch_cc_entryOptions_deafaults();
    // ...
    // display company list menu only 
    const company_list = document.querySelector(".cc_company");
    let show_company_list = "";
    default_options.forEach(data => {
        show_company_list += `
            <option value="${data.id}"> ${data.company} </option>
        `;  
        company_list.innerHTML = show_company_list;
    });
    // ...
    select_company.onchange = (e) => {
        const selectedValue = e.target.value;
        // auto fill "seller" and "UID" section
        entry_seller.value = selectedValue;
        const data = options.find(data => { return data.id == selectedValue}); // get selected data from array
        // activate save button 
        save_btn.disabled  = false;
        // ..
        // display them in DOM 
        output_entryOptions(data, selectedValue);
        // ...
    };
    // auto fill entries as price is entered
    let priceVal = "", costStatus = "";
    entry_price.onkeyup = (e) => {
        const inputValue = e.target.value;
        const base = 50;

        if (inputValue <= base){
            priceVal = "lo";
            costStatus = "Free";
        }else {
            priceVal = "hi";
            costStatus = "Paid";
        }

        entry_priceFtr.value = priceVal;
        entry_shipCost.value = costStatus;
    };
    // ...
    const output_entryOptions = (data, inputValue) => {
        const cc_uid = document.querySelector(".cc_uid");
        const cc_item_type = document.querySelector(".cc_subCategory");
        const cc_madeBy = document.querySelector(".cc_madeBy");
    
        let a = "", b = "", c = "";
    
        if (inputValue !== "") { // display content and activate save button
            data.uids.forEach(el => {
                a += `
                    <option value="${el}"> ${el} </option>
                `;
                cc_uid.innerHTML = a;
            });
            data.item_type.forEach(el => {
                b += `
                    <option value="${el}"> ${el} </option>
                `;
                cc_item_type.innerHTML = b;
            });
            data.item_madeBy.forEach(el => {
                c += `
                    <option value="${el}"> ${el} </option>
                `;
                cc_madeBy.innerHTML = c;
            });
            db_save_btn.type = "submit";
           // console.log(db_save_btn);

        }else { // dont show content and deactivate save button
            const show = ""
            cc_uid.innerHTML = show;
            cc_item_type.innerHTML = show;
            cc_madeBy.innerHTML = show;

            db_save_btn.type = null;
           // console.log(db_save_btn);
        }
        
    }   
})();*/
// ......
// SWITCHING ROUTE URL
/*(async () => {
    let router = await JSON.parse(sessionStorage.getItem("router"));
    console.log(router);

    if (router == null) {
        // deactivate the rest of the buttons
        select_company.disabled  = true;
        save_btn.disabled = true;
        // ...
        select_router.onchange = (e) => {
            const selectedValue = e.target.value;
            formTag.action = `/${selectedValue}`;
    
            // activate the rest of the buttons and save url session  storage
            select_company.disabled  = false;
            sessionStorage.setItem("router", JSON.stringify(selectedValue));
            // ...
        };
    }
    if (router !== null) {
        formTag.action = `/${router}`;
        select_router.value = router;
        // activate select company and deactivate save buttons
        select_company.disabled  = false;
        save_btn.disabled = true;
        // ...
        select_router.onchange = (e) => {
            const selectedValue = e.target.value;
            formTag.action = `/${selectedValue}`;
    
            // activate the rest of the buttons and save url session  storage
            select_company.disabled  = false;
            sessionStorage.setItem("router", JSON.stringify(selectedValue));
            // ...
        };
    }
    

})();*/
// ...
// PREVIEW  AND SUBMIT SECTION 
/*(async () => {
    // hide submit button when data is empty
    if (empty_submit_preview !== null) {
        preview_submit_btn.classList.add("hide"); 
    }else {
        preview_submit_btn.classList.remove("hide");
    }
    // ...
    preview_subit_close_btn.onclick = () => {
        preview_submit_wrapper.classList.remove("collapse");
    }
    db_preview_btn.onclick = async (e) => {
        // changing router when button is triggered
        let router = await JSON.parse(sessionStorage.getItem("router"));
        console.log(router);
        if (router == null) {

        }
        if (router == "cc-createData") {
            form_preview_submit_tag.action = "/submitCreateData";
            // activate preview page 
            preview_submit_wrapper.classList.add("collapse");
            // ...
        }
        if (router == "cc-modifyData") {
            form_preview_submit_tag.action = "/submitModifyData";
            // activate preview page 
            preview_submit_wrapper.classList.add("collapse");
            // ...
        }
        if (router == "cc-deleteData") {
            form_preview_submit_tag.action = "/deleteCreateData";
            // activate preview page 
            preview_submit_wrapper.classList.add("collapse");
            // ...
        }
        // ....
    }

})();*/
// ...

