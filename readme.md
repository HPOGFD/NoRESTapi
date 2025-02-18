# Google Books API Integration

This project is a Google Books app that integrates with GraphQL and MongoDB, allowing users to search for books and save them to their profile. The app requires user authentication, and the saved books are stored in the user's account.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup](#setup)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- Search for books using the Google Books API.
- Save books to your user profile.
- Display saved books from the user's account.
- Use GraphQL for data fetching and mutations.
- User authentication and JWT-based authorization.
- Fully integrated with MongoDB for storing user data and saved books.

## Technologies Used

- **Frontend**:
  - React
  - Apollo Client
  - GraphQL
  - JavaScript / TypeScript
- **Backend**:
  - Node.js / Express.js
  - GraphQL (Apollo Server)
  - MongoDB (with Mongoose)
- **Authentication**:
  - JWT (JSON Web Tokens)
- **Styling**:
  - CSS

## Setup

To get started, clone the repository and install the necessary dependencies:

### Clone the Repository

```bash
git clone https://github.com/HPOGFD/NoRESTapi.git
cd NoRESTapi


Backend Setup:

Create a .env file at the root of the backend folder.

Add the following environment variables to .env:

text
MONGODB_URI='your-mongo-db-uri-here'
JWT_SECRET_KEY='your-secret-key-here'
Install the backend dependencies:

bash
cd server
npm install
Start the backend server:

bash
npm run dev
Frontend Setup:

Install frontend dependencies:

bash
cd client
npm install
Start the frontend server:

bash
npm start
Now, you can access the frontend by navigating to http://localhost:3000 in your browser, and the API will be running at http://localhost:3001.

Usage
Search for Books: Use the search functionality to find books.

Save Books: Once logged in, click the "Save" button to add books to your saved list.

View Saved Books: Access your profile page to see the list of saved books.

Authentication: Log in with your credentials to access the app.

Contributing
Feel free to open issues or submit pull requests for any improvements or bug fixes. All contributions are welcome!

License
This project is licensed under the MIT License - see the LICENSE file for details.