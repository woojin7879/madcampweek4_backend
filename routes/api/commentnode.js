const express = require("express");
const Commentnode = require("../../models/commentnode");
const router = express.Router();

router.post(
    "/commentnode",
    async (req, res) => {

        const {commentnodeid, writer, nodefrom, content, likes} = req.body;

        try {
            let commentnode = await Commentnode.findOne({ writer, nodefrom });

            if (commentnode) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "Comment already exists" }] });
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

router.post(
    "/getcommentnode",
    async (req, res) => {

        try {
            let getcommentnode = await Commentnode.find({ nodefrom:req.body.nodefrom });

            if (getcommentnode.length==0) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "No node comment exists" }] });
            }

            res
            .status(200)
            .json({
                getcommentnode
            });

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server Error");
        }
    }
);

module.exports = router;