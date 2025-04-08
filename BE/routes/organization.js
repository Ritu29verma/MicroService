const express = require("express");
const { registerOrganization, saveCustomization, getIntegrationScriptData, orgDetail } = require("../controllers/organizationController");
const { authenticate } = require("../middleware/authMiddleware")
const router = express.Router();

router.post("/registerOrg", authenticate, registerOrganization);
router.post("/custom-settings", authenticate,saveCustomization);
router.get("/get-script", authenticate, getIntegrationScriptData);
router.get("/me", authenticate, orgDetail);




module.exports = router;