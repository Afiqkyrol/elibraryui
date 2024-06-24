"use client";

import { fetchBookList } from "@/api/librarian/getApi";
import LibrarianLeftSideBar from "@/app/elibrary_ui/component/LibrarianLeftSideBar";
import Loading from "@/app/elibrary_ui/loading";
import { useEffect, useState } from "react";
import MonographListTable from "../component/MonographListTable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ShowMonographListPage() {
  const [monographList, setMonographList] = useState([]);
  const [completeMonographList, setCompleteMonographList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getMonographList() {
      setMonographList(await fetchBookList());
      if (localStorage.getItem("toast-message")) {
        const toastMessage = localStorage.getItem("toast-message");
        toast.success(toastMessage);
        localStorage.removeItem("toast-message");
      }
    }

    getMonographList();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    function assignData() {
      for (let i = 0; i < monographList.length; i++) {
        if (
          monographList[i] &&
          monographList[i].catalog &&
          monographList[i].catalog.length > 0
        ) {
          for (let j = 0; j < monographList[i].catalog.length; j++) {
            if (monographList[i].catalog[j].catreg_tag == 14) {
              monographList[i].monograph.reg_publisher_id =
                monographList[i].catalog[j].catreg_data;
            }
            if (monographList[i].catalog[j].catreg_tag == 11) {
              monographList[i].monograph.reg_author_id =
                monographList[i].catalog[j].catreg_data;
            }
            if (monographList[i].catalog[j].catreg_tag == 21) {
              monographList[i].monograph.reg_type =
                monographList[i].catalog[j].catreg_data;
            }
          }
        }
      }
      setCompleteMonographList(monographList);
    }

    assignData();
  }, [monographList]);

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
      <LibrarianLeftSideBar />
      <ToastContainer />
      <div className="flex-1 flex flex-col overflow-y-hidden">
        <div className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center">
          <p className="items-start w-1/2 text-left">
            {localStorage.getItem("fullname")}
          </p>
          <p className="items-start w-1/2 text-center">Monograph</p>
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
            <MonographListTable data={completeMonographList} />
          </center>
        </div>
      </div>
    </div>
  );
}
