
function func_thankyou() {
    let client_info = sessionStorage.getItem("client_info");
    let client_order = sessionStorage.getItem("client_order");

    console.log(client_info);
    console.log(client_order);
}
module.exports = func_thankyou;