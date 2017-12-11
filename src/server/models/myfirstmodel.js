// server/models/book.js
// grab the mongoose module
var mongoose = require('mongoose');

// define our book model
// module.exports allows us to pass this to other files when it is called
var eBookSchema = new mongoose.Schema({
    formats: {
        pdf: {
            url: String
        },
        epub: {
            url: String
        },
        text: {
            url: String
        }
    },
    preview_url: String,
    read_url: String,
    availability: String
})

var bookPropertySchema = new mongoose.Schema({
    url: String,
    name: String
});

var excerptSchema = new mongoose.Schema({
    comment: String,
    text: String
})

var bookIdentifiersSchema = new mongoose.Schema({
    openLibrary: [String],
    oclc: [String],
    lccn: [String],
    goodreads: [String],
    isbn_10: [String],
    isbn_13: [String],
    project_gutenberg: [String],
    librarything: [String],
    google: [String],
    amazon: [String]
});

var bookCoverSchema = new mongoose.Schema({
    small: String,
    medium: String,
    large: String
})

var bookPublishPropertySchema = new mongoose.Schema({
    name: String
})

var linkSchema = new mongoose.Schema({
    url: String,
    title: String
})

var classificationSchema = new mongoose.Schema({
    dewey_decimal_class: [String],
    lc_classifications: [String]
})

var bookSchema = new mongoose.Schema({
    publishers: [bookPublishPropertySchema],
    pagination: String,
    identifiers: {
        openLibrary: [String],
        oclc: [String],
        lccn: [String],
        goodreads: [String],
        isbn_10: [String],
        isbn_13: [String],
        project_gutenberg: [String],
        librarything: [String],
        google: [String],
        amazon: [String]
    },
    title: String,
    url: String,
    number_of_pages: Number,
    cover: {
        small: String,
        medium: String,
        large: String
    },
    publish_date: String,
    key: String,
    by_statement: String,
    publish_places: [bookPublishPropertySchema],
    ebooks: [eBookSchema],
    authors: [bookPropertySchema],
    excerpts: [excerptSchema],
    subject_people: [bookPropertySchema],
    subjects: [bookPropertySchema],
    subject_places: [bookPropertySchema],
    subject_times: [bookPropertySchema],
    links: [linkSchema],
    classifications: {
        dewey_decimal_class: [String],
        lc_classifications: [String]
    },
    weight: String
})

module.exports = mongoose.model('MyFirstModel', bookSchema);