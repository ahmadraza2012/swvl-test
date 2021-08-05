const firebase = require("firebase-admin");

const serviceAccount = require("path/to/your/firebase/secret.json");

// The Firebase token of the device which will get the notification
// It can be a string or an array of strings

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://your-app-name.firebaseio.com",
});

exports.sendPush = async (firebaseToken, message) => {
  const payload = {
    notification: {
      title: "SWVL",
      body: message,
    },
  };

  const options = {
    priority: "high",
    timeToLive: 60 * 60 * 24, // 1 day
  };

  firebase.messaging().sendToDevice(firebaseToken, payload, options);
};
