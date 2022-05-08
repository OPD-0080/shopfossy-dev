function profilePage() {
    var dBtn = [...document.querySelectorAll(".item-detail")]; // the use spread operator to avoid nodeList
    var profileWrap = [...document.querySelectorAll(".item-profiling-wrapper"),];
    var dCloseBtn = document.querySelectorAll(".item-close-btn");
    var body = document.querySelector("body");
    var profOverlay = document.querySelector(".showing-profiling");
    var sortConfirm = document.querySelectorAll(".p-confirm");
    var confirmOverlay = document.querySelectorAll(".confirm-overlay");

    dBtn.forEach((btn) => {
        btn.onclick = (e) => {
            var dId = e.target.getAttribute("data-det");
            // comparing button id with the id of the profile page
            profileWrap.forEach((page) => {
                var pageId = page.getAttribute("data-prof");

                if (dId == pageId) {
                    sortConfirm.forEach((confirm) => {
                        confirm.classList.remove("confirm");
                        confirmOverlay.forEach(el => el.classList.remove("hide"))
                    });
                    //console.log(page);
                    page.classList.add("slide");
                    body.classList.add("collapse");
                    profOverlay.classList.add("visible");
                }
            });
        };
    });
    dCloseBtn.forEach((btn) => {
        btn.onclick = () => {
            sortConfirm.forEach((confirm) => {
                confirm.classList.remove("confirm");
                confirmOverlay.forEach(el => el.classList.remove("hide"))
            });
            profileWrap.forEach((page) => {
                page.classList.remove("slide");
                body.classList.remove("collapse");
                profOverlay.classList.remove("visible");
            });
        };
    });
    //ITEM PROFILE PAGE SLIDE END

    // ITEM IMAGE SORTING (PROFILING) START
    var sortContainer = document.querySelectorAll(".prof-sort");
    
    sortContainer.forEach((sort) => {
        sort.onclick = (e) => {
            if (e.target.classList.contains("p-sort") || e.target.classList.contains("sort-img")) {
                var border = sort.querySelector(".activated");
                border.classList.remove("activated");
                e.target.classList.add("activated");
                var sortId = e.target.getAttribute("data-sort"); // dataset of the sort
                //console.log(e.target);

                var sortConfirm = document.querySelectorAll(".p-confirm");
                var confirmOverlay = document.querySelectorAll(".confirm-overlay");
                sortConfirm.forEach((confirm) => {
                    var confirmId = confirm.getAttribute("data-confirm");

                    if (sortId == confirmId) {
                        confirm.classList.add("confirm");
                        confirmOverlay.forEach(el => el.classList.add("hide"))
                    } else {
                        confirm.classList.remove("confirm");
                    }
                });
                //console.log(sortId);
            }
        };
    });
    // ITEM IMAGE SORTING (PROFILING) END

    // ARROW-RESPOND DROP (PROFILING) START
    var profArrow = document.querySelectorAll(".prof-icon");
    var profRespond = document.querySelectorAll(".prof-i");
    profArrow.forEach((arrow) => {
        arrow.onclick = (e) => {
            var btn = e.target;
            var arrowID = btn.getAttribute("data-icon");

            profRespond.forEach((respond) => {
                var resID = respond.getAttribute("data-i");

                if (arrowID == resID) {
                    //console.log(arrowID);
                    arrow.classList.toggle("down");
                    respond.classList.toggle("drop");
                }
            });
        };
    });
    // ARROW-RESPOND DROP (PROFILING) END

    // STOCK & COST COLOR CHANGE START
    var stockEL = document.querySelectorAll(".prof-stock");
    stockEL.forEach(stock => {
        var stockText = stock.innerHTML.toLowerCase();
        if (stockText == "low") {
            stock.classList.add("txt");
        }else if (stockText == "High" || stockText == "high") {
            stock.classList.remove("txt")
        }
    })
    var costEL = document.querySelectorAll(".ship-cost");
    costEL.forEach(cost => {
        var costText = cost.innerHTML.toLowerCase();
        if (costText == "paid") {
            cost.classList.add("txt");
        }else if (costText == "paid" || costText == "Paid") {
            cost.classList.remove("txt")
        }
    })
    var returnEL = document.querySelectorAll(".return-status");
    returnEL.forEach(el => {
        var elText = el.innerHTML.toLowerCase();
        if (elText == "rejected") {
            el.classList.add("txt");
        }else if (elText == "rejected" || elText == "Rejected") {
            el.classList.remove("txt")
        }
    })
    // STOCK & COST COLOR CHANGE END

    // SHIPPING - RETURN POLICY (PROFILING) START
    var fullDate = new Date();
    var month = fullDate.getMonth();
    var date = fullDate.getDate();

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

    var monthVal = monthArray[month];
    var x = document.querySelectorAll(".month");
    x.forEach((mon) => {
        mon.innerHTML = monthVal;
    });
    var dateIni = document.querySelectorAll(".date-ini");
    dateIni.forEach((ini) => {
        ini.innerHTML = date;
    });
    var dateFinal = document.querySelectorAll(".date-fin");
    dateFinal.forEach((fin) => {
        var value;
        value = date + 4;

        if (value >= 31) {
            value = 1 + 4;
            //return (value)
            //console.log(value);
        }
        fin.innerHTML = value;
    });
    var dateFW1 = document.querySelectorAll(".date-Fw1");
    dateFW1.forEach((FW1) => {
        var value;
        value = date + 1;
        if (value >= 32) {
            value = 1;
            return value;
        }
        FW1.innerHTML = value;
    });
    var dateFW2 = document.querySelectorAll(".date-Fw2");
    dateFW2.forEach((FW2) => {
        var value;
        value = date + 2;
        if (value >= 32) {
            value = 1;
            return value;
        }
        FW2.innerHTML = value;
    });
    // SHIPPING - RETURN POLICY (PROFILING) END
}
export {profilePage}