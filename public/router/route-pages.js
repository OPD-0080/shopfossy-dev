const express = require("express");
const { session } = require("passport");
const router = express.Router();
const passport = require("passport");

//  MIDDLEWARE
const { index, register, edit_profile, signOut, companyA, companyB, checkout, 
    thankyou, error_internal, error_pageNotFound, admin_register, control_center, createData } = require("./get_handlers");
// ....
 // ROUTE INDEX PAGE
router.get("/index", index)
// ...
// ROUTE REGISTER PAGE
router.get("/register", register)
// ...
// EDIT USER PROFILE
router.get("/edit_profile", edit_profile)
// ....
// ROUTE COMPANY PAGES
router.get("/company-name-1", companyA)
router.get("/company-name-2", companyB)
// ...
// ROUTE CHECKOUT PAGE
router.get("/checkout", checkout)
// ...
// ROUTE FALLBACK PAGE
router.get("/500", error_internal)
// ...
// ROUTE 404 PAGE
router.get("/404", error_pageNotFound)
// ...
// INVOICE PAGE 
router.get("/thankyou", thankyou)
/// ....
// ROUTE CHECKOUT PAGE
router.get("/admin", admin_register)
// ...
// ROUTE CHECKOUT PAGE
router.get("/controlCenter/:id", control_center)
router.get("/database/createData", createData)
// ...
// ROUTE SIGNED OUT PAGE
router.get("/signOut", signOut)
// ...
// GOOGLE AUTHENTICATION GET ROUTER
router.get("/callback", (req, res) => {res.render("callback")});
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login', session: true }), (req, res) => {
    res.redirect("/callback")    
});

// ....

module.exports = router;