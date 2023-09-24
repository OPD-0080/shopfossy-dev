import { date_time } from "./date_time.js";

const realtime_container = document.querySelector(".recent-update-container");
const time_today = document.querySelector(".time-today");
const time_yesterday = document.querySelector(".time-yesterday");


class UI {
    today_realTime(cache) {
        const today = document.querySelector(".today-res");
    
        (cache.length == 0) ? time_today.classList.remove("show") : time_today.classList.add("show");

        let show = "";
        if (cache.length !== 0) {
            cache.sort().reverse().forEach(el => { 
                let time = "", t_up = "";
                //console.log("aaaaaaaa", el.profile.time_created, new Date);

                const curr_hr = el.profile.time_created.slice(0,2);
                const sys_hr = date_time().HR; 
                const curr_min = el.profile.time_created.slice(3, 5);
                const sys_min = `${new Date}`.slice(19, 21);
                const sys_date = `${new Date}`.slice(0, 25);
                const curr_date = el.profile.date_created;
                const sys_month = sys_date.slice(3, 7).trim();
                const sys_day = sys_date.slice(7, 10).trim();
                const sys_year = sys_date.slice(10, 15).trim();
                const curr_full_time = el.profile.time_created.slice(0,5);
                const sys_full_time = `${sys_hr}:${sys_min}`;

                let hr = `${sys_hr - curr_hr}`;
                let min = `${sys_min - curr_min}`;
                let min_interval = `${sys_min - curr_min}`;


                console.log("SYS HR....", sys_hr, ".....CUR HR....", curr_hr);
                console.log("HR ...", hr, "MIN ...", min);

                if (min_interval.includes("-")) {
                    let base_min = 60;
                    const min_increment = base_min + Number(min_interval);
                    console.log("....TIME INCREMENT ....", min_increment);

                    min = min_increment;
                    if (min_interval.includes("-") == false) {
                        console.log("less than 60");
                        min = min_interval;
                    }
                }
                console.log(curr_full_time, sys_full_time);
                if (sys_full_time == curr_full_time) {
                    time = "Now";
                }
                if (sys_full_time !== curr_full_time) {
                    if (sys_hr == curr_hr) {
                        console.log("SECTION A....");
                        time = `${min} min ago`;
                    }
                    if (sys_hr !== curr_hr) {
                        console.log("SECTION B....");
                        //time = `${}`
                        time = `${hr}:${min}  ago`;
                    }
                }
                
                
                if (el.image.name.search("null") == -1) {
                    show += `
                    <div class="row update_alert" notification-content="${el.update_indicator}" notification-id="${el.profile.checkout_code}">
                        <div class="update-image-wrap"><img src="../uploaded_images/compress/${el.image.name}" alt=""></div>
                        <div class="update-content">
                            <p><em> ${el.profile.first_name}  ${el.profile.last_name}  </em> has made an order </p>
                            <div class="note">
                                <div class="update-time"> ${time} </div>
                                <div class="category" system_date="${sys_month} ${sys_day},${sys_year}" current_date="${curr_date}"> Category: <em> Order </em></div>
                            </div>
                        </div>
                    </div>
                    `;
                    today.innerHTML = show;
                }else if (el.image.name.search("null") == 0) {
                    show += `
                    <div class="row update_alert" notification-content="${el.update_indicator}" notification-id="${el.profile.checkout_code}">
                        <div class="update-image-wrap"><img src="../img/svg/user-red.svg" alt=""></div>
                        <div class="update-content">
                            <p><em> ${el.profile.first_name}  ${el.profile.last_name}  </em> has made an order </p>
                            <div class="note">
                                <div class="update-time"> ${time} </div>
                                <div class="category" system_date="${sys_month} ${sys_day},${sys_year}" current_date="${curr_date}"> Category: <em>  Order </em></div>
                            </div>
                        </div>
                    </div>
                    `;
                    today.innerHTML = show;
                }
                
            })
        }else {
            show = `
                        <div class="no-update-wrapper">
                            <ul><li class="i"></li><li> No Realtime Update </li></ul>
                        </div>
                    `;
                    today.innerHTML = show;
        }
    };
    yesterday_realTime(cache) {
        const yesterday = document.querySelector(".yesterday-res");

        (cache.length == 0) ? time_yesterday.classList.remove("show") : time_yesterday.classList.add("show")

        let show = "";
        cache.sort().reverse().forEach(el => { 
            if (el.image.name.search("null") == -1) {
                show += `
                <div class="row">
                    <div class="update-image-wrap"><img src="../uploaded_images/compress/${el.image.name}" alt=""></div>
                    <div class="update-content">
                        <p><em> ${el.profile.first_name}  ${el.profile.last_name}  </em> has made an order </p>
                        <div class="note">
                            <div class="update-time"> ${el.profile.time_created} </div>
                            <div class="category"> Category: <em> Order </em></div>
                        </div>
                    </div>
                </div>
                `;
                yesterday.innerHTML = show;
            }else if (el.image.name.search("null") == 0) {
                show += `
                <div class="row">
                    <div class="update-image-wrap"><img src="../img/svg/user-red.svg" alt=""></div>
                    <div class="update-content">
                        <p><em> ${el.profile.first_name}  ${el.profile.last_name}  </em> has made an order </p>
                        <div class="note">
                            <div class="update-time"> ${el.profile.time_created} </div>
                            <div class="category"> Category: <em>   </em></div>
                        </div>
                    </div>
                </div>
                `;
                yesterday.innerHTML = show;
            }
            
        })
    }
}


export { UI }