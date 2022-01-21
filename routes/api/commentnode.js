const express = require("express");
const Commentnode = require("../../models/commentnode");
const router = express.Router();

router.post(
    "/commentnode",
    async (req, res) => {

        const {commentnodeid, writer, nodefrom, content, likes} = req.body;

        try {
            let commentnode = await Commentnode.findOne({ commentnodeid });

            if (commentnode) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "User already exists" }] });
            }

            commentnode = new Commentnode ({
                commentnodeid, 
                writer, 
                nodefrom, 
                content,
                likes
            });

            await commentnode.save();

            res.send("Success");
            console.log("success in console");

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server Error");
        }
    }
);

module.exports = router;