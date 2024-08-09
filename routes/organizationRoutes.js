const express = require("express");
const orgRouter = express.Router();
const {
  createOrganization,
  viewOrganizations,
  updateOrganization,
  deleteOrganization,
} = require("../controller/organizationController");
const { authenticateToken, authorizeRole } = require('../middleware/authmiddleware');

// Organization routes (Admin only)
orgRouter.post(
  "/organizations",
  authenticateToken,
  authorizeRole(["ADMIN"]),
  createOrganization
);
orgRouter.get(
  "/organizations",
  authenticateToken,
  authorizeRole(["ADMIN"]),
  viewOrganizations
);
orgRouter.patch(
  "/organizations/:orgId",
  authenticateToken,
  authorizeRole(["ADMIN"]),
  updateOrganization
);
orgRouter.delete(
  "/organizations/:orgId",
  authenticateToken,
  authorizeRole(["ADMIN"]),
  deleteOrganization
);

module.exports = orgRouter;
