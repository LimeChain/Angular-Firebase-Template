const express = require('express');
const cors = require('cors');
const app = express();
const admin = require("firebase-admin");
const serviceAccount = require('../config.json');
const originsWhitelist = 'http://localhost:4200';
const corsOptions = {
  origin: function(origin, callback){
        const isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
  },
  credentials:true
}
app.use(cors(corsOptions));
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://angular-firebase-templat-40a46.firebaseio.com',
});
app.get('/token', (req, res) => {
    console.log(req.headers);
    req.headers.authorization = req.headers.authorization.replace('Bearer ', '');
    console.log(req.headers)
    admin.auth().verifyIdToken(req.headers.authorization)
    .then(function(decodedToken) {
      let uid = decodedToken.uid;
      // res.send({uid});
      console.log(uid)
    }).catch(function(error) {
      console.log(error);
    });
})
app.listen(3000, () => {
    console.log('Server is up on port 3000.');
})