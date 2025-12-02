import { BookSearch } from './';

import { Link , useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    return (
      <nav className="fixed w-full !z-60 top-0 start-0 bg-sky-900">
        <div className="w-full flex flex-wrap items-center justify-center p-3 mx-auto text-base">
          <div
            className="flex md:order-2 rtl:space-x-reverse max-md:w-full max-md:justify-between pb-0 md:w-[25%]"
            dir="rtl"
          >
            {location.pathname === "/books" ? <BookSearch /> : null}
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-400 z-60"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className="items-center justify-center hidden w-[50%] md:flex md:order-1 p-0"
            id="navbar-sticky"
          >
            <ul
              className="flex md:w-[50%] justify-evenly items-center flex-col p-4 md:p-0 mt-4 font-medium rounded-lg rtl:space-x-reverse md:flex-row md:mt-0 max-sm:text-2xl max-sm:text-center text-xl"
              dir="rtl"
            >
              <li>
                <Link
                  to="/home"
                  className="text-center block text-white p-2 hover:text-sky-300 rounded-sm transition duration-300 max-sm:border-b-2 max-sm:border-sky-400"
                >
                  خانه
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-center block text-white p-2 hover:text-sky-300 rounded-sm transition duration-300 max-sm:border-b-2 max-sm:border-sky-400"
                >
                  درباره ما
                </Link>
              </li>
              <li>
                <Link
                  to="/books"
                  className="text-center block text-white p-2 hover:text-sky-300 rounded-sm transition max-sm:border-b-2 max-sm:border-sky-400 duration-300"
                >
                  کتاب ها
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-[25%] hidden md:block">
            {/* <Link to="/login" className="w-[50%] text-center transition-all duration-300 hover:bg-gray-800 bg-gray-700 block text-white p-2  rounded-sm ">
                        Login
            </Link> */}
            {!isLoggedIn && (
              <Link to="/login" className="w-[30%] text-white bg-green-500 hover:bg-green-600 rounded-lg text-md p-3 flex justify-center items-center duration-500 ">
                ورود
              </Link>
            )}
            {isLoggedIn && (
              <button
                onClick={() => {
                  localStorage.removeItem("isLoggedIn");
                  window.location.href = "/books";
                }}
                className="w-[30%] bg-red-500 px-3 py-1 rounded hover:bg-red-600 duration-400"
              >
                خروج
              </button>
            )}
          </div>
        </div>
      </nav>
    );
}

export default Navbar;