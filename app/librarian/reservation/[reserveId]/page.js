"use client";

import { sendStatusReserveEmail } from "@/api/email/emailApi";
import { fetchMinDate, fetchReservedBookDetails } from "@/api/librarian/getApi";
import { updateReservationStatus } from "@/api/librarian/putApi";
import DatePickerExcDate from "@/app/component/DatePickerExcDate";
import LibrarianLeftSideBar from "@/app/component/LibrarianLeftSideBar";
import Loading from "@/app/loading";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function showReservedBookDetailPage({ params }) {
  const [reservation, setReservation] = useState([]);
  const [status, setStatus] = useState();
  const [reservedDate, setReservedDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [excludeDates, setExcludeDates] = useState();
  const router = useRouter();

  useEffect(() => {
    async function getReservation() {
      setReservation(await fetchReservedBookDetails(params.reserveId));
    }

    getReservation();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (reservation.date_reserved) {
      setReservedDate(String(reservation.date_reserved).substring(0, 10));
    }
    async function getExcludeDates() {
      setExcludeDates(await fetchMinDate(reservation.book_id));
    }

    if (reservation.book_id) {
      getExcludeDates();
    }
  }, [reservation]);

  function dateInputHandler(e) {
    setReservedDate(e.target.value);
  }

  function dateChangeHandler(date) {
    setReservedDate(date);
  }

  async function submitHandler(e) {
    setIsLoading(true);
    e.preventDefault();
    try {
      await updateReservationStatus(
        params.reserveId,
        new Date(reservedDate),
        parseInt(status)
      );
      sendStatusReserveEmail(params.reserveId);
      setReservation(await fetchReservedBookDetails(params.reserveId));
      localStorage.setItem("toast-message", "The application has been updated");
      router.push("/librarian/reservation");
    } catch (error) {
      setIsLoading(false);
      toast.error("Error");
    }
  }

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
      <ToastContainer />
      <LibrarianLeftSideBar />
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
              <form onSubmit={submitHandler}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Reserve Date:
                  </label>
                  <DatePickerExcDate
                    excludeDates={excludeDates}
                    style={"border rounded px-3 py-2 w-full"}
                    dateChangeHandler={dateChangeHandler}
                    selectedDate={reservedDate}
                  />
                </div>

                <div className="mb-4">
                  <span className="block text-gray-700 text-sm font-bold mb-2">
                    Status:
                  </span>
                  <label className="inline-flex items-center mr-4">
                    <input
                      type="radio"
                      className="form-radio text-blue-500"
                      name="status"
                      value="2"
                      onChange={(e) => setStatus(e.target.value)}
                      required
                    />
                    <span className="ml-2">Approve</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-red-500"
                      name="status"
                      value="3"
                      onChange={(e) => setStatus(e.target.value)}
                      required
                    />
                    <span className="ml-2">Reject</span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Submit
                </button>
              </form>
            </div>
          </center>
        </div>
      </div>
    </div>
  );
}
