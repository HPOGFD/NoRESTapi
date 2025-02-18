import './App.css';
import { Outlet } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Navbar from './components/Navbar';

// HTTP link to GraphQL endpoint
const httpLink = createHttpLink({
  uri: '/graphql', // Ensure this matches your backend GraphQL URI
});

// Middleware to attach token to headers
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token'); // Ensure this token is stored after login
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "", // Add token if available
    },
  };
});

// Initialize Apollo Client with authentication
const client = new ApolloClient({
  link: authLink.concat(httpLink), // Ensures authLink runs before the request
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Navbar />
      <Outlet />
    </ApolloProvider>
  );
}

export default App;
