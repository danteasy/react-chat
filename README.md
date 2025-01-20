
# React-Chat

This is a web application built with ReactJS, Redux Toolkit, TypeScript, and WebSockets. The application has a responsive design using Tailwind CSS and includes user features such as mentions.

## Prerequisites

Make sure you have the following installed on your machine:

-   [Node.js](https://nodejs.org/) (v14 or higher)

-   [npm](https://www.npmjs.com/) (comes with Node.js)

## Setup Instructions
1.  **Clone the Repository**
 
First, clone the repository to your local machine:

```bash
git clone https://github.com/danteasy/react-chat
```

2.  **Install Dependencies**

Open two terminal windows and navigate to the corresponding folder in each of them.

Terminal 1: 
```
cd server
npm install
```
Terminal 2:
```
cd client
npm install
```



3.  **Start the Server**

To start the server, run the following command in the Terminal 1:

```
node index.js
```

The server will start, and it will be ready to handle WebSocket connections.

4.  **Start the Client**

Open Terminal 2 window and start the React application:

```
npm start
```


This will start the client application at http://localhost:3000 by default.
