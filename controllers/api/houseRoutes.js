const router = require('express').Router();
const { Houses, savedHouses } = require('../../models');

// /api/houses

router.get('/:id', (req, res) => {
    Houses.findByPk(req.params.id)
        .then(response => {
            // now we have the data so we jus tog and bring it to the model
            console.log(response);
            res.json(response)
        })
})

router.get('/', async (req, res) => {
    const savedHouseData = await savedHouses.findAll();

    const savedHouses = savedHouseData.map(house => house.get({ plain: true }));

    res.json(savedHouses)
})



// route to save a House
router.post('/', async (req, res) => {
    if (!req.session.logged_in) {
        res.status(400).json("Must be logged in to add house")
        // res.json("Must be logged in to add house")
        // res.redirect('/login');
    }
    console.log('new house attemting to add to db') //see this on backend terminal
    console.log('req.body', req.body)

    try {
        const houseData = await savedHouses.create({
            name: req.body.name,
            region: req.body.region,
            coatOfArms: req.body.coatOfArms,
            words: req.body.words,
            titles: req.body.titles,
            seats: req.body.seats,
            user_id: req.session.user_id
        });
        res.status(200).json(houseData);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;
