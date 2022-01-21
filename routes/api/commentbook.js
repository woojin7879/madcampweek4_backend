const express = require("express");
const Commentbook = require("../../models/commentbook");
const router = express.Router();

router.post(
    "/commentbook",
    async (req, res) => {

        const {commentbookid, writer, bookfrom, content, likes} = req.body;

        try {
            let commentbook = await Commentbook.findOne({ commentbookid });

            if (commentbook) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "User already exists" }] });
            }

            commentbook = new Commentbook ({
                commentbookid, 
                writer, 
                bookfrom, 
                content, 
                likes
            });

            await commentbook.save();

            res.send("Success");
            console.log("success in console");

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server Error");
        }
    }
);

router.post(
    "/getcommentbook",
    async (req, res) => {

        try {
            let getcommentbook = await Commentbook.find({ bookfrom:req.body.bookfrom });

            if (getcommentbook.length==0) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "No book comment exists" }] });
            }

            res
            .status(200)
            .json({
                getcommentbook
            });

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server Error");
        }
    }
);

module.exports = router;