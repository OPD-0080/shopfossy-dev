// CART VALUES CALCULATION START

function setCartValues(cart) {
    var total = 0;
    var itemAll = 0;
    cart.forEach((el) => {
        total += el.price * el.amount;
        itemAll += el.amount;
    });
    
    total = total.toFixed(2);
    var cartNumberEl = document.querySelector(".cart-number");
    var totalEl = document.querySelector(".total-value");
    cartNumberEl.innerHTML = itemAll;
    totalEl.innerHTML = total;

    let total_items = {total, itemAll}
    return (total_items)
}
export {setCartValues}
// CART VALUES CALCULATION END