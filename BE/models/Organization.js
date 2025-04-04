const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Organization = sequelize.define("Organization", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    domain: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  return Organization;
};
