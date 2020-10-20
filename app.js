// Initialize express
const express = require('express')
const app = express()
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const models = require('./db/models');
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

app.engine('handlebars', exphbs({ defaultLayout: 'main', handlebars: allowInsecurePrototypeAccess(Handlebars) }));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true }));

// // OUR MOCK ARRAY OF PROJECTS
// var donations = [
//   { title: "I am your first donation", desc: "A great donation that is super fun to look at and good", imgUrl: "https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA4OC85MTEvb3JpZ2luYWwvZ29sZGVuLXJldHJpZXZlci1wdXBweS5qcGVn" },
//   { title: "I am your second donation", desc: "A great donation that is super fun to look at and good", imgUrl: "https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA4OC85MTEvb3JpZ2luYWwvZ29sZGVuLXJldHJpZXZlci1wdXBweS5qcGVn" },
//   { title: "I am your third donation", desc: "A great donation that is super fun to look at and good", imgUrl: "https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA4OC85MTEvb3JpZ2luYWwvZ29sZGVuLXJldHJpZXZlci1wdXBweS5qcGVn" }
// ]

// Index
app.get('/', (req, res) => {
  models.Donation.findAll({ order: [['createdAt', 'DESC']] }).then(donations => {
    res.render('donations-index', { donations: donations });
  })
})

// NEW
app.get('/donations/new', (req, res) => {
  res.render('donations-new', {});
})

// CREATE
app.post('/donations', (req, res) => {
  models.Donation.create(req.body).then(donation => {
    res.redirect(`/donations/${donation.id}`)
  }).catch((err) => {
    console.log(err)
  });
})

// SHOW
app.get('/donations/:id', (req, res) => {
  // Search for the donation by its id that was passed in via req.params
  models.Donation.findByPk(req.params.id).then((donation) => {
    // If the id is for a valid donation, show it
    res.render('donations-show', { donation: donation })
  }).catch((err) => {
    // if they id was for a donation not in our db, log an error
    console.log(err.message);
  })
})

// Choose a port to listen on
const port = process.env.PORT || 3000;

// Tell the app what port to listen on
app.listen(port, () => {
  console.log('App listening on port 3000!')
})
