const jwt = require("jsonwebtoken");

const Authenticate = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    res.status(401).json({ Auth: false, message: "Authentication is Pending. Please Authenticate" });
  }

  try {
    token = token.slice(7, token.length);

    const decode = jwt.verify(token, process.env.JWT_Secret);
    req.user = decode.current_user;

    next();
  } catch (e) {
    res.status(401).json({ Auth: false, error: "Token is wrong..." });
  }
};

module.exports = Authenticate;
