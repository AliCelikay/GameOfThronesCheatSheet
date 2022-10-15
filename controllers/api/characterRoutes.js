const router = require('express').Router();
const axios = require('axios')

//already at /api/characters

router.get('/:character', (req, res) => {
    let apiUrl = `https://www.anapioficeandfire.com/api/characters/?name=${req.params.character}`

    axios.get(apiUrl)
    .then(response => {
       //res.json(response.data)
       res.json(response.data)
       //res.json(response.data.isbn)
       //res.json(`The book you want data for is ${req.params.bookTitle}`)
    });
})


module.exports = router;
