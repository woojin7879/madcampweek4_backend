const express = require("express");
const Likenode = require("../../models/likenode");
const Node = require("../../models/node");
const router = express.Router();

router.post(
    "/likenode",
    async (req, res) => {

        const {likenodeid, nodefrom, writer} = req.body;

        try {
            let likenode = await Likenode.findOne({ nodefrom, writer });
            let node = await Node.findOne({ nodeid:nodefrom });

            if (likenode) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "User already exists" }] });
            }
            if(!node) {
                return res
                .status(400)
                .json({ errors: [{ msg: "No node" }] });
            }

            likenode = new Likenode ({
                likenodeid, 
                nodefrom, 
                writer
            });

            //update node like
            var like = node.likes;
            like ++;
            node.likes = like;

            await likenode.save();

            await node.save();

            res.send("Success");
            console.log("success in console");

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server Error");
        }
    }
);

module.exports = router;