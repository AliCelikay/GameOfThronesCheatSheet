const router = require('express').Router();
const { Character, User, Houses } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', (req,res) =>{
  
  res.render('landingPage', {
    logged_in: req.session.logged_in
  })
})

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/search');
    return;
  }

  res.render('loginPage');
});

router.get('/search', async (req,res)=>{
let houseData = await Houses.findAll();
const houses = houseData.map((house) => house.get({ plain: true}));
  res.render('searchByResults', {houses})
})

//rendering saved characters from database
router.get('/saved', withAuth, async (req,res)=>{
  console.log('saved route has been hit')
  const usersSaved = await Character.findAll({where: {
    user_id: req.session.user_id,
  }});
  const savedCharacters = await usersSaved.map(char=>char.get({plain: true}));
  console.log(savedCharacters);

  res.render('savedFeatures', {
    logged_in: true,
    savedCharacters
  })
})

router.get('/charecter/:id', async (req, res) => {
  try {
    const savedCharacterData = await SavedCharacters.findByPk(req.params.id, {
      include: [
        {
          // Change
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const character = savedCharacterData.get({ plain: true });

    res.render('searchByResults', {
      ...character,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
