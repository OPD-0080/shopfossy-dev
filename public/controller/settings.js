const sharpStorage = {
    multer: "./uploaded_images/multer_storage",
    resized: "./uploaded_images/sharpImages",
    compress: "./uploaded_images/compress"
}
const cc_sharpStorage = {
    multer: "./cc_uploaded_images/multer_storage",
    resized: "./cc_uploaded_images/sharpImages",
    compress: "./cc_uploaded_images/compress",
    img: "./img/cc_upload_image",
    pending: "./img/upload_image_pending",
    default: "blur-img/blur.webp",
    backup: "./img/backup",
}
const cc_jsonFolders = {
    pending: "./json/uploaded_data_pending",
    backup: "./json/backup",
    default: "./json/cc_entryOptionsDefaults.json"
}
const tables = {
    users: "ui.users",
    images: "ui.user_images",
    checkout: "ui.checkout",
    products: "ui.products",
    ordered_items: "ui.ordered_items",
    description: "ui.product_descriptions",
    google: "ui.user_google"
}





module.exports = {
    sharpStorage, tables, cc_sharpStorage, cc_jsonFolders
}