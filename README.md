
# Convergence Code Editor Demo 
This project provides a mock up of collaborative code editor using the [React](https://reactjs.org/), the [Ace Editor](https://ace.c9.io) and Convergence for persistence and realtime collaboration. 

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
