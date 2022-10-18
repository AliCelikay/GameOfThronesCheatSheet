const router = require('express').Router();
const { Houses } = require('../../models');

// /api/houses
router.get('/:id', (req, res) => {
    Houses.findByPk(req.params.id)
        .then(response => {
            console.log(response);
            res.json(response)
        })
})


module.exports = router;
