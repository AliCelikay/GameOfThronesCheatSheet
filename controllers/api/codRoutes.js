const router = require('express').Router();
const axios = require('axios')

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  
// api/cod
router.get('/', (req, res) => {
        axios.get(`https://thronesapi.com/api/v2/Characters/${getRandomInt(52)}`)
        .then(response => {
            console.log(response.data);
            res.json(response.data)
        })
});
module.exports = router
