'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'Endorsements', // name of source model
      'DonationId', // name of key we are adding
      {type: Sequelize.INTEGER,
      references: { //Required field
        model: 'Donations',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Endorsements', 'DonationId');
  }
};
