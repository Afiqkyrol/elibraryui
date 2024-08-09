"use client";

import { fetchReturnList, fetchReturnListSearch } from "@/api/librarian/getApi";
import LibrarianLeftSideBar from "@/app/elibrary_ui/component/LibrarianLeftSideBar";
import Loading from "@/app/elibrary_ui/loading";
import { useEffect, useState } from "react";
import StatusBorrowedTable from "../component/StatusBorrowedTable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ShowReturnMonograpghListPage() {
  const [returnMonoList, setReturnMonoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [accessionNumber, setAccessionNumber] = useState("");

  useEffect(() => {
    async function getReturnMonoList() {
      setReturnMonoList(await fetchReturnList());
      if (localStorage.getItem("toast-message")) {
        const toastMessage = localStorage.getItem("toast-message");
        toast.success(toastMessage);
        localStorage.removeItem("toast-message");
      }
    }

    getReturnMonoList();
    setIsLoading(false);
  }, []);

  console.log(returnMonoList);

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
    setReturnMonoList(await fetchReturnListSearch(accessionNumber));
  }

  async function resetHandler() {
    setIsLoading(true);
    setReturnMonoList(await fetchReturnList());
    setAccessionNumber("");
    setIsLoading(false);
  }

  return (
    <div className="flex h-screen w-screen text-xs">
      <ToastContainer />

      <LibrarianLeftSideBar />
      <div className="relative flex flex-col w-5/6 items-center">
        <div className="absolute top-0 inset-x-0 bg-red-400">
          <div className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center">
            <div>{localStorage.getItem("fullname")}</div>
            <div>Borrowed Monograph</div>
            <button onClick={logoutHandler}>Logout</button>
          </div>
        </div>
        <div className="mt-20 w-full">
          <form
            className="flex items-center justify-center space-x-4"
            onSubmit={submitHandler}
          >
            <input
              name="accession_number"
              type="number"
              placeholder="Accession Number"
              className="border border-gray-400 rounded py-2 px-4"
              onChange={(e) => setAccessionNumber(e.target.value)}
              min={100}
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
          <StatusBorrowedTable data={returnMonoList} />
        </div>
      </div>
    </div>
  );
}
