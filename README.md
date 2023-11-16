# oa_virtoffice_project
The Virtual Office project is a web development designed to improve remote communication. Apply WebRTC and Samplepeer for video call feature, user can join and leave video calls automatically. In addition, it dynamically updates each participant's position in real-time, creating a more interactive virtual meeting environment. The application is built using React, WebSocket, and WebRTC technologies.

# Demo
![Demo Video](https://github.com/zsy12345-54321/oa_virtoffice_project/blob/main/demo.gif)

# Virtual Office Setup Instructions

# Prerequisites
- Git
- Node.js and npm
- Serve (`npm install -g serve`)

# Quick Start
```bash
# Clone the repository
git clone [repository-url]

# Navigate to the project directory
cd path_to_project

# Server setup
cd server
npm install
cd src
node index.js

# Client setup in a new terminal
cd ../client
npm install
npm run-script build

# Open http://localhost:3000/ to view it in the browser

# Server changes
nnode index.js # Inside server directory

# Client changes
npm run-serve build && serve -s build # Inside client directory
```

# overall architecture:
![Screenshot](https://github.com/zsy12345-54321/oa_virtoffice_project/blob/main/Screenshot%202023-11-15%20221031.png)

Client Application (React):
App.js: The main entry point of the React application. It manages the WebSocket connection and renders the main components like GameLoop, Office, and VideoCalls.
CanvasContext.js: Provides a React context for the canvas, used across various components.
FirebaseListener.js: Listens to Firebase database changes and updates the Redux store.
GameLoop.js: Manages the game loop, rendering, and character movement logic.
Map.js: Renders the game map using tile images.
VideoCalls.js: Manages the video call functionality.
Server Application:
Firebase: used for real-time data synchronization, particularly for user positions and states in the virtual office environment.
