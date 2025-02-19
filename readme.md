# 📚 Google Books API Integration

A powerful application integrating Google Books with GraphQL and MongoDB, enabling users to search and save books to their profile with secure authentication.

## 📑 Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Setup](#setup)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- 🔍 Search books through Google Books API
- 💾 Save books to personal user profile
- 📖 View and manage saved books collection
- 🎯 GraphQL-powered data operations
- 🔐 Secure JWT authentication
- 🗄️ MongoDB integration for data persistence

## 🛠️ Technologies

### Frontend
- ⚛️ React
- 🚀 Apollo Client
- 📊 GraphQL
- 📝 JavaScript / TypeScript

### Backend
- 🖥️ Node.js / Express.js
- ⚡ Apollo Server (GraphQL)
- 🍃 MongoDB with Mongoose

### Security
- 🔑 JWT (JSON Web Tokens)

### Styling
- 🎨 CSS

## 🚀 Setup

### Clone and Install

```bash
# Clone the repository
git clone https://github.com/HPOGFD/NoRESTapi.git
cd NoRESTapi
```

### Backend Configuration

1. Create `.env` file in the backend root:
```env
MONGODB_URI='your-mongo-db-uri-here'
JWT_SECRET_KEY='your-secret-key-here'
```

2. Install and start backend:
```bash
# Install dependencies
cd server
npm install

# Start server
npm run dev
```

### Frontend Setup

```bash
# Install dependencies
cd client
npm install

# Launch development server
npm start
```

Your application will be available at:
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:3000`

## 🎮 Usage

1. **Book Search**: 
   - Use the search bar to find books in the Google Books database
   - View detailed information about each book

2. **Save Books**: 
   - Log in to your account
   - Click "Save" on any book to add it to your collection
   - Access saved books through your profile page

3. **Authentication**:
   - Create an account or log in
   - All book-saving features require authentication
   - Secure JWT-based session management

## 👥 Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

Special thanks to the AI community for their support and contributions.

---
⭐ If you find this project helpful, please consider giving it a star!