'use strict';
module.exports = (sequelize, DataTypes) => {
  const Moji = sequelize.define('Moji', {
    name: DataTypes.STRING,
    store: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {});
  Moji.associate = function(models) {
    // associations can be defined here
  };
  return Moji;
};