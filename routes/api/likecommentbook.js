const express = require("express");
const Likecommentbook = require("../../models/likecommentbook");
const Commentbook = require("../../models/commentbook");
const router = express.Router();

router.post(
    "/likecommentbook",
    async (req, res) => {

        const {likecommentbookid, commentbookfrom, writer} = req.body;

        try {
            let likecommentbook = await Likecommentbook.findOne({ commentbookfrom, writer });
            let commentbook = await Commentbook.findOne({ commentbookid:commentbookfrom });
            if (likecommentbook) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "Already did like" }] });
            }
            if (!commentbook){
                return res
                    .status(400)
                    .json({ errors: [{ msg: "No commentbook" }] });
            }

            likecommentbook = new Likecommentbook ({
                likecommentbookid, 
                commentbookfrom, 
                writer
            });

            //update commentbook like
            var like = commentbook.likes;
            like ++;
            commentbook.likes = like;

            await likecommentbook.save();
            await commentbook.save();

            res.send("Success");
            console.log("success in console");

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server Error");
        }
    }
);

module.exports = router;