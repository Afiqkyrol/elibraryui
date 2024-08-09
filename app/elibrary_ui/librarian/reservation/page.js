"use client";

import {
  fetchReservationList,
  fetchReservationListSearch,
} from "@/api/librarian/getApi";
import LibrarianLeftSideBar from "@/app/elibrary_ui/component/LibrarianLeftSideBar";
import Loading from "@/app/elibrary_ui/loading";
import { useEffect, useState } from "react";
import ReservationListTable from "../component/ReservationListTable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ShowReservationList() {
  const [reservationList, setReservationList] = useState([]);
  const [accessionNumber, setAccessionNumber] = useState("");
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
  console.log(reservationList);
  function logoutHandler() {
    setIsLoading(true);
    localStorage.clear();
    window.close();
  }

  if (isLoading) {
    return <Loading />;
  }

  async function submitHandler(e) {
    e.preventDefault();
    setReservationList(await fetchReservationListSearch(accessionNumber));
  }

  async function resetHandler() {
    setReservationList(await fetchReservationList());
    setAccessionNumber("");
  }

  return (
    <div className="flex h-screen w-screen text-xs">
      <ToastContainer />
      <LibrarianLeftSideBar />
      <div className="relative flex flex-col w-5/6 items-center">
        <div className="absolute top-0 inset-x-0 bg-red-400">
          <div className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center">
            <div>{localStorage.getItem("fullname")}</div>
            <div>Reservation</div>
            <button onClick={logoutHandler}>Logout</button>
          </div>
        </div>

        <div className="mt-20 w-full">
          <form
            className="flex items-center justify-center space-x-4"
            onSubmit={submitHandler}
          >
            <input
              name="accession_number"
              type="number"
              placeholder="Accession Number"
              className="border border-gray-400 rounded py-2 px-4"
              onChange={(e) => setAccessionNumber(e.target.value)}
              min={100}
              required
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Search
            </button>
            <button
              className="bg-yellow-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={resetHandler}
            >
              Clear
            </button>
          </form>
          <br></br>
          <ReservationListTable data={reservationList} />
        </div>
      </div>
    </div>
  );
}
