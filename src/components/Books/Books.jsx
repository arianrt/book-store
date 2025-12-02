import { Book, NotFound, Spinner } from "../";
import { useContext } from "react";
import { BookContext } from "../../context/BookContext";
import { Link } from "react-router-dom";

const Books = () => {
  const { loading, deleteBook, filteredBooks, groups } =
    useContext(BookContext);
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  return (
    <div className="w-[90%] ml-[5%] mt-[10vh] mb-[10vh] md:mt-[20vh] flex flex-wrap-reverse justify-between">
      {!isLoggedIn && (
        <div className="w-[80%] ml-[10%] max-md:mt-5 p-5 flex flex-wrap justify-evenly items-center rounded-md bg-sky-800">
          {loading ? (
            <Spinner />
          ) : (
            <>
              {filteredBooks.length > 0 ? (
                filteredBooks.map((b) => (
                  <Book
                    key={b.id}
                    book={b}
                    deleteBook={() => deleteBook(b.id, b.bookname)}
                    groups={groups}
                  />
                ))
              ) : (
                <NotFound />
              )}
            </>
          )}
        </div>
      )}
      {isLoggedIn && (
        <>
          <div className="w-[100%] md:w-[85%] max-md:mt-5 p-5 flex flex-wrap justify-evenly items-center rounded-md bg-sky-800">
            {loading ? (
              <Spinner />
            ) : (
              <>
                {filteredBooks.length > 0 ? (
                  filteredBooks.map((b) => (
                    <Book
                      key={b.id}
                      book={b}
                      deleteBook={() => deleteBook(b.id, b.bookname)}
                      groups={groups}
                    />
                  ))
                ) : (
                  <NotFound />
                )}
              </>
            )}
          </div>
          <div
            className="w-[60%] max-md:mr-[20%] md:w-[15%] rounded-md p-2 fixed max-md:top-auto max-md:bottom-2 top-[20vh] max-md:right-0 right-5"
            dir="rtl"
          >
            <Link
              to={"/books/add"}
              className="w-[100%] text-white bg-green-500 hover:bg-green-600 rounded-lg text-md p-3 flex justify-center items-center duration-300 "
            >
              اضافه کردن کتاب
              <i className="fa fa-plus mr-2"></i>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Books;
