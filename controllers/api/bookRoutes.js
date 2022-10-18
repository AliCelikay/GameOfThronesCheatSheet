const router = require('express').Router();
const axios = require('axios')

router.get('/', (req, res) => {
    axios.get("https://www.anapioficeandfire.com/api/books?page=1&pageSize=12")
        .then(response => {
            console.log(response.data);
            res.json(response.data)
        })
})

router.get('/:bookTitle', (req, res) => {
    let apiUrl = `https://www.anapioficeandfire.com/api/books/?name=${req.params.bookTitle}`
    axios.get(apiUrl)
    .then(response => {
       res.json(response.data);
    });
})

module.exports = router;
