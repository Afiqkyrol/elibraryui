"use client";

import { useEffect, useState } from "react";
import Loading from "../loading";
import LibrarianLeftSideBar from "../component/LibrarianLeftSideBar";
import { fetchReservationList } from "@/api/librarianAPI";
import { fetchExtendApplicationList } from "@/api/librarian/getApi";
import Link from "next/link";

export default function LibrarianDashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [reservationList, setReservationList] = useState([]);
  const [extendApplicationList, setExtendApplicationList] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("auth-token")) {
      window.close();
      return;
    }

    async function getData() {
      setReservationList(await fetchReservationList());
      setExtendApplicationList(await fetchExtendApplicationList());
    }

    getData();
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
    <div className="flex h-screen">
      <LibrarianLeftSideBar />
      <div className="flex-1 flex flex-col">
        <div className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center">
          <p className="items-start w-1/2 text-left">
            {localStorage.getItem("fullname")}
          </p>
          <p className="items-start w-1/2 text-center">Dashboard</p>
          <button
            class="text-white hover:text-gray-400 w-1/2 text-right"
            onClick={logoutHandler}
          >
            Logout
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/elibrary_ui/librarian/reservation">
              <div className="rounded-lg shadow-md p-6 cursor-pointer bg-green-300">
                <h2 className="text-lg font-semibold mb-2">
                  {reservationList.length}
                </h2>
                <p>Total Reservation</p>
              </div>
            </Link>
            <Link href="/elibrary_ui/librarian/extend">
              <div className="rounded-lg shadow-md p-6 cursor-pointer bg-blue-300">
                <h2 className="text-lg font-semibold mb-2">
                  {extendApplicationList.length}
                </h2>
                <p>Total Extend Application</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
