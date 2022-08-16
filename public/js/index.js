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
        const icon = el.icon;
        
        const res = {text, href, icon, dataId};
        return res;
    })

    var show = "";
    categoryList.forEach(el => {
        show += `
        <li><div class="i"><img src=${el.icon} alt=""></div><a href="${el.href}"> ${el.text} </a></li>
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
        var {name} = item.name;
        var {href} = item.href;
        var {classCode} = item.classCode;
        return (id, imgUrl, imgHover, name, classCode, href)
    });
    pickUpLists[1].map(item => {
        var {id} = item.id;
        var {imgUrl} = item.imgUrl;
        var {imgHover} = item.imgHover;
        var {name} = item.name;
        var {href} = item.href;
        var {classCode} = item.classCode;
        return (id, imgUrl, imgHover, name, classCode, href)
    });
    pickUpLists[2].map(item => {
        var {id} = item.id;
        var {imgUrl} = item.imgUrl;
        var {imgHover} = item.imgHover;
        var {name} = item.name;
        var {href} = item.href;
        var {classCode} = item.classCode;
        return (id, imgUrl, imgHover, name, classCode, href)
    });
    pickUpLists[3].map(item => {
        var {id} = item.id;
        var {imgUrl} = item.imgUrl;
        var {imgHover} = item.imgHover;
        var {name} = item.name;
        var {href} = item.href;
        var {classCode} = item.classCode;
        return (id, imgUrl, imgHover, name, classCode, href)
    });

   

    
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

