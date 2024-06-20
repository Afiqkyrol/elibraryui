"use client";

import ReservationListTable from "@/app/elibrary_ui/component/table/ReservationListTable";
import { useEffect, useState } from "react";
import Loading from "@/app/elibrary_ui/loading";
import PatronLeftSideBar from "@/app/elibrary_ui/component/PatronLeftSideBar";
import { fetchReservationList } from "@/api/patron/getApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ShowReservationList() {
  const [reservationList, setReservationList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getReservationList() {
      setReservationList(await fetchReservationList());
      if (localStorage.getItem("toast-message")) {
        const toastMessage = localStorage.getItem("toast-message");
        toast.success(toastMessage);
        localStorage.removeItem("toast-message");
      }
    }

    getReservationList();
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
      <PatronLeftSideBar />
      <ToastContainer />
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
        <div>
          <center>
            <br></br>
            <h1 className="text-3xl font-bold mb-4 text-center">Reservation</h1>
            <ReservationListTable data={reservationList} />
          </center>
        </div>
      </div>
    </div>
  );
}
