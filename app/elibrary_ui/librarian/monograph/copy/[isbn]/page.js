"use client";

import Loading from "@/app/elibrary_ui/loading";
import LibrarianLeftSideBar from "@/app/elibrary_ui/component/LibrarianLeftSideBar";
import { useEffect, useState } from "react";
import { fetchBookCopyListV2 } from "@/api/librarian/getApi";
import CopyListTableV2 from "../../../component/CopyListTableV2";

export default function ShowCopyList({ params }) {
  const [bookList, setBookList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getBookList() {
      setBookList(await fetchBookCopyListV2(params.isbn));
    }

    getBookList();
    setIsLoading(false);
  }, []);

  console.log(bookList);

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
          <p className="items-start w-1/2 text-center">Copy List</p>
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
            <h1 className="text-3xl font-bold mb-4 text-center">Copy List</h1>
            <CopyListTableV2 data={bookList} isbn={params.isbn} />
          </center>
        </div>
      </div>
    </div>
  );
}
