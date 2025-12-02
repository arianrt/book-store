import { useContext } from "react";
import { BookContext } from "../../context/BookContext";

const BookSearch = () => {
    const { bookQuery , bookSearch} = useContext(BookContext);
    return (
        <div className="hidden md:flex">
            <div className="">
                <input 
                type="text" 
                id="search-navbar" 
                value={bookQuery.text}
                onChange={bookSearch}
                className="block w-full p-2 text-sm rounded-lg bg-gray-700 placeholder-gray-400 text-white hover:bg-gray-800 focus:bg-gray-800 duration-300" 
                placeholder="جست و جو کتاب" 
                dir="rtl" 
                />
            </div>
            <div className="flex items-center ps-1">
                <button type="button" data-collapse-toggle="navbar-search" aria-controls="navbar-search" aria-expanded="false" className="bg-gray-700 text-gray-400 hover:bg-gray-800 rounded-lg text-sm p-2 duration-300">
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                    <span className="sr-only">Search</span>
                </button>
            </div>
        </div>
    )
}

export default BookSearch;