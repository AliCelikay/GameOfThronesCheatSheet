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

// route to save a Character
router.post('/', async (req, res) => {
    try {
      const characterData = await Character.create({
        name: req.body.name,
        culture: req.body.culture,
        aliases: req.body.aliases,
        title: req.body.title,
        house: req.body.house,
      });
      res.status(200).json(characterData);
    } catch (err) {
      res.status(400).json(err);
    }
  });


module.exports = router;
