"use client";

import LibrarianLeftSideBar from "@/app/elibrary_ui/component/LibrarianLeftSideBar";
import Loading from "@/app/elibrary_ui/loading";
import { useEffect, useState } from "react";
import BorrowedListTable from "../component/BorrowedListTable";
import { fetchExtendApplicationList } from "@/api/librarian/getApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ShowExtendApplicationListPage() {
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
    window.close();
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex h-screen w-screen text-xs">
      <ToastContainer />

      <LibrarianLeftSideBar />
      <div className="relative flex flex-col w-5/6 items-center">
        <div className="absolute top-0 inset-x-0 bg-red-400">
          <div className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center">
            <div>{localStorage.getItem("fullname")}</div>
            <div>Extend Application</div>
            <button onClick={logoutHandler}>Logout</button>
          </div>
        </div>
        <div className="mt-20 w-full">
          <BorrowedListTable data={ExtendApplicationList} />
        </div>
      </div>
    </div>
  );
}
