"use client";

import { fetchReservationDetails } from "@/api/patron/getApi";
import LibrarianLeftSideBar from "@/app/elibrary_ui/component/LibrarianLeftSideBar";
import PatronLeftSideBar from "@/app/elibrary_ui/component/PatronLeftSideBar";
import Loading from "@/app/loading";
import { useEffect, useState } from "react";

export default function ShowReservationDetails({ params }) {
  const [reservation, setReservation] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getReservationDetails() {
      setReservation(await fetchReservationDetails(params.reservationId));
    }

    getReservationDetails();
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

  console.log(reservation);
  return (
    <div className="flex h-screen">
      <PatronLeftSideBar />
      <div className="flex-1 flex flex-col">
        <div className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center">
          <p className="items-start w-1/2 text-left">
            {localStorage.getItem("fullname")}
          </p>
          <p className="items-start w-1/2 text-center">Reservation</p>
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
            <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 py-6">
              <h2 className="text-xl font-semibold mb-4">
                Reservation Details
              </h2>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Book ID:
                </label>
                <p className="text-gray-700">{reservation.book_id}</p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Book Title:
                </label>
                <p className="text-gray-700">{reservation.book_title}</p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Name:
                </label>
                <p className="text-gray-700">{reservation.user_name}</p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Current Status:
                </label>
                <p className="text-gray-700">{reservation.status}</p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Remarks:
                </label>
                <p className="text-gray-700">{reservation.booking_remarks}</p>
              </div>
            </div>
          </center>
        </div>
      </div>
    </div>
  );
}
