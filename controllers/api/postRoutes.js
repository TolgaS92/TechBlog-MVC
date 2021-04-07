const router = require('express').Router();
const { Post } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).render('homepage', {
            newPost,
            logged_in: req.session.logged_in,
            user_id: req.session.user_id
        });
        res.redirect('/dashboard');
    } catch (error) {
        res.status(400).json(error);
    }
});

module.exports = router;