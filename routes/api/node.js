const express = require("express");
const Node = require("../../models/node");
const router = express.Router();

router.post(
    "/node",
    async (req, res) => {

        const {nodeid, bookfrom, writer, postid, content, view, likes} = req.body;

        try {
            let node = await Node.findOne({ nodeid });

            if (node) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "User already exists" }] });
            }

            node = new Node ({
                nodeid, 
                bookfrom,
                writer, 
                postid, 
                content, 
                view,
                likes
            });

            await node.save();

            res.send("Success");
            console.log("success in console");

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server Error");
        }
    }
);

//특정 node 좋아요 개수 반환
router.post(
    "/getlikenode",
    async (req, res) => {
        try{
            let getlikenode = await Node.findOne({ nodeid:req.body.nodeid });

            if(!getlikenode){
                return res
                    .status(400)
                    .json({ errors: [{ msg: "Node doesn't exists" }] });
            }

            res
            .status(200)
            .json({
                likes: getlikenode.likes
            });

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server Error");
        }
    }
);

router.post(
    "/getnextnode",
    async (req, res) => {
        try{
            let getnextnode = await Node.find({ bookfrom:req.body.bookfrom ,postid:req.body.postid });
            console.log(getnextnode.length);

            if(getnextnode.length==0){
                return res
                    .status(400)
                    .json({ errors: [{ msg: "Next node doesn't exists" }] });
            }

            res
            .status(200)
            .json({
                getnextnode
            });

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server Error");
        }
    }
);

module.exports = router;