"use client";

import Loading from "@/app/elibrary_ui/loading";
import LibrarianLeftSideBar from "@/app/elibrary_ui/component/LibrarianLeftSideBar";
import { useEffect, useState } from "react";
import { fetchBookListV2 } from "@/api/librarian/getApi";
import BookListTableV2 from "../../component/BookListTableV2";
import { fetchSearchBookResultsV2 } from "@/api/librarian/postApi";

export default function ShowSearchList() {
  const [bookList, setBookList] = useState([]);
  const [category, setCategory] = useState("title");
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getBookList() {
      setBookList(await fetchBookListV2());
    }

    getBookList();
    setIsLoading(false);
  }, []);

  function logoutHandler() {
    setIsLoading(true);
    localStorage.clear();
    window.close();
  }

  if (isLoading) {
    return <Loading />;
  }

  async function submitHandler(e) {
    e.preventDefault();
    setBookList(await fetchSearchBookResultsV2(category, title));
  }

  async function resetHandler() {
    setIsLoading(true);
    setBookList(await fetchBookListV2());
    setTitle("");
    setCategory("title");
    setIsLoading(false);
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
        <div className="overflow-y-auto">
          <center>
            <br></br>
            <form
              className="flex items-center justify-center space-x-4"
              onSubmit={submitHandler}
            >
              <select
                name="category"
                id="category"
                required
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="title">Title</option>
                <option value="accession_no">Accession No</option>
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
                onClick={resetHandler}
              >
                Clear
              </button>
            </form>
            <br></br>
            <BookListTableV2 data={bookList} />
          </center>
        </div>
      </div>
    </div>
  );
}
