const router = require('express').Router();
const { Character, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', (req,res) =>{
  
  res.render('landingPage', {
    logged_in: req.session.logged_in
  })
})

// Use withAuth middleware to prevent access to route
// router.get('/', withAuth, async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const userData = await User.findByPk(req.session.user_id, {
//       attributes: { exclude: ['password'] },
//       // deleted inclusion bit for Project model
//     });

//     const user = userData.get({ plain: true });

//     res.render('searchByResults', {
//       ...user,
//       logged_in: true
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/search');
    return;
  }

  res.render('loginPage');
});

router.get('/search', (req,res)=>{

  res.render('searchByResults', {
    logged_in: req.session.logged_in
  })
})

router.get('/saved', withAuth, async (req,res)=>{
  // get all the saved data that we want to display for this user
  //we already passed auth so we know who the user is
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



//GET House by id 
    // Name, Title, House Saying

// Get character by id
    // render character, namee, house, culture, aliases, allegiances, & titles
    // Additional information shown in a model: Father, Mother Spouse

// Get Book by ID
    // render the Name, ISDN, Author, # of pages, release date
    // & the POV characters and thir details
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

// GET & render saved character

// GET & render saved House


module.exports = router;
