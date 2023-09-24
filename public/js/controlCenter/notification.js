
const notification = (cache, serverRes) => {
    const notification_tags = document.querySelectorAll(".update-indicator");  // from customers ejs file
    const update_alert_tags = document.querySelectorAll(".update_alert") // from realTime ejs file
    const time_today_wrap = document.querySelector(".today");
    const notification_drop = document.querySelector(".prompt-user-reload");

    let containers = "", alertDropStatus = "";
    (time_today_wrap == null) ? "" : containers = time_today_wrap.querySelectorAll(".row");


    let dump_data = [], prev_cache = [], index = "";

    // clear dump cache before pushing data 
    dump_data = []
    // ...
    // pushing data in dump cache
    notification_tags.forEach(tags => {
        const id = tags.getAttribute("notification-id");
        const time = tags.getAttribute("tag-time");

        const tag = {id, time};
        prev_cache.push(tag)
    });
    // ....
    // ...
    
    console.log("previous data cache .... :", prev_cache, cache, serverRes);
    
    // checking for update of data in caches
    if (prev_cache.length !== cache.length) {
        console.log("......... CHANGES MADE ...... ");

        update_alert_tags.forEach(el => {
            const tag_content = el.getAttribute("notification-content");
            const tag_id = el.getAttribute("notification-id");
            
            const drop_status = active_deactivate_notification_alert(el, tag_content);
            console.log(drop_status);
            if (drop_status) {
                notification_drop.classList.add("drop");
            } else {
                //notification_drop.classList.remove("drop");
            }
            
        })
    } else {
        update_alert_tags.forEach(el => {
            const tag_content = el.getAttribute("notification-content");
            const tag_id = el.getAttribute("notification-id");
            
            
            const drop_status = active_deactivate_notification_alert(el, tag_content);
            console.log(drop_status);

            if (drop_status) {
                notification_drop.classList.add("drop");
            } else {
                //notification_drop.classList.remove("drop");
            }
            
        });
        console.log("......... NO CHANGES MADE ...... ");
    }
    // ...
}

const active_deactivate_notification_alert = (el, tag_content) => {
    const baseRef = 10;

    if (tag_content == "update") {
       // console.log(el);
        const time_tag = el.querySelector(".update-time");
        const time = time_tag.innerText.slice(0, 2);
        console.log("......time from DOM....", time);
        el.classList.add("notify");
        if (time > baseRef) {
            el.classList.remove("notify");

            return  veryForUpdateForDropAlert(el)   
        }else {
            //console.log(el);
            el.classList.add("notify");
            return  veryForUpdateForDropAlert(el)      
        }
    } else {
        //console.log(el, "sssssssssssss");
        //el.classList.remove("notify");
        return false
    }
}
const veryForUpdateForDropAlert = (el) => {
    const system_date = el.getAttribute("system_date");
    const current_date = el.getAttribute("current_date");
    
    if (el.classList.contains("notify")) {
        // active drop alert if present
        return true
        // ...  
    }else {
        // deactivate drop alert if not present 
        return false
        // ..
    }
}

export { notification }