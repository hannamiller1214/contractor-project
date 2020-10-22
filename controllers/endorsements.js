// controllers/endorsements.js

module.exports = (app, models) => {
  // NEW
  app.get('/donations/:donationId/endorsements/new', (req, res) => {
    models.Donation.findByPk(req.params.donationId).then(donation => {
      res.render('endorsements-new', { donation: donation });
    });
  });

  // CREATE
  app.post('/donations/:donationId/endorsements', (req, res) => {
    req.body.DonationId = req.params.donationId;
    models.Endorsement.create(req.body).then(endorsement => {
      res.redirect(`/donations/${req.params.donationId}`);
    }).catch((err) => {
        console.log(err)
    });
  });

  // DELETE
  app.delete('/donations/:donationId/endorsements/:id', (req, res) => {
      models.Endorsement.findByPk(req.params.id).then(endorsement => {
          endorsement.destroy();
          res.redirect(`/donations/${req.params.donationId}`);
      }).catch((err) => {
          console.log(err);
      });
  });
}
