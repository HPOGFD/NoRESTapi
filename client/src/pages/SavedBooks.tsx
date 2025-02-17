import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USER_DATA } from '../graphql/queries';
import { DELETE_BOOK } from '../graphql/mutations';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';

const SavedBooks = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    savedBooks: [],
  });

  // GraphQL query to get the user data
  const { loading, error, data } = useQuery(GET_USER_DATA, {
    skip: !Auth.loggedIn(), // Only run query if user is logged in
  });

  // GraphQL mutation to delete a book
  const [deleteBook] = useMutation(DELETE_BOOK, {
    onCompleted: (data) => {
      // After successfully deleting, update the state
      const updatedBooks = userData.savedBooks.filter(
        (book) => book.bookId !== data.deleteBook.bookId
      );
      setUserData((prev) => ({ ...prev, savedBooks: updatedBooks }));
      // Remove book from localStorage
      removeBookId(data.deleteBook.bookId);
    },
  });

  useEffect(() => {
    if (data) {
      setUserData(data.me);
    }
  }, [data]);

  const handleDeleteBook = (bookId) => {
    deleteBook({
      variables: { bookId },
    });
  };

  if (loading) return <h2>LOADING...</h2>;
  if (error) return <h2>Error loading user data</h2>;

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          {userData.username ? (
            <h1>Viewing {userData.username}'s saved books!</h1>
          ) : (
            <h1>Viewing saved books!</h1>
          )}
        </Container>
      </div>
      <Container>
        <h2 className="pt-5">
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${
                userData.savedBooks.length === 1 ? 'book' : 'books'
              }:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {userData.savedBooks.map((book) => (
            <Col md="4" key={book.bookId}>
              <Card border="dark">
                {book.image && (
                  <Card.Img
                    src={book.image}
                    alt={`The cover for ${book.title}`}
                    variant="top"
                  />
                )}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className="small">Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeleteBook(book.bookId)}
                  >
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
