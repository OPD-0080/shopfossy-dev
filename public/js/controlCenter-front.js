const sideBarContainer = document.querySelector(".sidebar");
const sidebarListEls = sideBarContainer.querySelectorAll("li");
const toggleWrap = document.querySelector(".theme-toggle-wrap");
const toggleBtn = document.querySelector(".toggle-wrap");

// SIDE BAR SECTION
(function() {
    sidebarListEls.forEach(list => {
        list.onclick = (e) => {
            const id = e.target.dataset.id;
            sideBarContainer.querySelector(".active").classList.remove("active")
            e.target.classList.add("active")    
        }
    })
})()
// .......
// TOGGLE SECTION
toggleWrap.onclick = (e) => {
    if (e.target.classList.contains("i") || e.target.classList.contains("toggle-wrap")) {
        toggleWrap.classList.toggle("shift")
    }
}
// .........