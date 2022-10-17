const router = require('express').Router();
const { SavedCharacters } = require('../../models');
const withAuth = require('../../utils/auth');
const axios = require('axios');

router.get('/', async (req, res) => {
    try {
      // Get all projects and JOIN with user data
      const savedCharData = await SavedCharacters.findAll({
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
      });
      
      // Serialize data so the template can read it
      const savedChars = savedCharData.map((savedChar) => savedChar.get({ plain: true }));
  
      // Pass serialized data and session flag into template
      res.render('savedFeatures', { 
        savedChars, 
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

// POST a new note
router.post('/', withAuth, async (req, res) => {
    try
    {
        const commentData = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.json(commentData);
    } catch (err)
    {
        res.status(500).json(err);
    }
});

// DELETE a a note
router.delete('/:id', async (req, res) => {
    try
    {
        const commentData = await Comment.destroy({
            where: { id: req.params.id }
        });
        if (!commentData)
        {
            res.status(404).json({ message: 'No  comments with this id!' });
            return;
        }
        res.status(200).json(commentData);
    } catch (err)
    {
        res.status(500).json(err);
    }
});
