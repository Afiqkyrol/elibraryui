"use client";

import { useEffect, useState } from "react";
import AdminLeftSideBar from "../component/AdminLeftSideBar";
import Loading from "@/app/loading";
import { fetchMonoBookStatusList } from "@/api/admin/getApi";
import MonoBookStsTable from "../component/MonoBookStsTable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ShowMonoBookStsList() {
  const [isLoading, setIsLoading] = useState(true);
  const [monographBookStsList, setMonographBookStsList] = useState([]);

  useEffect(() => {
    async function getMonographBookSts() {
      setMonographBookStsList(await fetchMonoBookStatusList());
      if (localStorage.getItem("toast-message")) {
        const toastMessage = localStorage.getItem("toast-message");
        toast.success(toastMessage);
        localStorage.removeItem("toast-message");
      }
    }

    getMonographBookSts();
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
      <AdminLeftSideBar />
      <ToastContainer />
      <div className="flex-1 flex flex-col">
        <div className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center">
          <p className="items-start w-1/2 text-left">
            {localStorage.getItem("fullname")}
          </p>
          <p className="items-start w-1/2 text-center">Monograph Book Status</p>
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
            <MonoBookStsTable data={monographBookStsList} />
          </center>
        </div>
      </div>
    </div>
  );
}
