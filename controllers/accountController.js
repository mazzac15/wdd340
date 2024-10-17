// Needed Resources 
const utilities = require("../utilities/")
const accountModel = require("../models/account-model")

/* ****************************************
*  Deliver login view
* *************************************** */
async function buildLogin(req, res, next) {
    let nav = await utilities.getNav()
    let loginForm = utilities.buildLogin()
    
    res.render("account/login", {
        title: "Login",
        nav,
        loginForm,
    })
}

/* ****************************************
*  Deliver registration view
* *************************************** */
async function buildRegister(req, res, next) {
    let nav = await utilities.getNav()
    let registerForm = utilities.buildRegister()
    res.render("account/register", {
        title: "Register",
        nav,
        registerForm,
        // errors: null,
    })
}

/* ****************************************
*  Process registration
* *************************************** */
async function registerAccount(req, res) {
    let nav = await utilities.getNav()
    console.log(req.body);
    const { 
        account_firstname,
        account_lastname,
        account_email,
        account_password 
    } = req.body

    const regResult = await accountModel.registerAccount(
        account_firstname,
        account_lastname,
        account_email,
        account_password
    )

    if (regResult) {
        req.flash(
            "notice",
            `Congratulations, you\'re registered ${account_firstname}. Please log in.`
        )
        res.status(201).render("account/login", {
            title: "Login",
            nav,
            loginForm,
        })
    } else {
        req.flash("notice", "Sorry, the registration failed.")
        res.status(501).render("account/register", {
            title: "Registration",
            nav,
            errors: null,
        })
    }
}
module.exports = { buildLogin, buildRegister, registerAccount }
