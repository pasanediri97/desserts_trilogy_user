// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyCPOD6fULhGu9HNMknVu8yjsWeixpIAgbQ",
    authDomain: "food-delivery-1e89f.firebaseapp.com",
    projectId: "food-delivery-1e89f",
    storageBucket: "food-delivery-1e89f.appspot.com",
    messagingSenderId: "717623054826",
    appId: "1:717623054826:web:0493726f9e9c9bad2f2293",
    measurementId: "G-GG0ZQNM3CM",
    databaseURL: "https://food-delivery-1e89f.firebaseio.com"
  },
  onesignal: {
    appId: '',
    googleProjectNumber: '',
    restKey: ''
  },
  stripe: {
    sk: ''
  },
  paypal: {
    sandbox: '',
    production: 'YOUR_PRODUCTION_CLIENT_ID'
  },
  general: {
    symbol: '$',
    code: 'USD'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
