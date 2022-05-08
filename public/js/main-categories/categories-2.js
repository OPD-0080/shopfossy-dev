// IMPORTS FROM COMPONENTS FOLDER START
import {mainDisplay, descriptionDisplay} from '../components/items_display.js';
import {itemFiltering} from '../components/item_filtering.js';
import {lazyLoading} from '../components/lazy_loading.js';
import {profilePage} from '../components/profile_page.js';
import {setCartValues} from '../components/set_cart_values.js';
import {addCartItem} from '../components/add_cart_item.js';
// IMPORTS FROM COMPONENTS FOLDER END

//import {first_name, last_name, email, number, gender, region, city, location, agreement} from "../customer_details.js";




// MAIN PRODUCTS SECTION START
// CLOTH & SHOES START
    var cart = [];
    var buttonsDOM = [];
    var cartContainer = document.querySelector(".cart-container");
    var checkOutBtn = document.querySelector(".cart-checkout");

    class Products {
        async getList() {
            var res = await fetch("json/main-categories/items-name-2/mainData.json");
            var data = await res.json();
            var desRes = await fetch("json/main-categories/items-name-2/description.json");
            var desData = await desRes.json();

            var list = data.itemsArray;
            var descriptions = desData.description;
            //console.log(descriptions);

            // Destructuring array
            list.map((item) => {
                var {id} = item.id;
                var {UID} = item.UID;
                var {title} = item.title;
                var {seller} = item.seller;
                var {price} = item.price;
                var {priceDel} = item.priceDel;
                var {star} = item.starRated;
                var {imgUrl} = item.imgUrl;
                var {link} = item.link;
                var {subCategory} = item.subCategory;
                var {categoryAll} = item.categoryAll;
                var {priceFtr} = item.priceFtr;
                return (
                    id, UID, title, seller, price, priceDel, star, imgUrl, link, subCategory, categoryAll, priceFtr
                );
            });
            descriptions.map((item) => {
                var {id} = item.id;
                var {UID} = item.UID;
                var {title} = item.title;
                var {seller} = item.seller;
                var {price} = item.price;
                var {stockStatus} = item.stockStatus;
                var {star} = item.starRated;
                var {imgUrl} = item.imgUrl;
                var {imgSort1} = item.imgSort1;
                var {imgSort2} = item.imgSort2;
                var {imgSort3} = item.imgSort3;
                var {imgSort4} = item.imgSort4;
                var {imgSort5} = item.imgSort5;
                var {imgSort6} = item.imgSort6;
                var {madeBy} = item.madeBy;
                var {material} = item.material;
                var {dimension} = item.dimension;
                var {shipCost} = item.shipCost;
                var {returnStatus} = item.returnStatus;
                var {description} = item.description;

                return (
                    id, UID, title, seller, price, stockStatus, star, imgUrl, imgSort1, imgSort2, imgSort3, imgSort4, imgSort5, imgSort6, madeBy, material, dimension, shipCost, returnStatus, description
                );
            });
            var allList = [list, descriptions];
            return allList; // the array "description" will be used for the cart
        }
    }

    export class UI {
        displayList(allList) {

            mainDisplay(allList)

            this.sideBar_filter(allList);

            // btn triggered to open customer form html page
            checkOutBtn.onclick = () => {
                window.location.href = "form/customer_info.html";
            }

            // GET & SHOW ITEM DESCRIPTION START
            this.showDescription(allList);

            // VANILLA LAZY LOAD START
            lazyLoading()
        }

        // GET & SHOW ITEM DESCRIPTION START
        showDescription(allList) {

            descriptionDisplay(allList)

            profilePage();
        }
        // GET & SHOW ITEM DESCRIPTION END

        // SIDEBAR FILTER  START
        sideBar_filter(allList) {
            // SIDEBAR (FILTER) START
            var filterContainer = document.querySelectorAll(".filter-container");
            filterContainer.forEach((container) => {
                container.onclick = (e) => {
                    if (e.target.classList.contains("filter")) {
                        // selecting the active class and then remove the class active
                        var el = container.querySelector(".active");
                        el.classList.remove("active");
                        // adding the class active t o the selected div
                        e.target.classList.add("active");
                        //console.log(e.target);
                        // getting the dataset of the click btn
                        var btnId = e.target.getAttribute("data-id");
                        //console.log(btnId);

                        itemFiltering(btnId, allList);
                        // VANILLA LAZY LOAD START
                        lazyLoading()
                    }
                };
            });
            // SIDEBAR (FILTER) END
        }
        // SIDEBAR FILTER END

        // SHOPPING CART START
        shoppingCart() {
            var cartButtons = [...document.querySelectorAll(".prof-cart-btn")];
            buttonsDOM = cartButtons;

            cartButtons.forEach((btn) => {
                btn.onclick = (e) => {
                    var id = e.target.dataset.id; // getting all the id of the cart btn

                    var cartHover = btn.querySelector(".in-cart-overlay");
                    var inCart = cart.find((item) => item.id === id);
                    if (inCart) {
                        cartHover.classList.add("on");
                        btn.classList.add("cursor");
                    }

                    if (e.target.classList.contains("cart-i") || e.target.classList.contains("cart-btn") || e.target.classList.contains("prof-cart-btn")) {
                        cartHover.classList.add("on");
                        btn.classList.add("cursor");

                        // getting only the item from json in object when cart btn is triggered
                        var cartItem = {...Storage.getItems(id),amount: 1};

                        cart = [...cart, cartItem]; // placing them into the cart array
                        console.log(cart);

                        //save cart products on local storage bt has to be stored in the STORAGE class first
                        Storage.saveCart(cart);

                        //updating cart values
                        setCartValues(cart);

                        // adding each product to cart page in html
                        addCartItem(cartItem);

                        // enabling check out btn when cart is empty or not
                        this.checkOutBtn(cart)
                    }
                };
            });
        }
        // SHOPPING CART END

        // KEEPING CART & VALUES WHEN (PAGE IS REFRESHED) START
        setApp() {
            cart = Storage.getCart();
            setCartValues(cart); // keeping cart values updated;
            this.populateCart(cart); // keeping cart items in cart page as page refreshes
            this.customerForm(cart);
            this.checkOutBtn(cart);
            return (cart)
        }
        

        // POPULATING CART START
        populateCart(cart) {
            cart.forEach((item) => addCartItem(item));
        }
        // POPULATING CART END
        // KEEPING CART & VALUES WHEN (PAGE IS REFRESHED) END

        checkOutBtn(cart) {
            // enabling check out btn when cart is empty or not
            (cart == "") ? checkOutBtn.classList.remove("disable") : checkOutBtn.classList.add("disable")
        }

        // CUSTOMER FORM START
        customerForm(cart) {
            
        }
        // CUSTOMER FORM END

        cartLogic() {
            // clearing all cart items start
            var clearBtn = document.querySelector(".cart-clear");
            clearBtn.onclick = () => {
                this.clearCart();
            };
            // clearing all cart items start

            var cartContainer = document.querySelector(".cart-container");
            cartContainer.onclick = (e) => {
                //console.log(e.target);
                if (e.target.classList.contains("remove-btn")) {
                    var cartRemove = e.target;

                    var id = cartRemove.dataset.id;
                    cartContainer.removeChild(cartRemove.parentElement.parentElement);
                    this.removeItem(id); // remove item from cart array

                    // checkOut Btn disabled when clear btn is triggered
                    this.checkOutBtn(cart);
                
                } else if (e.target.classList.contains("arrow-up")) {
                    var arrowUp = e.target;
                    var id = arrowUp.dataset.id;

                    var quantity = cart.find((item) => item.id == id);
                    quantity.amount = quantity.amount + 1;
                    //console.log(quantity.amount);
                    // display it in HTML
                    var quantityVal = arrowUp.parentElement.nextElementSibling;
                    quantityVal.innerHTML = quantity.amount;

                    setCartValues(cart);
                    Storage.saveCart(cart);
                } else if (e.target.classList.contains("arrow-down")) {
                    var arrowDown = e.target;
                    var id = arrowDown.dataset.id;

                    var quantity = cart.find((item) => item.id == id);
                    quantity.amount = quantity.amount - 1;
                    //console.log(quantity.amount);
                    // display it in HTML
                    var quantityVal = arrowDown.parentElement.previousElementSibling;
                    quantityVal.innerHTML = quantity.amount;

                    if (quantity.amount > 0) {
                        quantityVal.innerHTML = quantity.amount;
                        
                        setCartValues(cart);
                        Storage.saveCart(cart);
                    } else {
                        cartContainer.removeChild(
                            arrowDown.parentElement.parentElement.parentElement
                        );
                        this.removeItem(id);
                        setCartValues(cart);
                        Storage.saveCart(cart);
                        // checkOut Btn disabled when clear btn is triggered
                        this.checkOutBtn(cart);
                    }
                }
            };
        }
        // CLEARING CART ITEMS START
        clearCart() {
            var cartItem = cart.map((item) => item.id); // getting all id's of the item in cart
            cartItem.forEach((id) => this.removeItem(id)); // looping through all items id

            while (cartContainer.children.length > 0) {
                // getting the children el of parentEl and checking if is > 0
                cartContainer.removeChild(cartContainer.children[0]); // remove items from the cart page itself
            }
            // checkOut Btn disabled when clear btn is triggered
            this.checkOutBtn(cart);
        }
        removeItem(id) {
            cart = cart.filter((item) => item.id !== id); // filtering cart and compare with the item id to get the unequal ones;

            setCartValues(cart); 
            Storage.saveCart(cart);

            var cartBtnOverall = document.querySelectorAll(".prof-cart-btn");
            cartBtnOverall.forEach((el) => {
                el.classList.remove("cursor");
            });
            var cartHover = document.querySelectorAll(".in-cart-overlay");
            cartHover.forEach((el) => {
                el.classList.remove("on");
            });
            let button = this.getSingleButton(id); //  to change the text "in cart" to the original text
        }
        getSingleButton(id) {
            return buttonsDOM.find((button) => button.dataset.id === id); // since all button are in the buttonDOM as an array, we find that dataset id and strictly compare to the single button id
        }
        // CLEARING CART ITEMS END
    }
    
    class Storage {
        static saveItems(allList) {
            localStorage.setItem("allList", JSON.stringify(allList));
        }
        // GETTING ONLY ITEM DESCRIPTION FROM LOCAL STORAGE START
        static getDescription(dId) {
            var allList = JSON.parse(localStorage.getItem("allList"));
            return allList[1].find((el) => el.id == dId);
        }
        // GETTING ONLY ITEM DESCRIPTION FROM LOCAL STORAGE END

        // GETTING ONLY MAIN ITEMS FROM LOCAL STORAGE START
        static getItems(id) {
            var allList = JSON.parse(localStorage.getItem("allList"));
            return allList[0].find((item) => item.id == id);
        }
        // GETTING ONLY MAIN ITEMS FROM LOCAL STORAGE END

        // SAVING CART START
        static saveCart(cart) {
            localStorage.setItem("cart", JSON.stringify(cart));
        }
        // SAVING CART END

        // GETTING THE CART START
        static getCart() {
            return localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
        }
        // GETTING THE CART END
    }

    document.addEventListener("DOMContentLoaded", () => {
        var products = new Products();
        var ui = new UI();

        // keeping the cart when page is refreshed
        ui.setApp();

        products.getList().then((allList) => {
            //console.log(allList );
            ui.displayList(allList);
            Storage.saveItems(allList);

        }).then(() => {
            ui.shoppingCart();
            ui.cartLogic();
        });
    });

// CLOTH & SHOES START
// MAIN PRODUCTS SECTION END