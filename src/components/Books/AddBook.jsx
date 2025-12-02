import { Link } from "react-router-dom";
import { useContext } from "react";
import { BookContext } from "../../context/BookContext";
import { Spinner } from "../";

import { useFormik } from "formik";
import { bookSchema } from "../../validations/bookValidation";

const AddBook = () => {
  const { loading , groups , createBook } = useContext(BookContext);

  const formik = useFormik({
    initialValues: {
      bookname: "",
      price: "",
      photo: "",
      group: "",
    },
    validationSchema : bookSchema,
    onSubmit : values => {
      createBook(values);
    }
  });

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className="p-5 mt-[10vh]">
            <h2 className="p-4 border-b text-center text-2xl text-white border-sky-900">
              اضافه کردن کتاب جدید
            </h2>
            <div className="flex justify-center">
              <form className="w-[100%] md:w-[30%] p-5" dir="rtl" onSubmit={formik.handleSubmit}>

                <input className="bg-zinc-700 text-white text-sm rounded-lg block w-full p-4 mt-2"
                id="bookname"
                type="text" 
                name="bookname" 
                value={formik.values.bookname}
                onChange={formik.handleChange}
                placeholder="نام کتاب"
                onBlur={formik.handleBlur}>
                </input>
                {formik.touched.bookname && formik.errors.bookname ? (
                  <div className="text-red-600 p-1 text-sm text-center">{formik.errors.bookname}</div>
                ) : null}

                <input className="bg-zinc-700 text-white text-sm rounded-lg block w-full p-4 mt-2"
                id="price"
                type="text" 
                name="price" 
                value={formik.values.price}
                onChange={formik.handleChange}
                placeholder="قیمت کتاب"
                onBlur={formik.handleBlur}>
                </input>
                {formik.touched.price && formik.errors.price ? (
                  <div className="text-red-600 p-1 text-sm text-center">{formik.errors.price}</div>
                ) : null}

                <input className="bg-zinc-700 text-white text-sm rounded-lg block w-full p-4 mt-2"
                id="photo"
                type="text" 
                name="photo" 
                value={formik.values.photo}
                onChange={formik.handleChange}
                placeholder="آدرس عکس"
                onBlur={formik.handleBlur}>
                </input>
                {formik.touched.photo && formik.errors.photo ? (
                  <div className="text-red-600 p-1 text-sm text-center">{formik.errors.photo}</div>
                ) : null}

                <select id="group" className="bg-zinc-700 text-white text-sm rounded-lg block w-full p-2.5 mt-2"
                  name="group" 
                  value={formik.values.group}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}>
                    
                    {groups.length > 0 && groups.map((group) => (
                      <option key={group.id} value={group.id}>
                        {group.name}
                      </option>
                    ))}
                </select>
                {formik.touched.group && formik.errors.group ? (
                  <div className="text-red-600 p-1 text-sm text-center">{formik.errors.group}</div>
                ) : null}
                
                <div className="flex justify-between">
                  <button type="submit" className="text-white focus:outline-none rounded-lg p-4 text-center mt-4 bg-green-500">
                  اضافه کردن
                  </button>
                  <Link to={"/books"} className="text-white focus:outline-none rounded-lg p-4 text-center mt-4 bg-red-500">
                    انصراف
                  </Link>
                </div>
              </form>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default AddBook;
