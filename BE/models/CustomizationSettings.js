const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const CustomizationSettings = sequelize.define("CustomizationSettings", {
    chatColor: {
      type: DataTypes.STRING,
      defaultValue: "#4CAF50",
    },
    welcomeMessage: {
      type: DataTypes.STRING,
      defaultValue: "Hi there! How can we help you?",
    },
    iconUrl: {
      type: DataTypes.STRING,
      defaultValue: "", // or default system icon URL
    },
  });

  return CustomizationSettings;
};
