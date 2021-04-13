const router = require('express').Router();

const { Post, User, Comment } = require('../models');

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
            logged_in: req.session.logged_in,
            // logged_name comes trough sign in /with session so we can use user name with handlebars
            logged_name: req.session.logged_name
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});


router.get('/posts/:id', withAuth, async (req,res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
                {
                    model: Comment
                },
            ],
        });
        const post = postData.get({ plain:true });
        res.render('single-post', {
            ...post,
            user_id: req.session.user_id,
            logged_in: req.session.logged_in,
            logged_name: req.session.logged_name
        });
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


module.exports = router;