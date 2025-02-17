import { gql } from '@apollo/client';

// Get logged-in user's data
export const GET_ME = gql`
  query getMe {
    me {
      _id
      username
      email
      savedBooks {
        bookId
        title
        authors
        description
        image
        link
      }
    }
  }
`;

// Get a single user by ID or username
export const GET_USER = gql`
  query getSingleUser($id: ID, $username: String) {
    getSingleUser(id: $id, username: $username) {
      _id
      username
      email
      savedBooks {
        bookId
        title
        authors
        description
        image
        link
      }
    }
  }
`;
