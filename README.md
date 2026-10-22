# GeoSnap Journal (PWA)

Created by Yusif Rahimov (Student ID: 53206).

**Live Application URL:** [ https://rhmvvcyb3r.github.io/GeoSnap-Journal-PWA-APP-/ ]

## Project Overview
GeoSnap is a Progressive Web Application (PWA) that allows users to create visual journal entries by capturing photos and attaching real-time GPS coordinates. The application is fully responsive and designed to work seamlessly offline.

## Application Views
The app consists of three main views with a consistent flow and bottom navigation:
1. **Feed:** Displays all locally saved entries (text, photo, date, and coordinates).
2. **Create:** A form interface to interact with device hardware (camera, GPS) and save a new note.
3. **Info:** Information about the app, active native APIs, network status, and author details.

## Native Device Features
This application utilizes two native web APIs to enhance user experience:
1. **Geolocation API (`navigator.geolocation`):** Used to retrieve the user's current GPS coordinates (latitude and longitude) to attach real-world location metadata to the journal entry.
2. **MediaDevices API (`navigator.mediaDevices.getUserMedia`):** Accesses the device's camera stream to allow users to take a snapshot directly within the application's interface without uploading external files.

## Caching Strategy
The application implements a Service Worker (`sw.js`) using the **Cache First, Fallback to Network** strategy for its core assets.

- **Strategy Justification:** Static resources (`index.html`, `index.css`, `index.js`, `manifest.json`, and `icon.png`) rarely change during runtime. Serving them from the cache first guarantees an instant load time and ensures the application shell remains fully functional even without an internet connection. Dynamic user-generated data (notes and photos) is persisted locally via `localStorage`, making the app completely independent of the network.

## Technologies & Dependencies
- **Core:** HTML5, CSS3, Vanilla JavaScript (ES6+)
- **PWA Features:** Service Worker API, Cache Storage API, Web App Manifest
- **Storage:** Web Storage API (`localStorage`)
- **Dependencies:** None. The project relies entirely on native browser features without any external libraries or frameworks.

## How to Run Locally
1. Clone the repository to your local machine.
2. Since Service Workers require a secure context (HTTPS) or `localhost`, you must serve the files using a local web server. 
   - *Recommended:* Use the "Live Server" extension in VS Code, Node's `http-server`, or Python's `http.server`.
3. Open the provided `localhost` URL in your browser.
*(Note: Opening the `index.html` file directly via the `file://` protocol will fail to register the Service Worker).*
<img width="400" height="700" alt="image" src="https://github.com/user-attachments/assets/479a039a-aa04-4411-aa60-de206df00fe4" />
<img width="400" height="700" alt="image" src="https://github.com/user-attachments/assets/3412ed60-9469-448a-b504-6d98932b634a" />
<img width="400" height="700" alt="image" src="https://github.com/user-attachments/assets/617b6e9b-3bf4-45bd-9f2b-74547daa51cc" />



