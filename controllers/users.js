const User = require("../models/user.js");

module.exports.renderSingUpForm = (req, res) => {
    res.render("users/signup.ejs");
};

module.exports.signUp = async (req, res) => {
    try{
        let { username, email, password } = req.body;
        const newUser = new User({
            email, username
        })
        const registeruser = await User.register(newUser, password);
        console.log(registeruser);
        req.login(registeruser , (err)=>{
            if(err){
              return  next(err);
            }
            req.flash("success", "Welcome on wanderlust");
            res.redirect("/listings");
        })
        
    }catch(e){
        req.flash("error" , e.message);
        res.redirect("/listings");
    }
    };

    module.exports.renderloginForm = (req ,res)=>{
        res.render("users/login.ejs");
    }

    module.exports.login = async (req, res)=>{
        req.flash("success", "Welcome Back to Wanderlust");
        let redirectUrl = res.locals.redirectUrl || "/listings";
        res.redirect(redirectUrl);
    };

    module.exports.logout =(req ,res)=>{
        req.logout((err)=>{
            if(err){
                next(err);
            }
            req.flash("success" , "You are logged out");
            res.redirect("/listings");
        })
    };