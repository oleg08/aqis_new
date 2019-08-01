// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  clientUrl: 'http://localhost:4200',
  serverUrl: 'http://fenix:3000',
  token_auth_config: {
    apiBase: 'http://fenix:3000'
  },
  firebaseConfig: {
    apiKey: 'AIzaSyAp0YHeLkKZXanR15pUFG5IiCqxpoAWOSo',
    authDomain: 'aqis-6fe5b.firebaseapp.com',
    databaseURL: 'https://aqis-6fe5b.firebaseio.com',
    projectId: 'aqis-6fe5b',
    storageBucket: '',
    messagingSenderId: '867099614282',
    appId: '1:867099614282:web:75f2ed41d0fd8f09'
  },
  google_access_psw: 'Success log in with Google.'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
