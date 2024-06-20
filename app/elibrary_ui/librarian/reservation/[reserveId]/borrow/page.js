"use client";

import {
  fetchAvailableReturnDate,
  fetchReservedBookDetails,
} from "@/api/librarian/getApi";
import { saveBorrowedBook } from "@/api/librarian/postApi";
import { updateReservationStatusClosed } from "@/api/librarian/putApi";
import LibrarianLeftSideBar from "@/app/elibrary_ui/component/LibrarianLeftSideBar";
import Loading from "@/app/elibrary_ui/loading";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ShowCreateBorrowPage({ params }) {
  const [reservation, setReservation] = useState("");
  const [reservedDate, setReservedDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [availableReturnDate, setAvailableReturnDate] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function getReservation() {
      setReservation(await fetchReservedBookDetails(params.reserveId));
      setAvailableReturnDate(await fetchAvailableReturnDate(params.reserveId));
    }

    getReservation();
    setIsLoading(false);
  }, []);

  function logoutHandler() {
    setIsLoading(true);
    localStorage.clear();
    window.location.href = "/elibrary_ui/login";
  }

  function dateInputHandler(e) {
    setReturnDate(new Date(e.target.value));
  }

  async function submitHandler(e) {
    e.preventDefault();
    try {
      await saveBorrowedBook(reservation.reserve_id, returnDate);
      await updateReservationStatusClosed(params.reserveId, 4);
      localStorage.setItem("toast-message", "The application has been updated");
      router.push("/elibrary_ui/librarian/reservation");
    } catch (error) {
      toast("Something went wrong");
    }
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex h-screen">
      <LibrarianLeftSideBar />
      <ToastContainer />
      <div className="flex-1 flex flex-col">
        <div className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center">
          <p className="items-start w-1/2 text-left">
            {localStorage.getItem("fullname")}
          </p>
          <p className="items-start w-1/2 text-center">Borrow</p>
          <button
            className="text-white hover:text-gray-400 w-1/2 text-right"
            onClick={logoutHandler}
          >
            Logout
          </button>
        </div>
        <div>
          <center onSubmit={submitHandler}>
            <br></br>
            <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 py-6">
              <h2 className="text-xl font-semibold mb-4">Borrow</h2>
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
                  Borrow To:
                </label>
                <p className="text-gray-700">{reservation.user_name}</p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Copy:
                </label>
                <p className="text-gray-700">0{reservation.copy}</p>
              </div>
              <form>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Return Date:
                  </label>
                  <input
                    type="date"
                    min={String(availableReturnDate.startDate).substring(0, 10)}
                    max={String(availableReturnDate.endDate).substring(0, 10)}
                    className="border rounded px-3 py-2 w-full"
                    onChange={dateInputHandler}
                    required
                  />
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
