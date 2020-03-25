const FirebaseOperations = require('../firebase/firebase');

module.exports = async(req, res, next) => {
    const token = req.headers.authorization.replace('Bearer ', '');
        try {
            const check = await FirebaseOperations.verifyToken(token);
            req.headers.uid = check.decodedToken;
            next()
        }
        catch(e) {
        res.status(400).send({
            message: 'Invalid Token!'
        })
}
}