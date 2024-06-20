"use client";

import { useEffect, useState } from "react";
import AdminLeftSideBar from "../component/AdminLeftSideBar";
import Loading from "@/app/elibrary_ui/loading";
import { fetchApprovedUserList } from "@/api/admin/getApi";
import ApprovedUserTable from "../component/ApprovedUserTable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ShowMonoLangList() {
  const [isLoading, setIsLoading] = useState(true);
  const [approvedUserList, setApprovedUserList] = useState([]);

  useEffect(() => {
    async function getApprovedUser() {
      setApprovedUserList(await fetchApprovedUserList());
      if (localStorage.getItem("toast-message")) {
        const toastMessage = localStorage.getItem("toast-message");
        toast.success(toastMessage);
        localStorage.removeItem("toast-message");
      }
    }

    getApprovedUser();
    setIsLoading(false);
  }, []);

  function logoutHandler() {
    setIsLoading(true);
    localStorage.clear();
    window.location.href = "/elibrary_ui/login";
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex h-screen">
      <AdminLeftSideBar />
      <ToastContainer />
      <div className="flex-1 flex flex-col overflow-x-hidden overflow-y-hidden">
        <div className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center">
          <p className="items-start w-1/2 text-left">
            {localStorage.getItem("fullname")}
          </p>
          <p className="items-start w-1/2 text-center">User</p>
          <button
            className="text-white hover:text-gray-400 w-1/2 text-right"
            onClick={logoutHandler}
          >
            Logout
          </button>
        </div>
        <div className="overflow-y-auto">
          <center>
            <br></br>
            <h3>Approved User</h3>
            <div>
              <ApprovedUserTable data={approvedUserList} />
            </div>
          </center>
        </div>
      </div>
    </div>
  );
}
