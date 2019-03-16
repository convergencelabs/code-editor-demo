# Convergence Code Editor Demo 
This project provides a mockup of collaborative code editor using the [React](https://reactjs.org/), the [Ace Editor](https://ace.c9.io) and Convergence for persistence and realtime collaboration. 

*Note: This is merely a demonstration, and not intended to be a full fledged / real code editor.*

## Getting started

1. Clone this repository
1. `npm install`
1. Updated the `CONVERGENCE_URL` in the `public/code-editor-config.js` to point to your Convergence server.
1. `npm start` to launch a lightweight web server for running the editor locally.  

## Features
1. Proper conflict resolution (try editing the same code with two users simultaneously)
1. User presence (see which users are currently connected)
1. Activity tracking (cursor positions and highlights color-coded per remote user) 


## Available Scripts
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
