"use client";

import LibrarianLeftSideBar from "@/app/component/LibrarianLeftSideBar";
import Loading from "@/app/loading";
import { useEffect, useState } from "react";
import BorrowedListTable from "../component/BorrowedListTable";
import { fetchExtendApplicationList } from "@/api/librarian/getApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function showExtendApplicationListPage() {
  const [ExtendApplicationList, setExtendApplicationList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getExtendApplicationList() {
      setExtendApplicationList(await fetchExtendApplicationList());
      if (localStorage.getItem("toast-message")) {
        const toastMessage = localStorage.getItem("toast-message");
        toast.success(toastMessage);
        localStorage.removeItem("toast-message");
      }
    }

    getExtendApplicationList();
    setIsLoading(false);
  }, []);

  function logoutHandler() {
    setIsLoading(true);
    localStorage.clear();
    window.location.href = "/login";
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex h-screen">
      <LibrarianLeftSideBar />
      <ToastContainer />
      <div className="flex-1 flex flex-col">
        <div className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center">
          <p className="items-start w-1/2 text-left">
            {localStorage.getItem("fullname")}
          </p>
          <p className="items-start w-1/2 text-center">Extend Application</p>
          <button
            className="text-white hover:text-gray-400 w-1/2 text-right"
            onClick={logoutHandler}
          >
            Logout
          </button>
        </div>
        <div>
          <center>
            <br></br>
            <BorrowedListTable data={ExtendApplicationList} />
          </center>
        </div>
      </div>
    </div>
  );
}
