//donations.js

const Sequelize = require("sequelize")
const Op = Sequelize.Op;

module.exports = function (app, models) {

    // INDEX
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
        models.Donation.findByPk(req.params.id, { include: [{ model: models.Endorsement }] }).then(donation => {
            res.render('donations-show', { donation: donation });
        }).catch((err) => {
            console.log(err.message);
        })
    });

    // EDIT
    app.get('/donations/:id/edit', (req, res) => {
      models.Donation.findByPk(req.params.id).then((donation) => {
        res.render('donations-edit', { donation: donation });
      }).catch((err) => {
        console.log(err.message);
      })
    });

    // UPDATE
    app.put('/donations/:id', (req, res) => {
      models.Donation.findByPk(req.params.id).then(donation => {
        donation.update(req.body).then(donation => {
          res.redirect(`/donations/${req.params.id}`);
        }).catch((err) => {
          console.log(err);
        });
      }).catch((err) => {
        console.log(err);
      });
    });

    // DELETE
    app.delete('/donations/:id', (req, res) => {
      models.Donation.findByPk(req.params.id).then(donation => {
        donation.destroy();
        res.redirect(`/`);
      }).catch((err) => {
        console.log(err);
      });
    })

    // Search
    app.post('/donations/search', (req, res) => {
      models.Donation.findAll({
        where: {
          title: {
            [Op.iLike]: `%${req.body.q}`         // LIKE '%hat'
          }
        }
      }).then(donations => {
        res.render('donations-search', { donations: donations });
      })
    });
}
