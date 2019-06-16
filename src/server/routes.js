 // server/routes.js

 // grab the book model we just created
 var MyModel = require('./models/myfirstmodel');
 var http = require('http');

 module.exports = function (app) {

     // server routes ===========================================================
     // handle things like api calls
     // authentication routes

     // on client page refresh, fetch updated books from OL API, cache them in Mongo DB for searching.
     app.get('/api/books', function (req, apiRes) {

         //Query the Open Library API for a list of books
         var options = {
             host: 'openlibrary.org',
             path: '/api/books?bibkeys=OLID:OL22895148M,OLID:OL6990157M,OLID:OL7101974M,OLID:OL6732939M,OLID:OL7193048M,OLID:OL24347578M,OLID:OL24364628M,OLID:OL24180216M,OLID:OL24948637M,OLID:OL1631378M,OLID:OL979600M,OLID:OL33674M,OLID:OL7950349M,OLID:OL349749M,OLID:OL30460M,OLID:OL24347578M&amp;jscmd=data&amp;format=json'
         }

         var req = http.get(options, function (res) {
             // Buffer the body entirely for processing as a whole.
             var bodyChunks = [];
             res.on('data', function (chunk) {
                 bodyChunks.push(chunk);
             }).on('end', function () {
                 var books = Buffer.concat(bodyChunks);
                 var booksToStore = JSON.parse(books);

                 //return the books to the user
                 //apiRes.json(booksToStore);

                 //Update the store of books in the collection.
                 //iterate over the API results and upsert those in the MongoDB
                 var booksToReturn = [];
                 for (var rawBookKey in booksToStore) {
                     if (booksToStore.hasOwnProperty(rawBookKey)) {
                         //Parse object into Book document
                         var currentParsedBook = booksToStore[rawBookKey]
                         var currentBook = new Book(currentParsedBook);
                         booksToReturn.push(currentParsedBook);

                         Book.update({
                                 key: currentBook.key
                             }, {
                                 $setOnInsert: currentBook
                             }, {
                                 upsert: true
                             },
                             function (err, numAffected) {
                                 if (err) {
                                     console.log('An error occurred:' + JSON.stringify(err));
                                 } else {
                                     console.log('1 record updated');
                                 }
                             }
                         );
                     }
                 }
                 apiRes.json(booksToReturn);
             })
         });

         req.on('error', function (e) {
             res.send(e);
         })
     });

     app.get('/api/olid/books/:book_id', function (req, res) {

         //get book id
         var book_id = '/books/' + req.params.book_id;

         console.log('QUERYING FOR OLID: ' + book_id);

         // use mongoose to get all nerds in the database
         Book.findOne({
             key: book_id
         }, function (err, book) {

             // if there is an error retrieving, send the error.
             // nothing after res.send(err) will execute
             if (err)
                 res.send(err);

             res.json(book); // return all nerds in JSON format
         });
     });

     app.get('/api/title/books/:title', function (req, res) {

         //get book id
         var title = req.params.title;

         console.log('QUERYING FOR TITLE: ' + title);

         // use mongoose to get all nerds in the database
         Book.findOne({
             title: title
         }, function (err, book) {

             // if there is an error retrieving, send the error.
             // nothing after res.send(err) will execute
             if (err)
                 res.send(err);

             res.json(book); // return all nerds in JSON format
         });
     });

     // route to handle creating goes here (app.post)
     // route to handle delete goes here (app.delete)

     // frontend routes =========================================================
     // route to handle all angular requests
    //  app.get('/js/controllers/MainCtrl.js', function(req, res) {
    //     res.sendfile('./public/js/controllers/MainCtrl.js');
    //  })
 };
