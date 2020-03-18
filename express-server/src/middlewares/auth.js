const FirebaseOperations = require('../firebase/firebase');

module.exports = async(req, res, next) => {
    console.log(req.headers);
    const token = req.headers.authorization.replace('Bearer ', '');
        if (req.path === '/users/createUser' && req.method === 'POST') {
            next();
        }else {
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
}