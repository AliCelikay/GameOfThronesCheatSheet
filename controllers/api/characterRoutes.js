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

router.put('/:id', async (req, res) => {
  // Where is this action method sending the data from the body of the fetch request? Why?
  // It is sending the data to the Model so that one dish can be updated with new data in the database.
  try {
    const character = await Character.update(
      {
        name: req.body.name,
        culture: req.body.culture,
        aliases: req.body.aliases,
        title: req.body.title,
        house: req.body.house,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    // If the database is updated successfully, what happens to the updated data below?
    // The updated data (character) is then sent back to handler that dispatched the fetch request.
    res.status(200).json(character);
  } catch (err) {
    res.status(500).json(err);
  }
});




module.exports = router;
