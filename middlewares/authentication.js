const jwt = require("jsonwebtoken");

const SECRET_KEY = "ailogic";

const authenticateUser = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    // const token = authHeader && authHeader.split(" ")[1];
    const token = authHeader

    // console.log(token, authHeader)
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, (err, user) => {
      console.log(err);

      if (err) return res.sendStatus(403);

      console.log(user)
      req.user = user;

      next();
    });
  } catch (err) {
    res.send(400, "User authentication failed, request not allowed");
  }
};


module.exports = authenticateUser
