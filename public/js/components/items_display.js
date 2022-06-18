function mainDisplay(allList) {
    var result = "";
    allList[0].forEach((el) => {
        result += `
            <div class="single-item-container">
                <!-- ITEM IMAGE START -->
                <div class="item-img-wrap" data-id=${el.id}>
                    <div class="item-img">
                        <div class="img-text-logo"> shopfossy </div>
                        <img class="lazy-load-selector"
                            src="img/main-categories/blur-img/blur.jpg" width="300px" height="300px" alt="img"
                            data-src="img/main-categories/${el.imgUrl}" width="300px" height="300px" alt="img"
                        >
                    </div>
                    <div class="heart-wrap"><div class="heart-img"></div></div>
                </div>
                <!-- ITEM IMAGE END -->
                <!-- ITEM DESCRIPTION START -->
                <div class="item-description-wrap">
                    <div class="item-title"> ${el.title} </div>
                    <div class="seller-name"> ${el.seller} </div>
                    <div class="star-rated"><img src="img/icons/${el.starRated}-star.png" alt=""></div>
                    <div class="item-price-wrap">
                        <div class="price">Ghc ${el.price} </div>
                        <del class="price-del"> ${el.priceDel} </del>
                    </div>
                    <div class="item-detail" data-det=${el.id}> detail </div>
                </div>
                <!-- ITEM DESCRIPTION END -->
            </div>
        `;
    });

    var productsWrapper = document.querySelector(".products-wrapper");
    productsWrapper.innerHTML = result;
}

function descriptionDisplay(allList) {
    //console.log(el);
    var showDes = "";
    allList[1].forEach((array) => {
        showDes += `
        <div class="item-profiling-wrapper" data-prof=${array.id}>
            <div class="item-profiling">
                <div class="item-profiling-container">
                    <div class="item-close-btn"></div>
                    <div class="profiling-container">
                        <div class="profiling-container-A">
                            <div class="profiling-sort-wrap">
                                <div class="sort-cell prof-sort">
                                    <div class="p-sort activated" data-sort="1"><img class="sort-img lazy-load-selector" data-sort="1" src="img/main-categories/blur-img/blur.jpg" data-src="img/main-categories/${array.imgSort1}" alt=""></div>
                                    <div class="p-sort" data-sort="2"><img class="sort-img lazy-load-selector" data-sort="2" src="img/main-categories/blur-img/blur.jpg" data-src="img/main-categories/${array.imgSort2}" alt=""></div>
                                    <div class="p-sort" data-sort="3"><img class="sort-img lazy-load-selector" data-sort="3" src="img/main-categories/blur-img/blur.jpg" data-src="img/main-categories/${array.imgSort3}" alt=""></div>
                                    <div class="p-sort" data-sort="4"><img class="sort-img lazy-load-selector" data-sort="4" src="img/main-categories/blur-img/blur.jpg" data-src="img/main-categories/${array.imgSort4}" alt=""></div>
                                    <div class="p-sort" data-sort="5"><img class="sort-img lazy-load-selector" data-sort="5" src="img/main-categories/blur-img/blur.jpg" data-src="img/main-categories/${array.imgSort5}" alt=""></div>
                                    <div class="p-sort" data-sort="6"><img class="sort-img lazy-load-selector" data-sort="6" src="img/main-categories/blur-img/blur.jpg" data-src="img/main-categories/${array.imgSort6}" alt=""></div>
                                </div>
                                <div class="sort-cell prof-sort-confirm">
                                    <div>
                                        <div class="confirm-overlay"></div>
                                        <div class="p-rel-confirm"><img class="lazy-load-selector" src="img/main-categories/blur-img/blur.jpg" data-src="img/main-categories/${array.imgUrl}" alt=""></div>
                                        <div class="p-confirm" data-confirm="1"><img class="lazy-load-selector" src="img/main-categories/blur-img/blur.jpg" data-src="img/main-categories/${array.imgSort1}" alt=""></div>
                                        <div class="p-confirm" data-confirm="2"><img class="lazy-load-selector" src="img/main-categories/blur-img/blur.jpg" data-src="img/main-categories/${array.imgSort2}" alt=""></div>
                                        <div class="p-confirm" data-confirm="3"><img class="lazy-load-selector" src="img/main-categories/blur-img/blur.jpg" data-src="img/main-categories/${array.imgSort3}" alt=""></div>
                                        <div class="p-confirm" data-confirm="4"><img class="lazy-load-selector" src="img/main-categories/blur-img/blur.jpg" data-src="img/main-categories/${array.imgSort4}" alt=""></div>
                                        <div class="p-confirm" data-confirm="5"><img class="lazy-load-selector" src="img/main-categories/blur-img/blur.jpg" data-src="img/main-categories/${array.imgSort5}" alt=""></div>
                                        <div class="p-confirm" data-confirm="6"><img class="lazy-load-selector" src="img/main-categories/blur-img/blur.jpg" data-src="img/main-categories/${array.imgSort6}" alt=""></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="profiling-container-B">
                            <div class="profiling-content-wrapper">
                                <div class="prof-seller-name"> ${array.seller} </div>
                                <div class="prof-star">
                                    <div class="country"> Ghana </div><div>|</div>
                                    <div class="star-rated"><img src="img/icons/${array.starRated}-star.png" alt=""></div>
                                </div>
                                <div class="prof-title"> 
                                    ${array.title}
                                </div>
                                <div class="prof-price-stock-wrap"> 
                                    <div> GHC <span class="prof-price">${array.price}</span> </div>
                                    <div><span class="prof-stock">${array.stockStatus}</span> in stock </div>
                                </div>
                                <div class="prof-tax"> Local taxes included (where applicable) </div>
                                <div class="prof-cart-btn" data-id=${array.id}>
                                    <div class="in-cart-overlay">In Cart</div>
                                    <div class="cart-btn" data-id=${array.id}><div class="cart-i" data-id=${array.id}></div> Add to Cart </div>
                                </div>
                                <div class="sell-notice">
                                    <div></div>
                                    <div> customer demand very high! </div>
                                </div>
                                <div class="prof-highlight">
                                    <div class="prof-sub-header">
                                        <div> Highlight </div>
                                        <div class="prof-icon" data-icon="1"></div>
                                    </div>
                                    <div class="highlight-content prof-i" data-i="1">
                                        <div>
                                            <div class="item-uid"></div>
                                            <div> ${array.UID} </div>
                                        </div>
                                        <div>
                                            <div class="hand-icon"></div>
                                            <div> ${array.madeBy} </div>
                                        </div>
                                        <div>
                                            <div class="location-icon"></div>
                                            <div> Ships from a small business in Ghana </div>
                                        </div>
                                        <div>
                                            <div class="material-icon"></div>
                                            <div> ${array.material} </div>
                                        </div>
                                        <div>
                                            <div class="measure-icon"></div>
                                            <div> ${array.dimension} </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="prof-shipping-return">
                                    <div class="prof-sub-header">
                                        <div> Shipping & Return Policies </div>
                                        <div class="prof-icon" data-icon="2"></div>
                                    </div>
                                    <div class="shipping-return-content prof-i" data-i="2">
                                        <div class="shipping-return">
                                            <div> Estimated arrival (depending on the timing of order)</div>
                                            <div class="date-estimated">
                                                <span class="month">Sep</span> <span class="date-ini">22</span> - <span class="date-fin">26</span> 
                                            </div>
                                        </div>
                                        <div class="date-progress-wrap">
                                            <div><hr/></div>
                                            <div class="date-icon-wrap">
                                                <div><div></div></div>
                                                <div><div></div></div>
                                                <div><div></div></div>
                                            </div>
                                            <div class="progress-section-container">
                                                <div class="progress-info">
                                                    <div class="date"><span class="month">Sep</span> <span class="date-ini">22</span></div>
                                                    <div class="date-info"> order placed </div>
                                                </div>
                                                <div class="progress-info">
                                                    <div class="date"><span class="month">Sep</span> <span class="date-Fw1">23</span> - <span class="date-Fw2">24</span></div>
                                                    <div class="date-info"> order shipped </div>
                                                </div>
                                                <div class="progress-info">
                                                    <div class="date"><span class="month">Sep</span> <span class="date-Fw2">24</span> - <span class="date-fin">26</span></div>
                                                    <div class="date-info"> delivered! </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="cost-return-exchange-wrap">
                                            <div class="cost-return-section">
                                                <div> cost to ship </div>
                                                <div class="ship-cost">${array.shipCost}</div>
                                            </div>
                                            <div class="cost-return-section">
                                                <div> Returns-Exchanges status </div>
                                                <div class="return-status">${array.returnStatus}</div>
                                                <div> Exception may apply </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="profiling-container-C">
                            <div class="prof-description">
                                <div class="prof-sub-header">
                                    <div> Description </div>
                                    <div class="prof-icon" data-icon="3"></div>
                                </div>
                                <div class="description-content prof-i" data-i="3">
                                    <div class="des-content">
                                        ${array.description}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    });
    var displayDes = document.querySelector(".showing-profiling");
    displayDes.innerHTML = showDes;
}
export {mainDisplay, descriptionDisplay}