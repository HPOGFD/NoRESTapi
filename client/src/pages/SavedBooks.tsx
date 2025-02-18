import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { DELETE_BOOK } from '../utils/mutations';
import { Book } from '../models/Book';

const SavedBooks = () => {
  const { loading, data, refetch } = useQuery(GET_ME);
  const [deleteBook] = useMutation(DELETE_BOOK);

  const userData = data?.me || {};

  const handleDeleteBook = async (bookId: string) => {
    try {
      const { data } = await deleteBook({
        variables: { bookId }
      });

      if (!data) {
        throw new Error('something went wrong!');
      }

      // Refetch the user's data to update the UI
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div className="text-light bg-dark p-5">
        <h1>Viewing saved books!</h1>
      </div>
      <div>
        <h2>
          {userData.savedBooks?.length
            ? `Viewing ${userData.savedBooks.length} saved ${
                userData.savedBooks.length === 1 ? 'book' : 'books'
              }:`
            : 'You have no saved books!'}
        </h2>
        <div>
          {userData.savedBooks?.map((book: Book) => (
            <div key={book.bookId}>
              <img src={book.image} alt={`${book.title} book`} />
              <h3>{book.title}</h3>
              <p>Authors: {book.authors.join(', ')}</p>
              <p>{book.description}</p>
              <button onClick={() => handleDeleteBook(book.bookId)}>
                Delete this Book!
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SavedBooks;