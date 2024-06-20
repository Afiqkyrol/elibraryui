"use client";

import { useEffect, useState } from "react";
import AdminLeftSideBar from "../component/AdminLeftSideBar";
import Loading from "@/app/elibrary_ui/loading";
import { fetchMonoTypeList } from "@/api/admin/getApi";
import MonoTypeTable from "../component/MonoTypeTable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ShowMonoTypeList() {
  const [isLoading, setIsLoading] = useState(true);
  const [monographTypeList, setMonographTypeList] = useState([]);

  useEffect(() => {
    async function getMonographType() {
      setMonographTypeList(await fetchMonoTypeList());
      if (localStorage.getItem("toast-message")) {
        const toastMessage = localStorage.getItem("toast-message");
        toast.success(toastMessage);
        localStorage.removeItem("toast-message");
      }
    }

    getMonographType();
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
      <div className="flex-1 flex flex-col">
        <div className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center">
          <p className="items-start w-1/2 text-left">
            {localStorage.getItem("fullname")}
          </p>
          <p className="items-start w-1/2 text-center">Monograph Type</p>
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
            <MonoTypeTable data={monographTypeList} />
          </center>
        </div>
      </div>
    </div>
  );
}
