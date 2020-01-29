import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { firebaseConfig } from './config';

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();
export const authProvider = new firebase.auth.GoogleAuthProvider();
export const currentUser = auth.currentUser;

export const usersCollection = db.collection('users');
export const restaurantsCollection = db.collection('restaurants');
export const dumplingsCollection = db.collection('dumplings');
export const commentsCollection = db.collection('comments');
export const likesCollection = db.collection('likes');
