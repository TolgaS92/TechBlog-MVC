const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req,res) => {
    try {
        const userData = await User.create({
            name: req.body.name,
            password: req.body.password,
        });

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            //username saved as logged_name whe  signup to the page
            req.session.logged_name = userData.name;
            res.status(200).json(userData);
        })
    } catch (error) {
        res.status(400).json(error);
    }
});

router.post('/login', async (req,res) => {
    try {
        const userData = await User.findOne({ where: { name: req.body.name } });
        if (!userData) {
            res.status(400).json({ message: 'Incorrect name or password, please try again' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect name or password, please try again' });
            return;
        }
        
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            // with login logged_name saved to the session that we can use with handlebars
            req.session.logged_name = userData.name
            res.json({ user: userData, message: 'You are now logged in' });
        });
    } catch (error) {
        res.status(400).json(error);
    }
});


router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;