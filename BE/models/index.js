const { sequelize } = require("../config/db");

const UserModel = require("./User");
const OrganizationModel = require("./Organization");
const CustomizationSettingsModel = require("./CustomizationSettings");

const db = {};

db.User = UserModel(sequelize);
db.Organization = OrganizationModel(sequelize);
db.CustomizationSettings = CustomizationSettingsModel(sequelize);

// Associations
db.Organization.hasMany(db.User, { foreignKey: "organizationId" });
db.User.belongsTo(db.Organization, { foreignKey: "organizationId" });

db.Organization.hasOne(db.CustomizationSettings, {
  foreignKey: "organizationId",
  onDelete: "CASCADE",
});

db.CustomizationSettings.belongsTo(db.Organization, {
  foreignKey: "organizationId",
});

db.sequelize = sequelize;

module.exports = db;
