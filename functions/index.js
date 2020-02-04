const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { FieldValue } = admin.firestore;

admin.initializeApp();

const db = admin.firestore();

exports.documentWriteListener = functions.firestore.document('/checkins/{documentUid}').onWrite(change => {

  // New document created. Add one to the count.
  if (!change.before.exists) {
    const { dumpling, rating } = change.after.data();
    db.doc('/meta/counters').update({checkinCount: FieldValue.increment(1)});
    db.doc(`/dumplings/${dumpling}`).update({
      checkinCount: FieldValue.increment(1),
      aggregateRating: FieldValue.increment(rating)
    });
    return 0;
  }

  // Deleted document, remove from the count.
  if (!change.after.exists) {
    const { dumpling, rating } = change.before.data();
    db.doc('/meta/counters').update({checkinCount: FieldValue.increment(-1)});
    db.doc(`/dumplings/${dumpling}`).update({
      checkinCount: FieldValue.increment(-1),
      aggregateRating: FieldValue.increment(rating * -1)
    });
    return 0;
  }

  return 0;
});
