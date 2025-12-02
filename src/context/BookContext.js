import { createContext } from "react";

export const BookContext = createContext({
    loading: (false),
    setLoading: () => {},
    book: {},
    setBooks: () => {},
    setFilteredBooks: () => {},
    books: [],
    filteredBooks: [],
    bookQuery: {},
    groups: [],
    // onBookChange: () => {},
    deleteBook: () => {},
    updateBook: () => {},
    createBook: () => {},
    bookSearch: () => {},
})
