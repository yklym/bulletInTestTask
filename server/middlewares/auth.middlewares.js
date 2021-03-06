const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config");


module.exports.authenticateToken = function (req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {

        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    })
}

module.exports.checkIfOwner = function (req, res, next) {
    if (req.params.id !== req.user._id) {
        res.status(403).json({
            err: "true",
            message : "no access to managing other users info"
        });
        return;
    }
    next();
}