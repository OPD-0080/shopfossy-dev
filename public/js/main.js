import { categoryList } from './sideBarList/categoryList.js';


(function() {
    var cartNavBtn = document.querySelector(".cart-nav-btn");
    cartNavBtn.onclick = (e) => {
        if (e.target.classList.contains("overall-cart-btn") || e.target.classList.contains("cart-number") || e.target.classList.contains("cart-nav-btn")) {
            var cartBtn = e.target;
            var cartWrapper = document.querySelector(".cart-wrapper");
            var closeBtn = document.querySelector(".overall-cart-btn");

            cartWrapper.classList.toggle("open");
            closeBtn.classList.toggle("collapse");
        }
    }
})();

//SCROLL EFFECT START
(function(){

    window.addEventListener('scroll', function() {
        var body = document.body;
        var offset = 100;
        var docHeight;
    
        //calculating the document height
        docHeight = Math.max(body.scrollHeight, body.offsetHeight);
        if (docHeight != 'undefined') {
            offset = docHeight / 15;
        }
        //console.log(offset);
    
        var logo = document.querySelector(".logo");
        logo.classList.toggle("shift", window.scrollY > offset);
    });
})();
//SCROLL EFFECT END"

// CLICK FUNCTIONS SECTION START
(function(){
    var arrowBtn = document.querySelectorAll(".bar-btn");
    //console.log(arrowBtn);

    arrowBtn.forEach(btn => {
        btn.onclick = (e) => {
            var num = e.target.dataset.num;

            var contentWrap = document.querySelectorAll(".category-content-wrap");
            contentWrap.forEach(drop => {
                var res = drop.dataset.res;
                //console.log(res);

                if (num == res) {
                    drop.classList.toggle("open");
                    //console.log(drop);
                    btn.classList.toggle("rotate");
                }
            })
        }
    })
})();
// CLICK FUNCTIONS SECTION END

// SIDEBAR (CATEGORY) START
(function(){
    
    // Destructuring array
    categoryList.map(el => {
        const text = el.text;
        const href = el.href;
        const dataId = el.dataId;
        
        const res = {text, href, dataId};
        return res;
    });

    var result = "";
    categoryList.forEach(el => {
        result += `
            <li class="btn-active" data-id="${el.dataId}"><a class="a-btn" href="${el.href}" data-id="${el.dataId}">${el.text}</a></li>
        `
    });
    var dis = document.querySelector(".display-1");
    dis.innerHTML = result;

    var hunburgerEl = document.querySelector(".media-hunburger");
    var sideBarEl = document.querySelector(".sidebar-wrapper");
    var hunEl = document.querySelector(".hun");
    hunburgerEl.addEventListener('click', (e) => {
        if (e.target.classList.contains("hun") || e.target.classList.contains("media-hunburger")) {
            sideBarEl.classList.toggle("shift");
            hunEl.classList.toggle("change")
        }
    })
})();
// SIDEBAR (CATEGORY) END

