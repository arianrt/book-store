import { Link } from "react-router-dom";

const Book = ({ book , deleteBook }) => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    return (
      <div
        className="w-[90%] md:w-[28%] mt-5 text-center p-2 bg-gray-800 rounded-xl"
        dir="rtl"
      >
        <img className="rounded-md" src={book.photo} alt={book.bookname} />
        <h2 className="text-white text-xl mt-3 flex justify-between">
          نام کتاب : <span>{book.bookname}</span>
        </h2>
        <h3 className="text-white mt-3 flex justify-between">
          قیمت : <span>{book.price}</span>
        </h3>
        <div className="flex justify-evenly items-center p-2 mt-2">
          {!isLoggedIn && (
            <Link
              to={`/books/${book.id}`}
              className="p-1.5 rounded-md transition duration-200 hover:scale-105 bg-yellow-500 flex items-center justify-center"
            > مشخصات کتاب 
              <i className="fa fa-eye mr-4"></i>
            </Link>
          )}
          {isLoggedIn && (
            <>
              <Link
                to={`/books/edit/${book.id}`}
                className="p-1.5 rounded-md transition duration-200 hover:scale-110 bg-green-500 flex items-center justify-center"
              >
                <i className="fa fa-pen"></i>
              </Link>
              <Link
                to={`/books/${book.id}`}
                className="p-1.5 rounded-md transition duration-200 hover:scale-110 bg-yellow-500 flex items-center justify-center"
              >
                <i className="fa fa-eye"></i>
              </Link>
              <button
                onClick={deleteBook}
                type="button"
                className="p-1.5 rounded-md transition duration-200 hover:scale-110 bg-red-500 flex items-center justify-center"
              >
                <i className="fa fa-trash"></i>
              </button>
            </>
          )}
        </div>
      </div>
    );

}

export default Book;