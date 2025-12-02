import axios from "axios";

const SERVER_URL = "http://localhost:9000";

// @desc Get All Books
// @route GET http://localhost:9000/books
export const getAllBooks = () => {
  const url = `${SERVER_URL}/books`;
  return axios.get(url);
};

// @desc Get Book With Book ID
// @route GET http://localhost:9000/books/:bookId
export const getBook = (bookId) => {
  const url = `${SERVER_URL}/books/${bookId}`;
  return axios.get(url);
};

// @desc  Create New Book
// @route POST http://localhost:9000/books
export const createBook = (book) => {
  const url = `${SERVER_URL}/books`;
  return axios.post(url, book);
};

// @desc  Update Book
// @route PUT http://localhost:9000/books/:bookId
export const updateBook = (book, bookId) => {
  const url = `${SERVER_URL}/books/${bookId}`;
  return axios.put(url, book);
};

// @desc  Delete Book
// @route DELETE http://localhost:9000/books/:bookId
export const deleteBook = (bookId) => {
  const url = `${SERVER_URL}/books/${bookId}`;
  return axios.delete(url);
};

// @desc  Get All Groups
// @route GET http://localhost:9000/groups
export const getAllGroups = () => {
  const url = `${SERVER_URL}/groups`;
  return axios.get(url);
};

// @desc  Get Group Name With Group ID
// @route GET http://localhost:9000/groups/:groupId
export const getGroup = (groupId) => {
  const url = `${SERVER_URL}/groups/${groupId}`;
  return axios.get(url);
};