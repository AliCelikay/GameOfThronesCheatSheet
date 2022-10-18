const router = require('express').Router();
const userRoutes = require('./userRoutes');
const bookRoutes = require('./bookRoutes');
const characterRoutes = require('./characterRoutes');
const codRoutes = require('./codRoutes');
const houseRoutes = require('./houseRoutes')

router.use('/users', userRoutes);
router.use('/books', bookRoutes);
router.use('/characters', characterRoutes);
router.use('/cod', codRoutes);
router.use('/houses', houseRoutes);

module.exports = router;
