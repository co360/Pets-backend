'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.user)
    }
  };
  address.init({
    house_number:DataTypes.INTEGER,
    street: DataTypes.STRING,
    city: DataTypes.STRING,
    postcode: DataTypes.STRING,
    country:DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'address',
  });
  return address;
};