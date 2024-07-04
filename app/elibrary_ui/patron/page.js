"use client";

import { useEffect, useState } from "react";
import Loading from "@/app/elibrary_ui/loading";
import PatronLeftSideBar from "../component/PatronLeftSideBar";
import {
  fetchBorrowedList,
  fetchRegFeatured,
  fetchReservationList,
} from "@/api/patron/getApi";
import FeaturedDisplay from "./component/FeaturedDisplay";
import Link from "next/link";

const PatronDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [regFeatured, setRegFeatured] = useState([]);
  const [borrowed, setBorrowed] = useState([]);
  const [reserved, setReserved] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("auth-token")) {
      window.close();
      return;
    }

    async function getData() {
      setRegFeatured(await fetchRegFeatured());
      setReserved(await fetchReservationList());
      setBorrowed(await fetchBorrowedList());
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
      <PatronLeftSideBar />
      <div className="flex-1 flex flex-col">
        <div className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center">
          <p className="items-start w-1/2 text-left">
            {localStorage.getItem("fullname")}
          </p>
          <p className="items-start w-1/2 text-center">Dashboard</p>
          <button
            className="text-white hover:text-gray-400 w-1/2 text-right"
            onClick={logoutHandler}
          >
            Logout
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/elibrary_ui/patron/reservation">
              <div className="bg-white rounded-lg shadow-md p-6 cursor-pointer">
                <h2 className="text-lg font-semibold mb-2">
                  {reserved.length}
                </h2>
                <p>Total Reservation</p>
              </div>
            </Link>

            <Link href="/elibrary_ui/patron/borrowed">
              <div className="bg-white rounded-lg shadow-md p-6 cursor-pointer">
                <h2 className="text-lg font-semibold mb-2">
                  {borrowed.length}
                </h2>
                <p>Total Borrowed</p>
              </div>
            </Link>
          </div>
          <br></br>
          <h1 className="text-lg font-semibold mb-2">Featured Books</h1>
          <FeaturedDisplay data={regFeatured} />
        </div>
      </div>
    </div>
  );
};

export default PatronDashboard;
