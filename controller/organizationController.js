const Organization = require("../model/organisationModel");


const createOrganization = async (req, res) => {
  const { name, address, contactNumber, email } = req.body;

  const newOrganization = new Organization({
    name,
    address,
    contactNumber,
    email,
  });

  try {
    const savedOrganization = await newOrganization.save();
    res.status(201).json(savedOrganization);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// View All Organizations
const viewOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.find();
    res.status(200).json(organizations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Organization by ID
const updateOrganization = async (req, res) => {
  const { orgId } = req.params;
  const { name, address, contactNumber, email } = req.body;

  try {
    const updatedOrganization = await Organization.findByIdAndUpdate(
      orgId,
      { name, address, contactNumber, email },
      { new: true }
    );

    if (!updatedOrganization) {
      return res.status(404).json({ message: "Organization not found" });
    }

    res.status(200).json(updatedOrganization);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Organization by ID
const deleteOrganization = async (req, res) => {
  const { orgId } = req.params;

  try {
    const deletedOrganization = await Organization.findByIdAndDelete(orgId);

    if (!deletedOrganization) {
      return res.status(404).json({ message: "Organization not found" });
    }

    res.status(200).json({ message: "Organization deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrganization,
  viewOrganizations,
  updateOrganization,
  deleteOrganization,
};
