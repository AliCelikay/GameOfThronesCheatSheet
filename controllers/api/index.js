const router = require('express').Router();
const userRoutes = require('./userRoutes');
const projectRoutes = require('./projectRoutes');
const bookRoutes = require('./bookRoutes')

router.use('/users', userRoutes);
router.use('/projects', projectRoutes);
router.use('/books', bookRoutes)

module.exports = router;
