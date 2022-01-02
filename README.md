# firebase-authentication-starter

This repository is used create initial React Firebase authentication project

## Dependencies

- bootstrap: 5.1.3
- firebase: 9.6.1
- react: 17.0.2
- react-bootstrap: 2.1.0
  -react-dom: 17.0.2
- react-router-dom: 6.2.1
- react-scripts: 5.0.0
- styled-components: 5.3.3
- web-vitals: 2.1.2

## Setup

- ` git clone git@github.com:OMDTech/firebase-authentication-starter.git`
- `cd firebase-authentication-starter`
- `npm install`
- Rename `.env.local.sample` to `.env.local`
- Add your web app's Firebase configuration in `.env.local`
- `npm start`

## Discription 
This repository impelment the following firebase functions:
- Log in  using  email and password `signInWithEmailAndPassword(email, password);`
- Sign up  using  email and password `createUserWithEmailAndPassword(email, password);`
- Forget password using email `sendPasswordResetEmail(email);`
- Update Email and Password `updateEmail(email)` `updatePassword(password)`

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
