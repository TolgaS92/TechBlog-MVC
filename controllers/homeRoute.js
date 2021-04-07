const router = require('express').Router();

const { Post, User } = require('../models');

const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
            attributes: { exclude: ['password'] },
        });
        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});


router.get('/posts/:id', withAuth, async (req,res) => {
    try {
        const postData = await Post.findByPk(req.params.id);
        const post = postData.get({ plain:true });
        res.render('post', { post, logged_in: req.session.logged_in });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});


router.get('/login', (req, res) => {
    if(req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    if(req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});


router.get('/dashboard', withAuth, async (req,res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Post }],
        });
        const user = userData.get({ plain: true });
        res.render('dashboard', {
            ...user,
            logged_in: true
        });
    } catch (error) {
        res.status(500).json(error);
    }
});


module.exports = router;