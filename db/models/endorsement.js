'use strict';

const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Endorsement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        Endorsement.associate = function(models) {
          Endorsement.belongsTo(models.Donation); // DonationId
        };
    }
  };
  Endorsement.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Endorsement',
  });
  return Endorsement;
};
