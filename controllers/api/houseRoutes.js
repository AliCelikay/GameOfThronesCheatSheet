const router = require('express').Router();
const { Houses } = require('../../models');


router.get('/:id', (req, res) => {
Houses.findByPk(req.params.id)
        .then(response => {
            // now we have the data so we jus tog and bring it to the model
            console.log(response);
            res.json(response)
        })
})


module.exports = router;