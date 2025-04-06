const express = require("express");
const { registerOrganization, saveCustomization } = require("../controllers/organizationController");
const { authenticate } = require("../middleware/authMiddleware")
const router = express.Router();

router.post("/registerOrg", authenticate, registerOrganization);
router.post("/custom-settings", authenticate,saveCustomization);


module.exports = router;