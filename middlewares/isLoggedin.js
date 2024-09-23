const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");

module.exports = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        req.flash("error", "No token provided. Please log in.");
        return res.redirect("/");
    }

    try {
        const data = jwt.verify(token, process.env.JWT_KEY || "ashh"); // Use environment variable for secret key   

        req.user = data; // Attach user data to request object
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        req.flash("error", "Invalid or expired token. Please log in again.");
        res.redirect("/");
    }
};
