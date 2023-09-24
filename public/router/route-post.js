const express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// IMPORT CONTROLLERS FILES
const checkout = require("../controller/checkout");
const {create_user_credentials, user_signIn} = require("../controller/user_register");
const { edit_user_profile, uploadPhoto, delete_account } = require("../controller/editUserProfile");
const { cc_sortUploadedImages, cc_sortData, submit_createData, submit_modifyData, delete_createData } = require("../controller/db/db_create")
const { fs_fileExist } = require("../utils/file_system");
const { sharpStorage, cc_sharpStorage } = require("../controller/settings");
const { pushNotification } = require("../controller/pushNotification");
// ...

// MULTER MIDDLEWARE SETTINGS
    // FOR USER EDITING SECTION
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.mimetype.startsWith("image")) {
            const isFileExisted = fs_fileExist(sharpStorage.multer);
            if (isFileExisted) {
                console.log("multer storage found");
                cb(null, "./uploaded_images/multer_storage")
            }
        }
        else {
            console.log("Uploaded file must be an image");
        }
        
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`)
    }
})
    // .......
const cc_storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.mimetype.startsWith("image")) {
            const isFileExisted = fs_fileExist(cc_sharpStorage.img);
            if (isFileExisted) {
                console.log("........multer storage found.........");
                cb(null, "./img/cc_upload_image")
            }
        }
        else {
            console.log("Uploaded file must be an image");
        }
        
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`)
    }
})
const upload = multer({ storage: storage });
const cc_upload = multer({ storage: cc_storage });
// ....

// CHECKOUT
router.post("/checkout", checkout);
// ...
// USER REGISTRATION 
router.post("/create_user", create_user_credentials );
router.post("/log_reset", passport.authenticate("local", { failureRedirect: '/register', failureMessage: true }), user_signIn);
// ....
// EDIT USER PROFILE
router.post("/editUserProfile", edit_user_profile);
// ...
router.post("/uploadPhoto", upload.single("imageUpload"), uploadPhoto);
// ...
// DELETE USER ACCOUNT
router.post("/deleteaccount", delete_account)
// ...
// RECEIVING PUSH NOTIFICATION DATA
router.post("/subscriber", pushNotification)
// ....
// REDIRECTING URL AFTER GOOGLE AUTH 2.0.
router.post("/redirectURL", (req, res) => {
    res.redirect("index")
})
// ......
// FOR CONTROL CENTER SECTION
router.post("/db_createData", cc_upload.array('cc_upload_image', 6), cc_sortUploadedImages, cc_sortData)
router.post("/submitCreateData", submit_createData);
router.post("/submitModifyData", submit_modifyData);
router.post("/deleteCreateData", delete_createData);

// .....




module.exports = router;
