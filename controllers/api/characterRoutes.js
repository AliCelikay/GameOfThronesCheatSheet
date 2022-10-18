const router = require('express').Router();
const axios = require('axios');
const Character = require('../../models/SavedCharacters')

// /api/characters
router.get('/:character', (req, res) => {
    let apiUrl = `https://www.anapioficeandfire.com/api/characters/?name=${req.params.character}`
    axios.get(apiUrl)
    .then(response => {
       res.json(response.data);
    });
})

router.get('/', async(req,res)=>{
  const savedCharacterData = await Character.findAll();

  const savedCharacters = savedCharacterData.map(char=>char.get({plain:true}));

  res.json(savedCharacters)
})

// route to save a Character
router.post('/', async (req, res) => {
  if (!req.session.logged_in) {
    res.status(400).json("Must be logged in to add character")
    // res.json("Must be logged in to add character")
    // res.redirect('/login');
  }
  console.log('new character attemting to add to db') //see this on backend terminal
  console.log('req.body', req.body)

    try {
      const characterData = await Character.create({
        name: req.body.name,
        culture: req.body.culture,
        aliases: req.body.aliases,
        title: req.body.title,
        house: req.body.house,
        user_id: req.session.user_id
      });
      res.status(200).json(characterData);
    } catch (err) {
      res.status(400).json(err);
    }
});

module.exports = router;
