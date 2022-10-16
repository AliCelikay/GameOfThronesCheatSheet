const router = require('express').Router();
const axios = require('axios')

// /api/characters
router.get('/:character', (req, res) => {
    let apiUrl = `https://www.anapioficeandfire.com/api/characters/?name=${req.params.character}`
    axios.get(apiUrl)
    .then(response => {
       res.json(response.data);
    });
})

// router.get('/:aliase', (req, res) => {
//     let apiUrl = `https://www.anapioficeandfire.com/api/characters/?aliases=${req.params.aliase}`
//     axios.get(apiUrl)
//     .then(response => {
//         console.log(response.data);
//        res.json(response.data);
//     });
// })


module.exports = router;
