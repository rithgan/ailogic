const bcrypt = require("bcrypt");


const generatePassword = async(password)=>{
  password = await bcrypt.hash(password, bcrypt.genSaltSync(8));
  return password
}

const comparePassword = async (given_password, password)=>{
  let status = await bcrypt.compare(given_password, password);
  return status
}


module.exports = {
  generatePassword,
  comparePassword
}
