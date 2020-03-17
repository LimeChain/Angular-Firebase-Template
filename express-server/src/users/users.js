const FirebaseOperations = require('../firebase/firebase');
const collections = require('../collections/collections.json');
var express = require('express');
var router = express.Router();
router.get('/wallet', async (req, res) => {
  const data = await FirebaseOperations.retrieve(collections.USERS_COLLECTION, req.headers.uid.uid);
  res.send(data.data());
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