const express = require('express');
const mongoose = require('mongoose');
const ContactUs = require('./models/contactus');
const config = require('./config/database');

const app = express();

const uri = `mongodb+srv://${config.mongo_username}:${config.mongo_password}@cluster0-pzufn.gcp.mongodb.net/${config.mongo_database}?retryWrites=true&w=majority`;

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
        .then( () => {})
        .catch( err => {console.log('Connection error', err);})

app.listen(3000);

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) =>{ 
    ContactUs.find().sort({"createdAt":"-1"})
        .then( (data) => {
            res.render('index', { title: 'Home', contactForms: data });
        })
        .catch( (err) => {
            console.log(err);
            res.status(404).render('404', {title: '404 page not found'});
        })
})

app.get('/about', (req, res) => {
    res.render('about-us', { title: 'About Us' });
})

app.get('/contact', (req, res) => {
    res.render('contact-us', { title: 'Contact Us' });
})

app.post('/contact', (req, res) => {
    const contactForm = new ContactUs(req.body);
    contactForm.save().then( () => {
        res.redirect("/");
    }).catch(err => {
        res.status(404).render('404', {title: '404 page not found'});
    });
})

app.get('/contact/:id', (req, res) => {

    const id= req.params.id;
    ContactUs.findById(id)
    .then( (data) => {
        res.render('details', { title: 'Details', contactForm: data });
    }).catch( err => {
        console.log(err);
        res.status(404).render('404', {title: '404 page not found'});
    })
})