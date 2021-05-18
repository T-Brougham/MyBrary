const express = require('express');
const author = require('../modals/author');
const router = express.Router();
const Author = require('../modals/author') //Accessing the scehma for the author from modals/author


//All authors route
router.get('/', async (req, res) => {
    let searchOptions = {}
    //req.query because a get request sends information through a 
    //query string and a post request gets from a body
    if(req.query.name != null && req.query.name !== ''){
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try{
        const authors = await Author.find(searchOptions)
        res.render('authors/index', { 
            authors: authors,
            searchOptions: req.query
        });

    } catch {
        res.redirect('/');
    }
});

//New Author Route (Displaying the form)
router.get('/new', (req, res) => {
    //Using the author schema and send to the ejs file
    res.render('authors/new', { author: new Author() });
})

//Create author route
router.post('/', async (req,res) => {
    const author = new Author ({
        name: req.body.name
    })

    try{
        const newAuthor = await author.save()
        //res.redirect(`authors/${newAuthor.id}`)
        res.redirect(`authors`);
    } catch {
        //if error, render the new page again.
        res.render('authors/new', {
            author: author,
            errorMessage: 'Error creating Author'
        })
    }
})

module.exports = router;