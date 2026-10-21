# GeoSnap Journal (PWA)

A Progressive Web Application built for taking quick notes paired with camera photos and current GPS coordinates.

- **Live Application URL:** [Insert your deployed HTTPS link here, e.g., GitHub Pages]

## Technologies Used
- HTML5, CSS3, JavaScript (ES6+)
- Service Workers & Cache API
- Web App Manifest (PWA)

## Native Device Features
1. **Geolocation API:** Retrieves real-time GPS location coordinates attached to created notes.
2. **MediaDevices API (Camera):** Accesses device cameras to stream video and capture snapshots directly within the app.

## Offline Capabilities & Caching Strategy
- **Service Worker:** Manages asset caching to ensure the app loads seamlessly without an active internet connection.
- **Caching Strategy:** Uses a **Cache First** strategy for core application assets (`index.html`, `styles.css`, `app.js`, `manifest.json`).
  - *Justification:* Static core assets rarely change during runtime. Returning cached assets guarantees instant startup speed and offline availability.
- **Offline Notification:** An offline banner alerts users when connection is lost, while local entries stored in `localStorage` remain functional.

## Local Setup Instructions
1. Clone or download the repository.
2. Serve the directory using a local web server (e.g., VS Code *Live Server* extension) because Service Workers require HTTPS or `localhost`.
3. Open `http://localhost:5500` in Google Chrome or any Web API compliant browser.

