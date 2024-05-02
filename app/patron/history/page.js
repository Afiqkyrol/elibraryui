"use client";

import HistoryListTable from "@/app/component/table/HistoryListTable";
import { useEffect, useState } from "react";
import Loading from "@/app/loading";
import PatronLeftSideBar from "@/app/component/PatronLeftSideBar";
import { fetchHistoryList } from "@/api/patron/getApi";

export default function showHistoryList() {
  const [historyList, setHistoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getHistoryList() {
      setHistoryList(await fetchHistoryList());
    }

    getHistoryList();
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
      <PatronLeftSideBar />
      <div className="flex-1 flex flex-col">
        <div className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center">
          <p className="items-start w-1/2 text-left">
            {localStorage.getItem("fullname")}
          </p>
          <p className="items-start w-1/2 text-center">History</p>
          <button
            class="text-white hover:text-gray-400 w-1/2 text-right"
            onClick={logoutHandler}
          >
            Logout
          </button>
        </div>
        <div>
          <center>
            <br></br>
            <h1 className="text-3xl font-bold mb-4 text-center">History</h1>
            <HistoryListTable data={historyList} />
          </center>
        </div>
      </div>
    </div>
  );
}
