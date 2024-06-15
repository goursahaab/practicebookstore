const express = require('express');
const router = express.Router();
const path=require('path');
const fs =require('fs');

const bookModel = require('../models/storedb');
const { checkPrice } = require("../utils/middlewares");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/library', async function(req, res, next) {
try {
  const books= await bookModel.find();
  res.render("library",{books:books})
} catch (err) {
 console.log(err)
 res.send(err.message)
  
}
});



router.get('/about', function(req, res, next) {
  res.render('about');
});


router.get('/create-book', function(req, res, next) {
  res.render('createbook');
});


// router.post(
//   "/create-book",
//   async function (req, res, next) {
//       try {
//           const newBook = await new bookModel({
//               ...req.body,
//           });

//           await newBook.save();
//           console.log(newBook)
//           res.redirect("/library");
//       } catch (error) {
//           console.log(error);
//           res.send(error);
//       }
//   }
// );


// router.post("/create-book", async function (req, res, next) {
//   try {
//     console.log(req.body);
//       const { name, author, isbn, price, description } = req.body;
//       const newBook = new bookModel({
//         poster, 
//           name,
//           author,
//           isbn,
//           price,
//           description
//       });

//       await newBook.save();
//       console.log(newBook)
//       res.redirect("/library");
//   } catch (error) {
//       console.log(error);
//       res.send(error);
//   }
// });


router.post("/create-book", async function (req, res, next) {
  try {
    console.log(req.body);
    const book= new bookModel(req.body)
    
    await book.save()
    console.log(book)
    res.redirect('library')

  } catch (error) {
      console.log(error);
      res.send(error);
  }
});


router.get("/details/:id", async function (req, res, next) {
  try {
      const book = await bookModel.findById(req.params.id);
      res.render("detailsbook", { book: book });
  } catch (error) {
      console.log(error);
      res.send(error);
  }
});


router.post("/update-book", async function (req, res, next) {
      try {
          const updatedBook = { ...req.body };
        
          await bookModel.findByIdAndUpdate(req.params.id, updatedBook);
          res.redirect(`/details/${req.params.id}`);
      } catch (error) {
          console.log(error);
          res.send(error);
      }
  }
);




router.get("/delete-book/:id", async function (req, res, next) {
  try {
      const book = await bookModel.findByIdAndDelete(req.params.id);

      // fs.unlinkSync(path.join(__dirname, `../public/images/${book.poster}`));

      res.redirect("/library");
  } catch (error) {
      console.log(error);
      res.send(error);
  }
});

module.exports = router;
