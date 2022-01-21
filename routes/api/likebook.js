const express = require("express");
const Likebook = require("../../models/likebook");
const Book = require("../../models/book");
const router = express.Router();

router.post(
    "/likebook",
    async (req, res) => {

        const {likebookid, bookfrom, writer} = req.body;

        try {
            let likebook = await Likebook.findOne({ bookfrom, writer });
            let book = await Book.findOne({ bookid:req.body.bookfrom})

            if (likebook) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "Already did like" }] });
            }
            if (!book) {
                return res
                .status(400)
                .json({ errors: [{ msg: "No book" }] });
            }

            likebook = new Likebook ({
                likebookid, 
                bookfrom, 
                writer
            });
            //update book like
            var like = book.likes;
            like ++;
            book.likes = like;

            await likebook.save();

            await book.save();

            res.send("Success");
            console.log("success in console");

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server Error");
        }
    }
);



module.exports = router;