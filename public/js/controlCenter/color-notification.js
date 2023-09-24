(function(){
    const order_alert_wrapper = document.querySelector(".order-update-content");
    const color_array = order_alert_wrapper.querySelectorAll(".color-client");


    let index = order_alert_wrapper.getAttribute("data-order");
    if (index == "-1") {
        index = 0; // assigning new index when index from server is -1

        // looping through array but starting from the index from the server
        for (let i = index; i < color_array.length; i++) {
            const color_tag = color_array[i];
            color_tag.classList.add("old")
        }
    }else if (index > 0) {
        // looping through array but starting from the index from the server
        for (let i = index; i < color_array.length; i++) {
            const color_tag = color_array[i];
            color_tag.classList.add("very-new")
        }
        setTimeout(() => {
            // looping through array but starting from the index from the server
            for (let i = index; i < color_array.length; i++) {
                const color_tag = color_array[i];
                color_tag.classList.add("new")
            }
        }, 10000)
    }
})()