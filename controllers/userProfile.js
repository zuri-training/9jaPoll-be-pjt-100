const e = require("cors");
const UserProfile = require("../models/user");

// Fetch all users
const getAllUsers = async (req, res) => {
  try {
    let search = {};
    if (req.query.name) {
      search.name = req.query.name;
    }

    const users = await UserProfile.find(search);
    res.status(200).json({ msg: "Here are the Users",users});
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

// Fetch recent users
const recentUsers = async (req, res) => {
  try {
    const users = await UserProfile.find()
      .sort({ createdAt: -1 })
      .limit(3);

    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

// Get single user
const getSingleUser = async (req, res) => {
  try {
    const user = await UserProfile.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(200).json({ msg: "Here is the User", user });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

// Update user
const updateUser = async (req, res) => {

  var data = await UserProfile.findById(req.params.id);

  if(req.body.hobbies){
    var hobbiesArray = data["hobbies"];
    req.body.hobbies.forEach((hobby)=>{
      const index = hobbiesArray.indexOf(hobby);
      if (index > -1) {
        hobbiesArray.splice(index, 1);
      }else{
        hobbiesArray.push(hobby);
      } 
  });
  }

  if(req.body.education){
  var educationArray = data["education"];
    req.body.education.forEach((obj)=>{
      var matched = -1;
      
        for(var i = 0; i < educationArray.length;i++){
        if(educationArray[i].name == obj.name && educationArray[i].degree == obj.degree){
          matched = i;
        }
      }
       if(matched != -1) {
        educationArray.splice(matched, 1);
      }else{
        educationArray.push(obj);
      } 
  });
  }

  try {
    const user = await UserProfile.findByIdAndUpdate(
        req.params.id,
        { $set: {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm,
            username: req.body.username,
            gender: req.body.gender,
            profileImg: req.body.profileImg,
            headerImg: req.body.headerImg,
            education: req.body.education,
            hobbies: hobbiesArray
        }},

        {
            new: true,
            runValidators: true,
            omitUndefined: true
        }
    );

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({ msg: "User updated",user});
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const user = await UserProfile.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res
      .status(200)
      .json({ msg: `User with the id ${req.params.id} deleted!` });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  recentUsers,
  updateUser,
  deleteUser,
};
