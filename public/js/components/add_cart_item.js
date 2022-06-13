// DISPLAYING CART ITEM IN HTML START
function addCartItem(el) {
    var div = document.createElement("div");
    div.classList.add("cart-single-wrap");
    div.innerHTML = `
        <div class="cart-item-img">
            <div class="cart-img"><img src="img/main-categories/${el.imgUrl}" alt=""></div>
            <div class="remove-btn" data-id=${el.id}></div>
        </div>
        <div class="cart-item-content">
            <div class="cart-title"> ${el.title} </div>
            <div class="cart-price-wrap"> Ghc <span class="cart-price"> ${el.price} </span> </div>
        </div>
        <div class="cart-item-logic">
            <div class="cart-arrow arrow-up"><div class="arrow-up" data-id=${el.id}></div></div>
            <div class="item-quantity"> ${el.amount} </div>
            <div class="cart-arrow arrow-down"><div class="arrow-down" data-id=${el.id}></div></div>
        </div>
    `;
    var cartContainer = document.querySelector(".cart-container");
    cartContainer.appendChild(div);
}
export {addCartItem}
// DISPLAYING CART ITEM IN HTML END