const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
exports.users = functions.database.ref('/users/{userId}').onDelete(snapshot => {
  const userDetail = snapshot.val(); // user tat was deleted in db
  admin.auth().deleteUser(userDetail.uid);
  return 'User deleted Successfully';
});
