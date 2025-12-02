import { useState, useEffect , useContext } from "react";
import { BookContext } from "../../context/BookContext";
import { Link, useParams } from "react-router-dom";

import { getBook, getGroup } from "../../services/bookService";
import { Spinner } from "../";

const ViewBook = () => {
  const { bookId } = useParams();
  const [state, setState] = useState({  book: {} , group: {} });

  const { loading , setLoading} = useContext(BookContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState({ ...state });
        setLoading(true)
        const { data: bookData } = await getBook(bookId);
        const { data: groupData } = await getGroup(bookData.group);

        setLoading(false)
        setState({
          ...state,
          book: bookData,
          group: groupData,
        });
      } catch (err) {
        console.log(err.message);
        setLoading(false)
      }
    };

    fetchData();
  }, []);

  const { book, group } = state;
  console.log(book);

  return (
    <>
      <section className="text-white text-center mt-[15vh] ">
        <h2 className="p-1 border-b border-sky-900 text-center text-2xl text-white">
          اطلاعات کتاب
        </h2>
      </section>

      {loading ? (
        <Spinner />
      ) : (
        <>
          {Object.keys(book).length > 0 && (
            <div className="w-[50%] ml-[25%] mt-5 flex flex-wrap justify-between text-center p-2 bg-gray-800 rounded-xl" dir="rtl">

              <div className="w-[50%]">
                <h2 className="text-white text-xl p-3 mt-3 flex justify-between border-b-2 border-sky-900">
                  نام کتاب : {" "}
                  <span>
                    {book.bookname}
                  </span>
                </h2>
                <h3 className="text-white text-xl p-3 mt-3 flex justify-between border-b-2 border-sky-900">
                  ژانر : {" "}
                  <span>
                    {group.name}
                  </span>
                </h3>
                <h3 className="text-white text-xl p-3 mt-3 flex justify-between border-b-2 border-sky-900">
                  قیمت : {" "}
                  <span>
                    {book.price}
                  </span>
                </h3>
              </div>
              <div className="w-[40%]">
                <img className="rounded-md" src={book.photo} alt={book.bookname} />
              </div>
              <div className="w-[100%] p-3 mt-5" dir="rtl">
                <Link to={"/books"} className="text-white rounded-lg p-3 text-center bg-red-500">
                  خروج
                </Link>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ViewBook;
