const express = require('express');
const cors = require('cors');
const app = express();
const firebase = require('firebase');
const bodyParser = require('body-parser');
const admin = require("firebase-admin");
const serviceAccount = require('../src/config/config.json');
const originsWhitelist = 'http://localhost:4200'; 
const appInit = require('../src/config/app-init.js')
firebase.initializeApp(appInit);
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
app.get('/token', async (req, res) => {
    req.headers.authorization = req.headers.authorization.replace('Bearer ', '');
    try {
      const decodedToken = await admin.auth().verifyIdToken(req.headers.authorization);
      const uid = decodedToken.uid;
      const result = await firebase.firestore().collection('users').doc(`${uid}`).get();
      res.send({uid, wallet: result.data().wallet});
    } catch(e) {
      console.log(e);
    }
})
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.put('/wallet', (req, res) => {
  firebase.firestore().collection('users').doc(`${req.body.uid}`).update({wallet: req.body.wallet});
})
app.post('/wallet', (req, res) => {
  firebase.firestore().collection('users').doc(`${req.body.uid}`).set({
    email: req.body.email,
    wallet: req.body.wallet
  });
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
})