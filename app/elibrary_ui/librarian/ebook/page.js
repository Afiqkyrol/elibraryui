"use client";

import { fetchEBookList } from "@/api/librarian/getApi";
import LibrarianLeftSideBar from "@/app/elibrary_ui/component/LibrarianLeftSideBar";
import Loading from "@/app/elibrary_ui/loading";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EbookListTable from "../component/EbookListTable";
import {
  fetchSearchEBookResults,
  fetchSearchEbookResultsV2,
} from "@/api/librarian/postApi";

export default function EbookListPage() {
  const [ebookList, setEbookList] = useState([]);
  const [completeEbookList, setCompleteEbookList] = useState([]);
  const [category, setCategory] = useState("title");
  const [title, setTitle] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getEbookList() {
      setEbookList(await fetchEBookList());
      if (localStorage.getItem("toast-message")) {
        const toastMessage = localStorage.getItem("toast-message");
        toast.success(toastMessage);
        localStorage.removeItem("toast-message");
      }
    }

    getEbookList();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    function assignData() {
      for (let i = 0; i < ebookList.length; i++) {
        if (
          ebookList[i] &&
          ebookList[i].catalog &&
          ebookList[i].catalog.length > 0
        ) {
          for (let j = 0; j < ebookList[i].catalog.length; j++) {
            if (ebookList[i].catalog[j].catreg_tag == 14) {
              ebookList[i].monograph.reg_publisher_id =
                ebookList[i].catalog[j].catreg_data;
            }
            if (ebookList[i].catalog[j].catreg_tag == 11) {
              ebookList[i].monograph.reg_author_id =
                ebookList[i].catalog[j].catreg_data;
            }
            if (ebookList[i].catalog[j].catreg_tag == 21) {
              ebookList[i].monograph.reg_type =
                ebookList[i].catalog[j].catreg_data;
            }
          }
        }
      }
      setCompleteEbookList(ebookList);
    }

    assignData();
  }, [ebookList]);

  function logoutHandler() {
    setIsLoading(true);
    localStorage.clear();
    window.close();
  }

  if (isLoading) {
    return <Loading />;
  }

  async function resetFilterHandler() {
    setIsLoading(true);
    setEbookList(await fetchEBookList());
    setIsLoading(false);
  }

  async function searchHandler(e) {
    // setIsLoading(true);
    e.preventDefault();
    console.log(category);
    console.log(title);
    setEbookList(await fetchSearchEBookResults(category, title));
    console.log(ebookList);
    setIsLoading(false);
  }

  return (
    <div className="flex h-screen">
      <LibrarianLeftSideBar />
      <ToastContainer />
      <div className="flex-1 flex flex-col overflow-y-hidden">
        <div className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center">
          <p className="items-start w-1/2 text-left">
            {localStorage.getItem("fullname")}
          </p>
          <p className="items-start w-1/2 text-center">E-book</p>
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
            <EbookListTable data={completeEbookList} />
          </center>
        </div>
      </div>
    </div>
  );
}
