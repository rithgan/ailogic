const { generatePassword, comparePassword } = require("../helpers/password");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "ailogic";

const register = async (req, res) => {
  try {
    let { name, email, phone, profile_picture, password } = req.body;
    const ifExists = await User.findOne({
      where: {
        name: name,
        email: email,
      },
    });
    console.log("ifExists", ifExists);
    if (ifExists) {
      res.send(400, "user already exists");
    } else {
      if (!password) {
        return res.send(400, "Please enter user password");
      }
      if (!email) {
        return res.send(400, "Please enter user email");
      }
      if (!name) {
        return res.send(400, "Please enter user name");
      }
      password = await generatePassword(password);
      console.log(password);
      const user = await User.create({
        name,
        email,
        phone,
        profile_picture,
        password,
      });
      await user.save();
      return res.send(200, "user created successfully");
    }
  } catch (err) {
    console.error(err);
    return res.send(500, "unable to register user");
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (user) {
      let user_password = user.password;
      let status = await comparePassword(password, user_password);
      if (status) {
        const token =  jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });
        const response = {
          token,
          status : "user logged in successfully"
        }
        return res.send(200, response);
      }
      return res.send(401, "your password is incorrect");
    }
    return res.status(400, "user doesn't exists")
  } catch (err) {
    return res.send(500, "Unable to login");
  }
};

const deleteUser = async (req,res)=>{
  try{
    const {email} = req.body
    if (req.user.email != email){
      // delete the user
    }
    return res.send(400, "Unable to delete the logged in user")

  }catch(err){
    console.error(err)
    res.send(500, "unable to delete user")
  }
}

module.exports = {
  register,
  login,
  deleteUser
};
