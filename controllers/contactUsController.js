const ContactUs = require('../models/contactus');

const contact_us_get = (req, res) => {
    res.render('contact-us', { title: 'Contact Us' });
}

const contact_us_post = (req, res) => {
    const contactForm = new ContactUs(req.body);
    contactForm.save().then( () => {
        res.redirect("/");
    }).catch(err => {
        res.status(404).render('404', {title: '404 page not found'});
    });
}

const contact_us_get_by_id = (req, res) => {

    const id= req.params.id;
    ContactUs.findById(id)
    .then( (data) => {
        res.render('details', { title: 'Details', contactForm: data });
    }).catch( err => {
        console.log(err);
        res.status(404).render('404', {title: '404 page not found'});
    })
}

module.exports = {
    contact_us_get,
    contact_us_post,
    contact_us_get_by_id
}