// const router = require('express').Router();
// const axios = require('axios')

// // /api/houses
// router.get('/', (req, res) => {
//     axios.get("https://www.anapioficeandfire.com/api/books?page=1&pageSize=12")
//         .then(response => {
//             // now we have the data so we jus tog and bring it to the model
//             console.log(response.data);
//             res.json(response.data)
//         })
// })

// router.get('/:houseName', (req, res) => {
//     let apiUrl = `https://www.anapioficeandfire.com/api/books/?name=${req.params.bookTitle}`
//     axios.get(apiUrl)
//     .then(response => {
//        //res.json(response.data)
//        res.json(response.data)
//        //res.json(response.data.isbn)
//        //res.json(`The book you want data for is ${req.params.bookTitle}`)
//     });
// })

// module.exports = router;