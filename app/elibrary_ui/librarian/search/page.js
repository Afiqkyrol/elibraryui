"use client";

import Loading from "@/app/elibrary_ui/loading";
import BookListTable from "../component/BookListTable";
import LibrarianLeftSideBar from "@/app/elibrary_ui/component/LibrarianLeftSideBar";
import { useEffect, useState } from "react";
import { fetchBookList } from "@/api/librarian/getApi";
import { fetchSearchBookResults } from "@/api/librarian/postApi";

export default function ShowSearchList() {
  const [bookList, setBookList] = useState([]);
  const [completeBookList, setCompleteBookList] = useState([]);
  const [monoType, setMonoType] = useState("book");
  const [category, setCategory] = useState("title");
  const [title, setTitle] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getBookList() {
      setBookList(await fetchBookList());
    }

    getBookList();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    function assignData() {
      for (let i = 0; i < bookList.length; i++) {
        if (
          bookList[i] &&
          bookList[i].catalog &&
          bookList[i].catalog.length > 0
        ) {
          for (let j = 0; j < bookList[i].catalog.length; j++) {
            if (bookList[i].catalog[j].catreg_tag == 14) {
              bookList[i].monograph.reg_publisher_id =
                bookList[i].catalog[j].catreg_data;
            }
            if (bookList[i].catalog[j].catreg_tag == 11) {
              bookList[i].monograph.reg_author_id =
                bookList[i].catalog[j].catreg_data;
            }
            if (bookList[i].catalog[j].catreg_tag == 21) {
              bookList[i].monograph.reg_type =
                bookList[i].catalog[j].catreg_data;
            }
          }
        }
      }
      setCompleteBookList(bookList);
    }

    assignData();
  }, [bookList]);

  async function resetFilterHandler() {
    setIsLoading(true);
    setBookList(await fetchBookList());
    setIsLoading(false);
  }

  async function searchHandler(e) {
    // setIsLoading(true);
    e.preventDefault();
    setBookList(await fetchSearchBookResults(category, title, monoType));
    setIsLoading(false);
  }

  function logoutHandler() {
    setIsLoading(true);
    localStorage.clear();
    window.close();
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex h-screen">
      <LibrarianLeftSideBar />
      <div className="flex-1 flex flex-col overflow-y-hidden">
        <div className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center">
          <p className="items-start w-1/2 text-left">
            {localStorage.getItem("fullname")}
          </p>
          <p className="items-start w-1/2 text-center">Search Books</p>
          <button
            className="text-white hover:text-gray-400 w-1/2 text-right"
            onClick={logoutHandler}
          >
            Logout
          </button>
        </div>
        <br></br>
        <form
          className="flex items-center justify-center space-x-4"
          onSubmit={searchHandler}
        >
          <div>
            <input
              type="radio"
              id="title"
              name="monoType"
              value="book"
              onChange={(e) => setMonoType(e.target.value)}
              defaultChecked
            />
            <label htmlFor="title">Book</label>
          </div>
          <div>
            <input
              type="radio"
              id="author"
              name="monoType"
              value="article"
              onChange={(e) => setMonoType(e.target.value)}
            />
            <label htmlFor="author">Article</label>
          </div>
          <div>
            <input
              type="radio"
              id="category"
              name="monoType"
              value="magazine"
              onChange={(e) => setMonoType(e.target.value)}
            />
            <label htmlFor="category">Magazine</label>
          </div>
          <div>
            <input
              type="radio"
              id="category"
              name="monoType"
              value="av"
              onChange={(e) => setMonoType(e.target.value)}
            />
            <label htmlFor="category">AV</label>
          </div>
          <select
            name="category"
            id="category"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="title">Title</option>
            <option value="book_id">Book Id</option>
            <option value="author">Author</option>
            <option value="publisher">Publisher</option>
          </select>
          <input
            name="title"
            type="text"
            placeholder="Search here..."
            className="border border-gray-400 rounded py-2 px-4"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Search
          </button>
          <button
            className="bg-yellow-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={resetFilterHandler}
          >
            Clear
          </button>
        </form>

        <div className="overflow-y-auto">
          <center>
            <br></br>
            <h1 className="text-3xl font-bold mb-4 text-center">Books List</h1>

            <BookListTable data={completeBookList} role="patron" />
          </center>
        </div>
      </div>
    </div>
  );
}
