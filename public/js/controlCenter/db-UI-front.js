// IMPORTATION 
import { fetch_cc_entryOptions, fetch_cc_entryOptions_deafaults } from "../../utils/cc/fetchAPI.js";
// ...

const banner_wrapper = document.querySelector(".banner-wrapper");
const hunburger = banner_wrapper.querySelector(".hunburger");
const sidebar_wrapper = document.querySelector(".sidebar-wrapper");
const sidebar_text = sidebar_wrapper.querySelectorAll(".i-text");
const overall_content_wrapper = document.querySelector(".overall-content-wrapper");
const toolTips = document.querySelectorAll(".tips");
const toolTip_content = document.querySelectorAll(".tips-content");
const litter_form_wrapper = document.querySelector("#litter-form-wrapper");
const breeder_plan_form_wrapper = document.querySelector("#breeder-plan-form-wrapper");
const entry_close_btns = document.querySelectorAll(".entry-close-button");
const form_overlay = document.querySelector('.entry-overlay');
const menu_buttons = document.querySelectorAll(".menu-btn");
const form_sections = document.querySelectorAll(".form-section");
const sidebar_menu_wrapper = document.querySelector(".sidebar-menu-wrap");
const sidebar_menu = sidebar_menu_wrapper.querySelectorAll(".sidebar-menu");
const side_page = document.querySelectorAll(".menu-wrap");
const content_output = document.querySelectorAll(".show-content-container");


// FOR ENTRIES SECTION 
//const db_preview_btn_wrap = document.querySelector(".db-preview-btn");
//const db_save_btn = db_preview_btn_wrap.querySelector("#save-btn");
const db_preview_btn = document.querySelector("#preview-btn");
const tb_addon_wrap = document.querySelector(".table-addon-btn");
const tb_addon = tb_addon_wrap.querySelector(".tb-addon");
const tb_delete_wrap = document.querySelector(".table-delete-btn");
const tb_delete = tb_delete_wrap.querySelector(".tb-delete");

const tabe_wrapper = document.querySelector(".tables-entries-wrap");
const table_columns_container = tabe_wrapper.querySelector(".table-columns-container");
// ...
// FOR UPLOADING PHOTOS
const photo_upload_cover = document.querySelector(".photo-upload-cover");
const photo_upload_btn = photo_upload_cover.querySelector("#photo-upload");
const cc_submit_btn = document.querySelector(".entry-photo-btn");
const db_alert_wrap = document.querySelector(".db-alert");
const db_alert = db_alert_wrap.querySelector(".db-alert-text");
const images_container = document.querySelector(".entry-photo-preview");
const upload_image_cover = images_container.querySelector(".photo-upload-cover");
const preview_wrap = document.querySelector(".photos");
const previews = preview_wrap.querySelectorAll(".photo");
const upload_switch_btn = document.querySelector(".upload-switch");
// .....
// DB MENU SECTION 
const menu_container = document.querySelector(".db-menu-container");
const select_company = menu_container.querySelector("#select-company");

const db_entries = document.querySelector(".row");
const entry_seller = db_entries.querySelector("#seller");
const entry_price = db_entries.querySelector("#price");
const entry_priceFtr = db_entries.querySelector("#priceFtr");
const entry_shipCost = db_entries.querySelector("#shipCost");
const select_router = menu_container.querySelector("#select-router-url");
// ....

// PREVIEW SECTION 
const db_preview = document.querySelector(".db-preview");
const preview_arrows = db_preview.querySelectorAll(".preview-collapse");
const show_preview_contents = db_preview.querySelectorAll(".show-preview-content");

// ....

//const formTag = document.querySelector(".db-container");
//const save_btn = document.querySelector("#save-btn");
//const form_preview_submit_tag = document.querySelector(".form-preview-submit");
//const preview_subit_close_btn = document.querySelector(".preview-close-btn");
//const preview_submit_wrapper = document.querySelector(".preview-submit-wrapper");
//const empty_submit_preview = preview_submit_wrapper.querySelector(".preview-empty-content");
//const preview_submit_btn = preview_submit_wrapper.querySelector(".preview-submit-btn");
// ...

// AUTO ACTIVATE SIDEBAR MENU 
(() => {
    side_page.forEach(page => {
        const page_header = page.querySelector(".header");
        const header_text = page_header.querySelector("h3").innerText;
        sidebar_menu.forEach(menu => {
            const id = menu.getAttribute("data-active-menu");
        
            if (header_text == id) {
                sidebar_menu_wrapper.querySelector(".menu-active").classList.remove("menu-active");
                menu.classList.add("menu-active");
            }
        })

    });
})();
// ...

// HUNBURGER MENU SECTION 
(() => {
    hunburger.onclick = (e) => {
        overall_content_wrapper.classList.toggle("collaspe")
        hunburger.classList.toggle("switch");
        sidebar_wrapper.classList.toggle("collapse");
        sidebar_text.forEach(text=> { text.classList.toggle("collapse") });
        console.log(e.target, sidebar_wrapper, sidebar_text);

    }
})();
// ....
//  TOOLTIPS SECTIONS 
(() => {
    toolTips.forEach(tip => {
        tip.onclick = (e) => {
            const id = e.target.dataset.info;
            toolTip_content.forEach(content => {
                const contentID = content.getAttribute("data-tip");

                if (id == contentID) {
                    content.classList.toggle("collapse");
                }
                if (id !== contentID) {
                    content.classList.remove("collapse");
                }
            })
        }   
    })
})();
// ....
// FORM CLOSE BUTTON  AND MENU SECTION
(() => {
    entry_close_btns.forEach(btn => {
        btn.onclick = (e) => {
            if (e.target.classList.contains("i") || e.target.classList.contains(".entry-close-button")) {
                form_overlay.classList.remove("show"); // take off form overlay 
                // by default show the first output table 
                content_output[0].classList.add("show");
                // ...
            }
        }
    });
    menu_buttons.forEach(menu => {
        // by default show the first output table 
        content_output[0].classList.add("show");
        // ...
        menu.onclick = (e) => {
            if (e.target.classList.contains("menu-btn") || e.target.classList.contains("i")) {
                let menu_id = menu.dataset.menu;

                form_sections.forEach(section => {
                    const section_id = section.getAttribute("data-menu-respond");
                    if (menu_id == section_id) {
                        form_overlay.classList.add("show"); // take oon form overlay 
                        section.classList.add("collapse");
                    }
                    if (menu_id !== section_id) {
                        //form_overlay.classList.add("show"); // take oon form overlay 
                        section.classList.remove("collapse");
                    }
                });
                content_output.forEach(show_content => {
                    const content_id = show_content.getAttribute("data-output");

                    if (menu_id == content_id) {
                        show_content.classList.add("show");
                    }
                    if (menu_id !== content_id) {
                        show_content.classList.remove("show");
                    }
                });
                
            }
        }
    })
})();
// ...
// ENTRIES 
(function(){
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
})();
class Storage {
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
};
// ...............
// UPLOADING PHOTOS
(function(){
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
})();
// ..............
// AUTO FILL VALUES IN ENTRIES SECTION 
(async () => {
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
        //save_btn.disabled  = false;
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
            priceVal = "Lo";
            costStatus = "Free";
        }else {
            priceVal = "Hi";
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
           // db_save_btn.type = "submit";
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
})();
// ......
// PREVIEW SECTION
(() => {
    // switching pages depend on the availbaility of the preview data 
    const preview_empty_content = document.querySelector(".preview-empty-content");
    const preview_button_wrapper = document.querySelector("#buttons");

    if (preview_empty_content !== null || preview_empty_content !== undefined) {
        preview_button_wrapper.classList.add("collapse");
    }
    if (preview_empty_content == null || preview_empty_content == undefined) {
        preview_button_wrapper.classList.remove("collapse");
    }
    // ..

    preview_arrows.forEach(arrow => {
        arrow.onclick = (e) => {
            const arrowID = e.target.dataset.arrow;

            show_preview_contents.forEach(preview => {
                const previewID = preview.getAttribute("data-preview");

                if (arrowID == previewID) {
                    arrow.classList.toggle("activate");
                    preview.classList.toggle("collapse");
                }
            })
        }
    })


})();
// ...






// SWITCHING ENTRY PAGE UPON SELECT OPTIONS 
/*(() => {
    // FOR LITTER SECTION
    if (litter_form_wrapper !== null) {
        const litter_form_checkbox = litter_form_wrapper.querySelectorAll(".checkbox");
        const litter_page_row = litter_form_wrapper.querySelectorAll(".litter-row");

        // by default activate the first page section
        litter_form_checkbox[0].checked;
        litter_page_row[0].classList.add("activate");
        litter_page_row[1].classList.remove("activate");
        // ...
        litter_form_checkbox.forEach(checkbox => {
            checkbox.onclick = (e) => {
                if (e.target.classList.contains("boxA")) {
                    const id = checkbox.dataset.pageid;

                    checkbox.checked = true;
                    e.target.parentElement.nextElementSibling.children[0].checked = false // uncheck previous checked box
                    
                    litter_page_row.forEach(row => {
                        const rowID = row.getAttribute("data-page-select");

                        if (id == rowID) {
                            row.classList.add("activate");
                        }
                        if (id !== rowID) {
                            row.classList.remove("activate");
                        }
                    })
                }else {
                    const id = checkbox.dataset.pageid;

                    checkbox.checked = true;
                    e.target.parentElement.previousElementSibling.children[0].checked = false // uncheck previous checked box
                    
                    litter_page_row.forEach(row => {
                        const rowID = row.getAttribute("data-page-select");

                        if (id == rowID) {
                            row.classList.add("activate");
                        }
                        if (id !== rowID) {
                            row.classList.remove("activate");
                        }
                    })
                }
            }
        })
    }
    // ...
})();*/

// ....