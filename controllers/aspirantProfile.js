const AspirantProfile = require("../models/aspirantProfile");

// Aspirant creation
const createAspirant = async (req, res) => {
  try {
    const aspirant = await AspirantProfile.create(req.body);
    res
      .status(201)
      .json({ msg: "Aspirant profile created successfully", aspirant });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

// Fetch all aspirants
const getAllAspirants = async (req, res) => {
  try {
    let search = {};
    if (req.query.name) {
      search.name = req.query.name;
    }

    const aspirants = await AspirantProfile.find(search);
    res.status(200).json({ msg: "Here are the aspirants", aspirants });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

// Fetch recent aspirants
const recentAspirants = async (req, res) => {
  try {
    const aspirants = await AspirantProfile.find()
      .sort({ createdAt: -1 })
      .limit(3);

    res.json(aspirants);
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

// Get single aspirant
const getSingleAspirant = async (req, res) => {
  try {
    const aspirant = await AspirantProfile.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ msg: "Aspirant not found" });
    }

    res.status(200).json({ msg: "Here is the aspirant", aspirant });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

// Update aspirant
const updateAspirant = async (req, res) => {
  try {
    const aspirant = await AspirantProfile.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!aspirant) {
      return res.status(404).json({ msg: "Aspirant not found" });
    }

    res.status(200).json({ msg: "Aspirant updated", aspirant });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

// Delete aspirant
const deleteAspirant = async (req, res) => {
  try {
    const aspirant = await AspirantProfile.findByIdAndDelete(req.params.id);
    if (!aspirant) {
      return res.status(404).json({ msg: "Aspirant not found" });
    }
    res
      .status(200)
      .json({ msg: `Aspirant with the id ${req.params.id} deleted!` });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

module.exports = {
  createAspirant,
  getAllAspirants,
  getSingleAspirant,
  recentAspirants,
  updateAspirant,
  deleteAspirant,
};
