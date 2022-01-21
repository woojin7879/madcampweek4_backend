const express = require("express");
const User = require("../../models/user");
const router = express.Router();
const bcrypt = require("bcryptjs");

router.post(
    "/register",
    async (req, res) => {

        const {userid, loginid, password, nickname, userlevel} = req.body;

        try {
            let user = await User.findOne({ loginid });
            let name = await User.findOne({ nickname });
            if (user) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "ID already exists" }] });
            }
            if (name) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "Nickname already exists" }] });
            }

            user = new User ({
                userid, 
                loginid, 
                password, 
                nickname, 
                userlevel
            });

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();

            res.send("Success");
            console.log("success in console");

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server Error");
        }
    }
);

router.post("/login", async (req, res) => {
    try {
        let user = await User.findOne({ loginid:req.body.loginid });

        if(!user) {
            return res
                .status(400)
                .json({ errors: [{ msg: "Id doesn't exists" }] });
        }
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword) {
            return res
                .status(400)
                .json({ errors: [{ msg: "Password is not same" }] });
        }
        res
            .status(200)
            .json({
                loginSuccess: true, userid: user.userid
            });


    }catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

router.get("/logout", async (req, res) => {
    try {
        let user = await User.findOne({ userid:req.body.userid });
        if(!user) {
            return res
                .status(400)
                .json({ errors: [{ msg: "User doesn't exists" }] });
        }
        return res.status(200).send({
            success: true
        });
    }catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;