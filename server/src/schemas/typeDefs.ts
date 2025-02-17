import gql from 'graphql-tag';

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    savedBooks: [Book]
    bookCount: Int
  }

  type Book {
    bookId: String!
    title: String!
    authors: [String]
    description: String
    image: String
    link: String
  }

  type Auth {
    token: String!
    user: User!
  }

  input BookInput {
    bookId: String!
    title: String!
    authors: [String]
    description: String
    image: String
    link: String
  }

  type Query {
    getSingleUser(id: ID, username: String): User
    me: User
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(username: String, email: String, password: String!): Auth
    saveBook(bookInput: BookInput!): User
    deleteBook(bookId: String!): User
  }
`;

export default typeDefs;
