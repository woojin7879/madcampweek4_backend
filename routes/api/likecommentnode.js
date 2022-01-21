const express = require("express");
const Likecommentnode = require("../../models/likecommentnode");
const Commentnode = require("../../models/commentnode");
const router = express.Router();

router.post(
    "/likecommentnode",
    async (req, res) => {

        const {likecommentnodeid, commentnodefrom, writer} = req.body;

        try {
            let likecommentnode = await Likecommentnode.findOne({ commentnodefrom, writer });
            let commentnode = await Commentnode.findOne({ commentnodeid:commentnodefrom });
            if (likecommentnode) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "Already did like" }] });
            }
            if (!commentnode){
                return res
                    .status(400)
                    .json({ errors: [{ msg: "No commentnode" }] });
            }
            likecommentnode = new Likecommentnode ({
                likecommentnodeid, 
                commentnodefrom, 
                writer
            });

            //update commentnode like
            var like = commentnode.likes;
            like ++;
            commentnode.likes = like;

            await likecommentnode.save();
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