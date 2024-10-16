Sure! Here’s the entire documentation translated into English and formatted in markdown:

```markdown
# Fullstack Chat API Project

## Overview

This project is a chat application called Chappy, built with the MERN stack (MongoDB, Express, React, and Node.js). The application allows users to send messages directly to specific users or in channels. It also includes authentication to ensure that only logged-in users can participate in certain channels.

## Features

- **User Authentication**: Registration and login for users.
- **Open and Locked Channels**: Users can view and send messages in open channels, while locked channels are only accessible to logged-in users.
- **Direct Messages**: Users can send messages directly to each other.
- **RESTful API**: The backend application offers a RESTful API for managing users and messages.

## Installation

Follow the steps below to install and run the project locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Martinf88/FULLSTACK-CHAT-API-PROJECT.git
   cd FULLSTACK-CHAT-API-PROJECT
   ```

2. **Install dependencies:**
   Install dependencies for both frontend and backend:
   ```bash
   npm install
   cd backendSrc
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file in the backend folder and add your environment variables:
   ```plaintext
   MONGODB_URI=<your-mongodb-uri>
   JWT_SECRET=<a-secret-value>
   ```

4. **Run the application:**
   Start the backend server:
   ```bash
   npm run start-backend
   ```
   Start the frontend application:
   ```bash
   cd ../
   npm run dev
   ```

## Usage

Open your browser and navigate to `http://localhost:3000` to use the application.

## API Documentation

See below for details about API endpoints:

### Users

#### Register a User

- **Method**: `POST`
- **URL**: `/api/users/register`
- **Body**:
  ```json
  {
    "username": "TarnishedKnight",
    "password": "sword123"
  }
  ```
- **Response**:
  - **201 Created**: If the user was created successfully.
  - **400 Bad Request**: If validation fails.

#### Login

- **Method**: `POST`
- **URL**: `/api/users/login`
- **Body**:
  ```json
  {
    "username": "TarnishedKnight",
    "password": "sword123"
  }
  ```
- **Response**:
  - **200 OK**: If login is successful, returns JWT token.
  - **401 Unauthorized**: If login fails.

### Channels

#### Get All Channels

- **Method**: `GET`
- **URL**: `/api/channels`
- **Response**:
  - **200 OK**: List of channels.
  - **404 Not Found**: If no channels exist.

#### Create a New Channel

- **Method**: `POST`
- **URL**: `/api/channels`
- **Body**:
  ```json
  {
    "name": "limgrave",
    "isLocked": false
  }
  ```
- **Response**:
  - **201 Created**: If the channel was created successfully.
  - **400 Bad Request**: If validation fails.

### Messages

#### Send a Message

- **Method**: `POST`
- **URL**: `/api/messages`
- **Body**:
  ```json
  {
    "content": "Welcome to Limgrave!",
    "channel": "limgrave",
    "sender": "TarnishedKnight"
  }
  ```
- **Response**:
  - **201 Created**: If the message was sent successfully.
  - **400 Bad Request**: If validation fails.

#### Get Messages in a Channel

- **Method**: `GET`
- **URL**: `/api/messages/:channelId`
- **Response**:
  - **200 OK**: List of messages.
  - **404 Not Found**: If no messages exist for the specified channel.

## Contributing

Feel free to contribute to the project! Create a new branch, make your changes, and submit a pull request.

## License

This project is licensed under the MIT License.
```

Now you have the complete documentation in English and formatted in markdown. If you need anything else, just let me know!