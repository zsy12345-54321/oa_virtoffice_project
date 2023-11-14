# oa_virtoffice_project
The Virtual Office project is a -edge web development designed to improve remote communication. Apply WebRTC and Samplepeer for video call feature, user can join and leave video calls automatically. In addition, it dynamically updates each participant's position in real-time, offering a more interactive and engaging virtual meeting environment. Built with React, WebSocket, and WebRTC.

# Demo
![Demo Video](https://github.com/zsy12345-54321/oa_virtoffice_project/blob/main/demo.gif)

# Virtual Office Setup Instructions

## Prerequisites
- Git
- Node.js and npm
- Serve (`npm install -g serve`)

## Quick Start
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

