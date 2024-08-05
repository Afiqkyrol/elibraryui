"use client";

import { fetchBookList, fetchEBookList } from "@/api/librarian/getApi";
import LibrarianLeftSideBar from "@/app/elibrary_ui/component/LibrarianLeftSideBar";
import Loading from "@/app/elibrary_ui/loading";
import { useEffect, useState } from "react";
import MonographListTable from "../component/MonographListTable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EbookListTable from "../component/EbookListTable";

export default function EbookListPage() {
  const [ebookList, setEbookList] = useState([]);
  const [completeEbookList, setCompleteEbookList] = useState([]);
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
