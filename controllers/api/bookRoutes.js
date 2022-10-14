const router = require('express').Router();
const axios = require('axios')
const whateverDB = require('model')


router.get('/', (req, res) => {
    axios.get("https://www.anapioficeandfire.com/api/books")
        .then(response => {
            // now we have the data so we jus tog and bring it to the model
           
            console.log(response.data);
            res.json(response.data)
        })
})

module.exports = router;
