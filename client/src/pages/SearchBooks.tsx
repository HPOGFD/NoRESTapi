import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SAVE_BOOK } from '../utils/mutations';
import Auth from '../utils/auth';

interface Book {
  bookId: string;
  authors: string[];
  title: string;
  description: string;
  image: string;
  link: string;
}

const SearchBooks = () => {
  const [searchedBooks, setSearchedBooks] = useState<Book[]>([]);
  const [searchInput, setSearchInput] = useState('');
  
  const [saveBook] = useMutation(SAVE_BOOK, {
    onError: (err) => console.error('Error saving book:', err)
  });

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${searchInput}`
      );
      const { items } = await response.json();

      const bookData = items.map((book: any) => ({
        bookId: book.id,
        authors: book.volumeInfo.authors || ['No author to display'],
        title: book.volumeInfo.title,
        description: book.volumeInfo.description || '',
        image: book.volumeInfo.imageLinks?.thumbnail || '',
        link: book.volumeInfo.infoLink || ''
      }));

      setSearchedBooks(bookData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };
 

  const handleSaveBook = async (bookId: string) => {
    const bookToSave = searchedBooks.find((book) => book.bookId === bookId);
    if (!bookToSave) {
      console.error('Book not found');
      return;
    }
  
    console.log("Book to save:", bookToSave); // Log the object before sending
  
    try {
      const { data } = await saveBook({
        variables: { bookInput: bookToSave } // Pass bookToSave as bookInput
      });
  
      if (!data) {
        throw new Error('Something went wrong!');
      }
  
      console.log('Book saved successfully:', data);
    } catch (err) {
      console.error('Error saving book:', err);
      alert('There was an error saving the book. Please try again.');
    }
  };
  
  
  

  return (
    <>
      <div className="text-light bg-dark p-5">
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Search for a book"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button type="submit">Submit Search</button>
        </form>
      </div>

      <div>
        <h2>
          {searchedBooks.length
            ? `Viewing ${searchedBooks.length} results:`
            : 'Search for a book to begin'}
        </h2>
        <div>
          {searchedBooks.map((book) => (
            <div key={book.bookId}>
              <img src={book.image} alt={`${book.title} book`} />
              <h3>{book.title}</h3>
              <p>Authors: {book.authors.join(', ')}</p>
              <p>{book.description}</p>
              {Auth.loggedIn() && (
                <button onClick={() => handleSaveBook(book.bookId)}>
                  Save this Book!
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchBooks;