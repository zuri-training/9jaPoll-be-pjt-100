const AspirantProfile = require("../models/aspirantProfile");
const asyncWrapper = require("../middlewares/asyncWrapper");

// Aspirant creation
const createAspirant = asyncWrapper(async (req, res) => {
  const aspirant = await AspirantProfile.create(req.body);
  res
    .status(201)
    .json({ msg: "Aspirant profile created successfully:", aspirant });
});

// Fetch all aspirants
const getAllAspirants = asyncWrapper(async (req, res) => {
  let search = {};
  if (req.query.name) {
    search.name = req.query.name;
  }

  const aspirants = await AspirantProfile.find(search);
  res.status(200).json({ msg: "Here are the aspirants", aspirants });
});

// Fetch recent aspirants
const recentAspirants = asyncWrapper(async (req, res) => {
  const aspirants = await AspirantProfile.find()
    .sort({ createdAt: -1 })
    .limit(3);

  res.json(aspirants);
});

// Get single aspirant
const getSingleAspirant = asyncWrapper(async (req, res) => {
  const aspirant = await AspirantProfile.findById(req.params.id);
  if (!article) {
    return res.status(404).json({ msg: "Aspirant not found" });
  }

  res.status(200).json({ msg: "Here is the aspirant", aspirant });
});

// Update aspirant
const updateAspirant = asyncWrapper(async (req, res) => {
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
});

// Delete aspirant
const deleteAspirant = asyncWrapper(async (req, res) => {
  const aspirant = await AspirantProfile.findByIdAndDelete(req.params.id);
  if (!aspirant) {
    return res.status(404).json({ msg: "Aspirant not found" });
  }
  res
    .status(200)
    .json({ msg: `Aspirant with the id ${req.params.id} deleted!` });
});

module.exports = {
  createAspirant,
  getAllAspirants,
  getSingleAspirant,
  recentAspirants,
  updateAspirant,
  deleteAspirant,
};
