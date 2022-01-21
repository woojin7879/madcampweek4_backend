const express = require("express");
const Book = require("../../models/book");
const router = express.Router();

router.post(
    "/book",
    async (req, res) => {

        const {bookid, bookname, writer, category, view, likes} = req.body;

        try {
            let book = await Book.findOne({ bookid });

            if (book) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "User already exists" }] });
            }

            book = new Book ({
                bookid, 
                bookname, 
                writer, 
                category, 
                view,
                likes
            });

            await book.save();

            res.send("Success");
            console.log("success in console");

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server Error");
        }
    }
);

//특정 book 좋아요 개수 반환
router.post(
    "/getlikebook",
    async (req, res) => {
        try{
            let getlikebook = await Book.findOne({ bookid:req.body.bookid });
            
            if(!getlikebook){
                return res
                    .status(400)
                    .json({ errors: [{ msg: "Book doesn't exists" }] });
            }

            res
            .status(200)
            .json({
                likes: getlikebook.likes
            });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server Error");
        }
    }
);

module.exports = router;