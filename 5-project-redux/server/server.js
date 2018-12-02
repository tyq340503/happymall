const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const keys = require('./config/keys');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const config = require('./config/config').get(process.env.NODE_ENV);
const stripe = require('stripe')(keys.stripeSecretKey);
const app = express();

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.ClientID,
            clientSecret: keys.ClientSecret,
            callbackURL: '/auth/google/callback',
            proxy: true
        },
        async (accessToken, refreshToken, profile, done) => {
            const existingUser = await User.findOne({ googleId: profile.id });

            if (existingUser) {
                return done(null, existingUser);
            }

            const user = await new User({ googleId: profile.id }).save();
            done(null, user);
        }
    )
);

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGOLAB_IVORY_URI || config.DATABASE, { useMongoClient: true }, err => {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to the database');
    }
})

const { User } = require('./models/user');
const { Book } = require('./models/book');
const { auth } = require('./middleware/auth')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());

// GET //
app.get('/api/auth', auth, (req, res) => {
    res.json({
        isAuth: true,
        id: req.user._id,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname
    })
});


app.get('/api/logout', auth, (req, res) => {
    req.user.deleteToken(req.token, (err, user) => {
        if (err) return res.status(400).send(err);
        res.sendStatus(200)
    })
})


app.get('/api/getBook', (req, res) => {
    let id = req.query.id;

    Book.findById(id, (err, doc) => {
        if (err) return res.status(400).send(err);
        res.send(doc);
    })
})

app.get('/api/books', (req, res) => {
    // locahost:3001/api/books?skip=3&limit=2&order=asc
    if (Object.keys(req.query) != 0) {

        let skip = parseInt(req.query.skip);
        let limit = parseInt(req.query.limit);
        let order = req.query.order;

        // ORDER = asc || desc
        Book.find().skip(skip).sort({ _id: order }).limit(limit).exec((err, doc) => {
            if (err) return res.status(400).send(err);
            res.send(doc);
        })
    } else {
        Book.find().exec((err, doc) => {
            if (err) return res.status(400).send(err);
            res.send(doc);
        })
    }
})

app.get('/api/getReviewer', (req, res) => {
    let id = req.query.id;

    User.findById(id, (err, doc) => {
        if (err) return res.status(400).send(err);
        res.json({
            name: doc.name,
            lastname: doc.lastname
        })
    })
})

app.get('/api/users', (req, res) => {
    User.find({}, (err, users) => {
        if (err) return res.status(400).send(err);
        res.status(200).send(users)
    })
})

app.get('/api/user_posts', (req, res) => {
    Book.find({ ownerId: req.query.user }).exec((err, docs) => {
        if (err) return res.status(400).send(err);
        res.send(docs)
    })
})


// POST //
app.post('/api/book', (req, res) => {
    const book = new Book(req.body)

    book.save((err, doc) => {
        if (err) return res.status(400).send(err);
        res.status(200).json({
            post: true,
            bookId: doc._id
        })
    })
})

app.post('/api/register', (req, res) => {
    const user = new User(req.body);

    user.save((err, doc) => {
        if (err) return res.json({ success: false, err: err });
        res.status(200).json({
            success: true,
            user: doc
        })
    })
})

app.post('/api/login', (req, res) => {
    User.findOne({ 'email': req.body.email }, (err, user) => {
        if (!user) return res.json({ isAuth: false, message: 'Auth failed, email not found' })

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch) return res.json({
                isAuth: false,
                message: 'Wrong password'
            });

            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie('auth', user.token).json({
                    isAuth: true,
                    id: user._id,
                    email: user.email
                })
            })
        })
    })
})



// UPDATE //
app.post('/api/book_update', (req, res) => {
    Book.findByIdAndUpdate(req.body._id, req.body, { new: true }, (err, doc) => {
        if (err) return res.status(400).send(err);
        res.json({
            success: true,
            doc
        })
    })
})

// DELETE //

app.delete('/api/delete_book', (req, res) => {
    let id = req.query.id;

    Book.findByIdAndRemove(id, (err, doc) => {
        if (err) return res.status(400).send(err);
        res.json(true)
    })
})

app.post('/api/stripe', auth, async (req, res) => {
    const charge = await stripe.charges.create({
        amount: 500,
        currency: 'usd',
        description: '$5 for 5 credits',
        source: req.body.id
    });

    req.user.credits += 5;
    const user = await req.user.save();

    res.send(user);
});


const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`SERVER RUNNNING`)
})