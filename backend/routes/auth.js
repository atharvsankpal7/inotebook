const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const validatorArray = [
    //
    body("name", "the value of name should be atleast 5").isLength({ min: 5 }),
    body("password", "Enter strong password").isLength({ min: 8 }),
    body("email", "Enter valid email, please").isEmail(),
];

// endpoint -->api/auth/createuser . No login required
router.post("/createuser", validatorArray, async (request, response) => {
    //checking for validation errors
    const errors = validationResult(request);
    // if errors are there return
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }
    try {
        //checking if user does already exist with the requested email-id
        let user = await User.findOne({ email: request.body.email });
        // if user already exist return
        if (user) {
            return response
                .status(400)
                .json({ error: "User with this email already exists" });
        }

        // if user doesn't exist then create a new user
        user = User.create({
            name: request.body.name,
            password: request.body.password,
            email: request.body.email,
        });
        // warning user creation success
        response.send(
            `user created ${JSON.stringify(request.body, null, "\t")}`
        );
    } catch (err) {
        console.log(err.message);
        response.status(500).send("Error contacting database");
    }
});
module.exports = router;
