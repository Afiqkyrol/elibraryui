"use client";

import Loading from "@/app/elibrary_ui/loading";
import LibrarianLeftSideBar from "@/app/elibrary_ui/component/LibrarianLeftSideBar";
import { useEffect, useState } from "react";
import { fetchEBookList } from "@/api/librarian/getApi";
import EbookSearchListTable from "../component/EbookSearchListTable";
import { fetchSearchEBookResults } from "@/api/librarian/postApi";

export default function ShowSearchList() {
  const [bookList, setBookList] = useState([]);
  const [completeBookList, setCompleteBookList] = useState([]);
  const [monoType, setMonoType] = useState("book");
  const [category, setCategory] = useState("title");
  const [title, setTitle] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getBookList() {
      setBookList(await fetchEBookList());
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
    setBookList(await fetchEBookList());
    setIsLoading(false);
  }

  async function searchHandler(e) {
    // setIsLoading(true);
    e.preventDefault();
    console.log(category);
    console.log(title);
    setBookList(await fetchSearchEBookResults(category, title));
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
          <select
            name="category"
            id="category"
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
            onClick={resetFilterHandler}
          >
            Clear
          </button>
        </form>

        <div className="overflow-y-auto">
          <center>
            <br></br>

            <EbookSearchListTable data={completeBookList} role="patron" />
          </center>
        </div>
      </div>
    </div>
  );
}
