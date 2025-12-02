import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Navbar, Books, AddBook, ViewBook, EditBook, NotFound , Login } from './components';
import { getAllBooks, createBook, getAllGroups, deleteBook } from "./services/bookService"
import { BookContext } from './context/BookContext';

import { confirmAlert } from 'react-confirm-alert';
import toast, { Toaster } from 'react-hot-toast';

import ProtectedRoute from "./ProtectedRoute";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [groups, setGroups] = useState([]);
  const [book, setBook] = useState({});

  // baraye search kardan
  const [bookQuery, setBookQuery] = useState({ text: "" });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // const { data : booksData} = await axios.get("http://localhost:9000/books");
        const { data: booksData } = await getAllBooks();
        const { data: groupsData } = await getAllGroups();

        setBooks(booksData);
        setGroups(groupsData);
        setFilteredBooks(booksData);

        setLoading(false);
      }
      catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const createBookForm = async (values) => {
    // preventDefault baraye jelogiri az refresh bad az click ro submit
    // event.preventDefault();
    try {
      setLoading((prevLoading) => !prevLoading);
      const { status, data } = await createBook(values);

      // status marboot be dorost boodan server
      if (status === 201) {
        toast.success('کتاب با موفقیت ساخته شد', {
          duration: 4000,
          style: {
            padding: '20px',
            cursor: 'pointer',
          },
        });
        const allBooks = [...books, data];

        setBooks(allBooks);
        setFilteredBooks(allBooks);

        // setBook({});
        setLoading((prevLoading) => !prevLoading);
        navigate("/books");
      }
    } catch (err) {
      console.log(err.message);
      setLoading((prevLoading) => !prevLoading);
    }
  };

  // const onBookChange = (event) => {

  //   harchi dar input type beshe yek event hast
  //   in name marboot be name dar input form
  //   spread operator baraye gereftan harchi dar book

  //   setBook({ ...book, [event.target.name]: event.target.value, });
  // };

  const confirmDelete = (bookId, bookBookname) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div dir="rtl" className="p-5 bg-sky-700 rounded-md border-2 border-sky-500" >
            <h1 className="text-white text-2xl" >
              پاک کردن کتاب
            </h1>
            <p className="text-gray-300 text-xl p-4" >
              مطمئنی که میخوای کتاب <span className='text-gray-200 font-extrabold' >
                {bookBookname}
              </span> رو پاک کنی ؟
            </p>
            <button className="bg-green-500 border-2 border-green-400 duration-300 hover:bg-green-600 p-3 mx-2 rounded-md"
              onClick={() => {
                removeBook(bookId);
                onClose();
                toast.error('کتاب با موفقیت حذف شد', {
                  duration: 4000,
                  style: {
                    padding: '20px',
                    cursor: 'pointer',
                  },
                });
              }} >
              مطمئن هستم
            </button>
            <button className="bg-red-500 border-2 border-red-400 duration-300 hover:bg-red-600 p-3 rounded-md"
              onClick={onClose} >
              انصراف
            </button>
          </div>
        );
      },
    });
  };

  const removeBook = async (BookId) => {
    const allBooks = [...books];
    try {
      const updatedBook = books.filter((b) => b.id !== BookId);
      setBooks(updatedBook);
      setFilteredBooks(updatedBook);

      // Sending delete request to server
      const { status } = await deleteBook(BookId);

      if (status !== 200) {
        setBooks(allBooks);
        setFilteredBooks(allBooks);
      }
    } catch (err) {
      console.log(err.message);
      setBooks(allBooks);
      setFilteredBooks(allBooks);
    }
  };

  const bookSearch = (event) => {
    setBookQuery({ ...bookQuery, text: event.target.value });

    const allBooks = books.filter((book) => {
      return book.bookname.toLowerCase().includes(event.target.value.toLowerCase());
    });

    setFilteredBooks(allBooks);
  };

  // let filteredTimeout;
  // const bookSearch = (query) => {
  //   clearTimeout(filteredTimeout);

  //   if (!query) return setFilteredBooks([...books]);

  //   filteredTimeout = setTimeout(() => {
  //     setFilteredBooks(books.filter((book) => {
  //       return book.bookname.toLowerCase().includes(query.toLowerCase());
  //     })
  //     );
  //   }, 1000);
  // };

  return (
    <BookContext.Provider
      value={{
        loading,
        setLoading,
        book,
        setBooks,
        setFilteredBooks,
        bookQuery,
        books,
        filteredBooks,
        groups,
        // onBookChange,
        deleteBook: confirmDelete,
        createBook: createBookForm,
        bookSearch,
      }}
    >
      <div className="">
        <Toaster
          position="top-right"
          reverseOrder={false}
          rtl={true}
        />
        <Navbar />
        <Routes>
          <Route path='/' element={<Navigate to="books" />} />
          <Route path="/login" element={<Login />} />
          <Route path='/books' element={ <Books /> } />
          <Route path='/books/add' element={ <ProtectedRoute> <AddBook /> </ProtectedRoute> } />
          <Route path='/books/:bookId' element={ <ViewBook /> } />
          <Route path='/books/edit/:bookId' element={ <ProtectedRoute> <EditBook /> </ProtectedRoute> } />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </BookContext.Provider>

  );
}

export default App;