const express = require('express');
const cors = require('cors');
const app = express();
const firebase = require('firebase');
const bodyParser = require('body-parser');
const admin = require("firebase-admin");
const serviceAccount = require('../config.json');
const originsWhitelist = 'http://localhost:4200';
firebase.initializeApp({
  apiKey: 'AIzaSyCm3fMD9F21LU_jSoBMt3AnCyYfi5cTCrI',
  authDomain: 'angular-firebase-templat-40a46.firebaseapp.com',
  databaseURL: 'https://angular-firebase-templat-40a46.firebaseio.com',
  projectId: 'angular-firebase-templat-40a46',
  storageBucket: 'angular-firebase-templat-40a46.appspot.com',
  messagingSenderId: '658681279354',
  appId: '1:658681279354:web:e5d4ef593ae6d5e014dcc3',
  measurementId: 'G-RQ5M0VH1K8'
});

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
    req.headers.authorization = req.headers.authorization.replace('Bearer ', '');
    admin.auth().verifyIdToken(req.headers.authorization)
    .then(function(decodedToken) {
      let uid = decodedToken.uid;
      res.send({uid});
    }).catch(function(error) {
      console.log(error);
    });
})
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.post('/wallet', (req, res) => {
  firebase.firestore().collection('users').doc(`${req.body.uid}`).set({
    email: req.body.email,
    wallet: req.body.wallet
  });
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
})