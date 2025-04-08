const {Organization, User, CustomizationSettings } =require ("../models");
const dotenv = require("dotenv");

dotenv.config();

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
  
  const getIntegrationScriptData = async (req, res) => {
    try {
      const userId = req.user.id;
  
      const user = await User.findByPk(userId, {
        include: {
          model: Organization,
          include: CustomizationSettings,
        },
      });
  
      if (!user || !user.Organization) {
        return res.status(404).json({ message: "Organization not found" });
      }
  
      const org = user.Organization;
      const script = `<script src="${process.env.CLIENT_serve_URL}/chat-widget.iife.js" data-org="${org.id}"></script>`;
  
      res.json({
        script,
        organizationId: org.id,
        domain: org.domain,
        customization: org.CustomizationSetting || {},
      });
    } catch (error) {
      console.error("Script data fetch error:", error);
      res.status(500).json({ message: "Failed to fetch script data" });
    }
  };
  

const orgDetail = async (req, res) => {
    try {
      const user = await User.findByPk(req.user.id, {
        include: {
          model: Organization,
        },
      });
  
      if (!user || !user.Organization) {
        return res.status(404).json({ message: "Organization not found" });
      }
  
      res.json({
        id: user.Organization.id,
        domain: user.Organization.domain,
        Verified: user.Organization.Verified,
      });
    } catch (err) {
      console.error("Error fetching org:", err);
      res.status(500).json({ message: "Server error" });
    }
  };

  module.exports = { registerOrganization, saveCustomization, getIntegrationScriptData, orgDetail };