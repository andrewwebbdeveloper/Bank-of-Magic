import { createStore, combineReducers, compose } from 'redux';
import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';

// Reducers
//  import settingsReducer from './reducers/settingsReducer';
import notifyReducer from './reducers/notifyReducer';
import settingsReducer from './reducers/settingsReducer';

const firebaseConfig = {
  apiKey: 'AIzaSyBtp5ArIBg3SSA98Rl4KSgk_yRJfuoFzvc',
  authDomain: 'reactclientpanel-97a8a.firebaseapp.com',
  databaseURL: 'https://reactclientpanel-97a8a.firebaseio.com',
  projectId: 'reactclientpanel-97a8a',
  storageBucket: 'reactclientpanel-97a8a.appspot.com',
  messagingSenderId: '928239346098'
};

// react-redux-firebase Config
const rrfConfig = {
  userProfile: 'users',
  useFirestorForProfile: true // Firestore for Profile instead for Realtime DB
};

// Init firebase instance
firebase.initializeApp(firebaseConfig);
// Init firestore
const firestore = firebase.firestore();
firestore.settings({ timestampsInSnapshots: true });
//firestore.settings(settings);

// Add reactReduxFirebase enhancer when making store creator

const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig),
  reduxFirestore(firebase)
)(createStore);

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  notify: notifyReducer,
  settings: settingsReducer
});

// Check for settings in localStorage
if (localStorage.getItem('settings') == null) {
  // Default settings
  const defaultSettings = {
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: false,
    allowRegistration: false
  };

  // Set to localStorage
  localStorage.setItem('settings', JSON.stringify(defaultSettings));
}

// Create initial state

const initialState = { settings: JSON.parse(localStorage.getItem('settings')) };

// Create store
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
