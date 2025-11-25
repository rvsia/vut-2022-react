# BMD - Best Movie Database

A small React application to demonstrate frontend and backend connection via HTTP requests.

## Install dependencies

```bash
npm install
```

## Run backend

### Instal SSL certificates

For macOS (system-wide):

Open up Keychain Access app.
Select Certificates tab
Click on login menu item in the sidebar.
Drag and drop cert.crt located in server to the list of items.
new item named "Test CA" is created

Double-click on the new item.
Find SSL field and select Always trust

### Run server

Go to `server` folder and start server:

```bash
cd server
node server.js
```

Serves is available at: `http://localhost:3000/movies`

## Run frontend

Go to `client` folder and start the application:


```
cd client
npm run start
```

In the log, you will see an url address.
