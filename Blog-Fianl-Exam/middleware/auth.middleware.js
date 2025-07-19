const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    let token = req.headers.authorization;

    if (!token) {
        res.status(401).json({ status: false, error: "auth is requied....?" })
    }
    try {
        token = token.slice(7, token.length);

        const decode = jwt.verify(token, process.env.secret);
        req.user = decode.current_user;

        next();
    } catch (e) {
        res.status(401).json({ status: false, error: " token is invelid....?" })
    }
};
module.exports= auth;