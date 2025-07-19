const jwt = require('jsonwebtoken');
const ScretKey = "raj@123";

const authUser = (req, res, next) => {
    console.log("auth is stated....?");
    try {
        let token = req.header("Authorization");
        if (!token) {
            res.stauts(401).json({ message: " auth is required....?" })
        }
        token = token.slice(7, token.lenght);
        const decord = jwt.verify(token, ScretKey);
        if (decord) {
            next();
        } else {
            res.status(400).json({ message: " token is invalied....?" });
        }
    } catch (error) {
        res.status(400).json({ message: " token is invalied....?" });
    }
}

module.exports = authUser;