import express from 'express';
import path from 'node:path';
import db from './config/connection.js';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs, resolvers } from './schemas/index.js';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = process.env.PORT || 3001;
const secret = process.env.JWT_SECRET || 'mysecretsshhhhh';

// Create Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  await server.start();

  // Middleware
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // Apply Apollo Server middleware
  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: async ({ req }) => {
        // Get the token from the authorization header
        const token = req.headers.authorization?.split(' ')[1] || '';
        
        if (!token) {
          return {}; // Return empty context if no token
        }
        
        try {
          // Verify and decode the token
          const decoded = jwt.verify(token, secret);
          
          // Return the user information in the context
          return { user: decoded };
        } catch (err) {
          console.error('Error verifying token:', err);
          return {}; // Return empty context if token verification fails
        }
      },
    })
  );

  // Serve static assets in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  }

  // Start the server
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`🌍 Now listening on localhost:${PORT}`);
      console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
    });
  });
};

startApolloServer();