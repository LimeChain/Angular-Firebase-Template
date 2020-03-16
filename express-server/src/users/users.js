const FirebaseOperations = require('../firebase/firebase');
const collections = require('../collections/collections.json');
var express = require('express');
var router = express.Router();
router.get('/token', async (req, res, next) => {
    const token = req.headers.authorization.replace('Bearer ', '');
    try {
      const response = await FirebaseOperations.verifyToken(token);
      res.send(response);
    }
    catch(e) {
      res.status(400).send({
        message: 'Invalid Token!'
      })
    }
})
router.put('/wallet', (req, res) => {
    const dto = {
      wallet: req.body.wallet
    }
    FirebaseOperations.update(collections.USERS_COLLECTION, req.body.uid, dto)
  })
router.post('/wallet', (req, res) => {
    const dto = {
      email: req.body.email,
      wallet: req.body.wallet
    }
    FirebaseOperations.create(collections.USERS_COLLECTION, req.body.uid, dto);
})
module.exports.router = router;