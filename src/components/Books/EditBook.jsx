import { useState, useEffect, useContext } from "react";
import { BookContext } from "../../context/BookContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getBook, updateBook } from "../../services/bookService";
import { Spinner } from "../";

import { Formik, Field, Form, ErrorMessage } from "formik";
import { bookSchema } from "../../validations/bookValidation";

import toast, { Toaster } from 'react-hot-toast';

const EditBook = () => {

  const { bookId } = useParams();
  const { loading, setLoading, groups, books, setBooks, setFilteredBooks } = useContext(BookContext);

  const navigate = useNavigate();

  const [book, setBook] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: bookData } = await getBook(bookId);

        setLoading(false);
        setBook(bookData);

      } catch (err) {
        console.log(err);
        setLoading(false)
      }
    };

    fetchData();
  }, []);

  const submitForm = async (values) => {
    try {
      setLoading(true);

      const { data, status } = await updateBook(values, bookId);

      if (status === 200) {
        toast.success('کتاب با موفقیت ویرایش شد', {
          duration: 4000,
          style: {
            padding: '20px',
            cursor: 'pointer',
          },
        });
        setLoading(false);

        const allBooks = [...books];
        const bookIndex = allBooks.findIndex((c) => c.id === parseInt(bookId));
        allBooks[bookIndex] = { ...data };

        setBooks(allBooks);
        setFilteredBooks(allBooks);

        navigate("/books");
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className="p-5 mt-[10vh]">
            <h2 className="p-4 border-b text-center text-2xl text-white border-sky-900">
              ویرایش کتاب
            </h2>
            <div className="flex justify-center">
              <div className="w-[25%] p-5">
                <img
                  src={book.photo}
                  className="w-[100%] rounded"
                />
              </div>
              <div className="w-[35%] p-5" dir="rtl">
                <Formik
                  initialValues={book}
                  validationSchema={bookSchema}
                  onSubmit={(values) => {
                    submitForm(values);
                  }}
                >
                  <Form>
                    <div className="mb-2">
                      <Field name="bookname" type="text" placeholder="نام کتاب"
                        className="bg-zinc-700 text-white text-sm rounded-lg block w-full p-4 mt-2"
                      />
                      <ErrorMessage name="bookname" render={(msg) => (
                        <div className="text-red-600 p-1 text-sm text-center">{msg}</div>
                      )} />
                    </div>

                    <div className="mb-2">
                      <Field name="price" type="text" placeholder="قیمت"
                        className="bg-zinc-700 text-white text-sm rounded-lg block w-full p-4 mt-2"
                      />
                      <ErrorMessage name="price" render={(msg) => (
                        <div className="text-red-600 p-1 text-sm text-center">{msg}</div>
                      )} />
                    </div>

                    <div className="mb-2">
                      <Field name="photo" type="text" placeholder="آدرس عکس"
                        className="bg-zinc-700 text-white text-sm rounded-lg block w-full p-4 mt-2"
                      />
                      <ErrorMessage name="photo" render={(msg) => (
                        <div className="text-red-600 p-1 text-sm text-center">{msg}</div>
                      )} />
                    </div>

                    <div className="mb-2">
                      <Field name="group" as="select"
                        className="bg-zinc-700 text-white text-sm rounded-lg block w-full p-3 mt-2"
                      >
                        {groups.length > 0 && groups.map((group) => (
                          <option key={group.id} value={group.id}>
                            {group.name}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage name="group" render={(msg) => (
                        <div className="text-red-600 p-1 text-sm text-center">{msg}</div>
                      )} />
                    </div>

                    <div className="flex justify-between">
                      <button type="submit" className="text-white focus:outline-none rounded-lg p-4 text-center mt-4 bg-green-500">
                        ویرایش کتاب
                      </button>
                      <Link to={"/books"} className="text-white focus:outline-none rounded-lg p-4 text-center mt-4 bg-red-500">
                        انصراف
                      </Link>
                    </div>
                  </Form>
                </Formik>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default EditBook;
