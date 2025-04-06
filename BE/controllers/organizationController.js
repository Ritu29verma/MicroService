const {Organization, User, CustomizationSettings } =require ("../models");

const registerOrganization = async (req, res) => {
    const { name, domain } = req.body;
    const userId = req.user.id;
  
    try {
      const organization = await Organization.create({ name, domain });
  
      await User.update(
        { organizationId: organization.id },
        { where: { id: userId } }
      );
  
      res.status(201).json({ message: "Organization registered", organization });
    } catch (error) {
      console.error("Organization Register Error:", error);
      res.status(500).json({ message: "Failed to register organization" });
    }
  };

const saveCustomization = async (req, res) => {
    const { chatColor, welcomeMessage, iconUrl } = req.body;
    const userId = req.user.id;
  
    try {
      const user = await User.findByPk(userId, { include: "Organization" });
  
      if (!user || !user.organizationId) {
        return res.status(404).json({ message: "Organization not found for user" });
      }
  
      const [customization, created] = await CustomizationSettings.upsert({
        organizationId: user.organizationId,
        chatColor,
        welcomeMessage,
        iconUrl,
      }, { returning: true });
  
      res.status(200).json({ message: "Customization saved", customization });
    } catch (error) {
      console.error("Customization Save Error:", error);
      res.status(500).json({ message: "Failed to save customization" });
    }
  };
  
  module.exports = { registerOrganization, saveCustomization };