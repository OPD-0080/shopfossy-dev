import { categoryList } from './sideBarList/categoryList.js';
import { pickUpLists } from './sideBarList/pickUpList.js';

//@MEDIA MENU START
(function() {
    var hunburgerEl = document.querySelector(".media-hunburger");
    var menuLists = document.querySelector(".index-category");
    var indexOverlay = document.querySelector(".index-overlay");
    var hunEl = document.querySelector(".hun");

    hunburgerEl.addEventListener("click", (e) => {
        hunEl.classList.toggle("change");
        menuLists.classList.toggle("open");
        indexOverlay.classList.toggle("close");
    })
    /*hunburgerEl.addEventListener("mouseleave", (e) => {
        var hunEl = document.querySelector(".hun");
        setTimeout(() => {
            hunEl.classList.remove("change");
            menuLists.classList.remove("open");
            indexOverlay.classList.remove("close");
        }, 500);
    })*/

})();
//@MEDIA MENU END
//SHOW CART START
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
//SHOW CART END
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


// CATEGORY LISTS START
(function(){

    // Destructuring array
    categoryList.map(el => {
        const text = el.text;
        const href = el.href;
        const dataId = el.dataId;
        
        const res = {text, href, dataId};
        return res;
    })

    var show = "";
    categoryList.forEach(el => {
        show += `
        <li><div></div><a href="${el.href}"> ${el.text} </a></li>
        `;

        var res = document.querySelector(".category-wrap");
        res.innerHTML = show;
    })
    
})();
// CATEGORY LISTS END

// INDEX PICK UP START
(function(){

    pickUpLists[0].map(item => {
        var {id} = item.id;
        var {imgUrl} = item.imgUrl;
        var {imgHover} = item.imgHover;
        var {price} = item.price;
        var {href} = item.href;
        var {classCode} = item.classCode;
        return (id, imgUrl, imgHover, price, classCode, href)
    });
    pickUpLists[1].map(item => {
        var {id} = item.id;
        var {imgUrl} = item.imgUrl;
        var {imgHover} = item.imgHover;
        var {price} = item.price;
        var {href} = item.href;
        var {classCode} = item.classCode;
        return (id, imgUrl, imgHover, price, classCode, href)
    });
    pickUpLists[2].map(item => {
        var {id} = item.id;
        var {imgUrl} = item.imgUrl;
        var {imgHover} = item.imgHover;
        var {price} = item.price;
        var {href} = item.href;
        var {classCode} = item.classCode;
        return (id, imgUrl, imgHover, price, classCode, href)
    });
    pickUpLists[3].map(item => {
        var {id} = item.id;
        var {imgUrl} = item.imgUrl;
        var {imgHover} = item.imgHover;
        var {price} = item.price;
        var {href} = item.href;
        var {classCode} = item.classCode;
        return (id, imgUrl, imgHover, price, classCode, href)
    });

    //console.log(array);
    var show = ""; var showB = ""; var showC = ""; var showD = "";
    pickUpLists[0].forEach(item => {
        show += `
        <div class="C-wrap ${item.classCode}" data-id=${item.id}>
            <a href=${item.href}>
                <div class="image-cover"></div>
                <img class="img-real intersection-effect" 
                    src=${item.imgUrl} alt=""
                    data-src=${item.imgUrl} alt=""
                />
                <img class="img-display intersection-effect" 
                    src=${item.imgHover} alt=""
                    data-src=${item.imgHover} alt=""
                />
            </a>
            <div class="heart-wrap"><div class="heart-img"></div></div>
            <div class="image-price"> GHC <span class="C-price"> ${item.price} </span> </div>
        </div>
        `
    })
    var pickUpWrapA = document.querySelectorAll(".show1");
    pickUpWrapA.forEach(el => {
        el.innerHTML = show;
    });
    pickUpLists[1].forEach(item => {
        showB += `
        <div class="C-wrap ${item.classCode}" data-id=${item.id}>
            <a href=${item.href}>
                <div class="image-cover intersection-effect"></div>
                <img class="img-real" 
                    src=${item.imgUrl} alt=""
                    data-src=${item.imgUrl} alt=""
                />
                <img class="img-display intersection-effect" 
                    src=${item.imgHover} alt=""
                    data-src=${item.imgHover} alt=""
                />
            </a>
            <div class="heart-wrap"><div class="heart-img"></div></div>
            <div class="image-price"> GHC <span class="C-price"> ${item.price} </span> </div>
        </div>
        `
    })
    var pickUpWrapB = document.querySelector(".show2");
    pickUpWrapB.innerHTML = showB;
    pickUpLists[2].forEach(item => {
        showC += `
        <div class="C-wrap ${item.classCode}" data-id=${item.id}>
            <a href=${item.href}>
                <div class="image-cover"></div>
                <img class="img-real intersection-effect" 
                    src=${item.imgUrl} alt=""
                    data-src=${item.imgUrl} alt=""
                />
                <img class="img-display intersection-effect" 
                    src=${item.imgHover} alt=""
                    data-src=${item.imgHover} alt=""
                />
            </a>
            <div class="heart-wrap"><div class="heart-img"></div></div>
            <div class="image-price"> GHC <span class="C-price"> ${item.price} </span> </div>
        </div>
        `
    })
    var pickUpWrapC = document.querySelector(".show3");
    pickUpWrapC.innerHTML = showC;
    pickUpLists[3].forEach(item => {
        showD += `
        <div class="C-wrap ${item.classCode}" data-id=${item.id}>
            <a href=${item.href}>
                <div class="image-cover"></div>
                <img class="img-real intersection-effect" 
                    src=${item.imgUrl} alt=""
                    data-src=${item.imgUrl} alt=""
                />
                <img class="img-display intersection-effect" 
                    src=${item.imgHover} alt=""
                    data-src=${item.imgHover} alt=""
                />
            </a>
            <div class="heart-wrap"><div class="heart-img"></div></div>
            <div class="image-price"> GHC <span class="C-price"> ${item.price} </span> </div>
        </div>
        `
    })
    var pickUpWrapD = document.querySelector(".show4");
    pickUpWrapD.innerHTML = showD;

    
    // FILTER START
        var navContainer = document.querySelectorAll(".C-nav");
        navContainer.forEach(item => {
            item.onclick = (e) => {
                if (e.target.classList.contains("C-list") || e.target.classList.contains("i") || e.target.classList.contains("t") || e.target.classList.contains("is")) {
                    var select = e.target;
                    item.querySelector(".active").classList.remove("active");
                    select.classList.add("active");
                    var navId = e.target.dataset.id;
                
                    //this.filterRes(navId)
                    var slideWrap = document.querySelectorAll(".slide");
                    var realSlide = document.querySelector(".real-slide");
                    slideWrap.forEach(el => {
                        var slideId = el.getAttribute("data-id");
                        if (navId == slideId) {
                            el.classList.add("appear");
                            realSlide.classList.add("disappear");
                        }
                        else {
                            el.classList.remove("appear")
                        }
                    })
                }
                
            }
        })
    // FILTER END


    // LAZY LOADING START
        var images = document.querySelectorAll(".intersection-effect");
        var imageOptions = {};

        var observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                /* intersection checking to see if images is not on screen, 
                    then will return image non screen by updating the images
                */
                if (!entry.isIntersecting) {
                    return
                }
                // images target (UPDATING IMAGES ON SCREEN)
                var image = entry.target;
                
                // single images 
                var newUrl = image.getAttribute("data-src");
                image.src = newUrl;

                // preventing server from reloading images again after image already loads
                observer.unobserve(image);
            })
        }, imageOptions)

        images.forEach(image => {
            // single images 
            /*var newUrl = image.getAttribute("data-src");
            image.src = newUrl;*/
            observer.observe(image)
        })
    // LAZY LOADING END

})()

