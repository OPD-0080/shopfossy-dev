function itemFiltering(btnId, allList) {
    // finding dataset of the item and compare it to the dataset of the btn
    // and return it into the html

    /* to add filter, 
                        1. make sure dataset matches with what is inside the json file
                        2. add it to the destructuring
                        3. compare with the btnID in this function section
                    */
    var result = "";
    allList[0].forEach((item) => {
        if (item.categoryAll == btnId || item.subCategory == btnId || item.priceFtr == btnId) {
            result += `
                <div class="single-item-container">
                    <!-- ITEM IMAGE START -->
                    <div class="item-img-wrap" data-id=${item.id}>
                        <div class="item-img">
                        <img class="lazy-load-selector"
                            src="./img/main-categories/blur-img/blur.jpg" width="300px" height="300px" alt="img"
                            data-src="img/main-categories/${item.imgUrl}" width="300px" height="300px" alt="img"
                        >
                        </div>
                        <div class="heart-wrap"><div class="heart-img"></div></div>
                    </div>
                    <!-- ITEM IMAGE END -->
                    <!-- ITEM DESCRIPTION START -->
                    <div class="item-description-wrap">
                        <div class="item-title"> ${item.title} </div>
                        <div class="seller-name"> ${item.seller} </div>
                        <div class="star-rated"><img src="img/icons/${item.starRated}-star.png" alt=""></div>
                        <div class="item-price-wrap">
                            <div class="price"> ${item.price} </div>
                            <del class="price-del"> ${item.priceDel} </del>
                        </div>
                        <div href=${item.link} class="item-detail" data-det=${item.id}> detail </div>
                    </div>
                    <!-- ITEM DESCRIPTION END -->
                </div>
            `;
            var productsWrapper = document.querySelector(".products-wrapper");
            productsWrapper.innerHTML = result;
            //console.log(item);
            // item display animation start
            var singleItemWrap = document.querySelectorAll(".single-item-container");
            singleItemWrap.forEach(el => {
                el.classList.add("hide");
                setTimeout(() => {
                    el.classList.remove("hide");
                }, 200);
            })
            // item display animation end
        }
    });
}
export {itemFiltering}