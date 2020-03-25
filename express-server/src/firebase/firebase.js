require('dotenv').config();
const firebase = require('firebase');
const admin = require("firebase-admin");
const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT);
const fireBaseCred = JSON.parse(process.env.FIREBASE_CREDENTIALS);
firebase.initializeApp(fireBaseCred);
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://angular-firebase-templat-40a46.firebaseio.com',
  });

class FirebaseOperations {
    static async retrieve(collection, doc) {
        return await firebase.firestore().collection(`${collection}`).doc(`${doc}`).get();
    }

    static async create(collection, doc, dto) {
        firebase.firestore().collection(`${collection}`).doc(`${doc}`).set(dto);
        const user = (await firebase.firestore().collection('users').doc(`${doc}`).get()).data();
        return user;
    }

    static update(collection, doc, dto) {
        firebase.firestore().collection(`${collection}`).doc(`${doc}`).update(dto);
    }

    static async verifyToken(token) {
          const decodedToken = await admin.auth().verifyIdToken(token);
          return {decodedToken};
    }
}

module.exports = FirebaseOperations