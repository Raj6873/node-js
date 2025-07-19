const jwt = require("jsonwebtoken");

const adminAuth = (req, res, next) => {
  let token = req.header("Authorization");

  if (!token) {
    res.status(401).json({ msg: "Auth is required...." });
  }

  try {
    token = token.slice(7, token.length);

    console.log("token ",token)
    const data = jwt.verify(token, "Admin@raj123");

    console.log('====================================');
    console.log(data);
    console.log('====================================');

    if (data) {
      req.user = data.AdminEmailData;

      next();
    } else {
      res.status(401).json({ msg: "Token is invalid..." });
    }
  } catch (e) {
    res.status(401).json({ msg: "Token is invalid..." });
  }
};

module.exports = adminAuth;