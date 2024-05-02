"use client";

import { fetchMinDate, fetchMonographAbout } from "@/api/patron/getApi";
import { saveBookReservation } from "@/api/patron/postApi";
import Loading from "@/app/loading";
import PatronLeftSideBar from "@/app/component/PatronLeftSideBar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { sendConfirmReserveEmail } from "@/api/email/emailApi";
import DatePickerExcDate from "@/app/component/DatePickerExcDate";

export default function showReservationForm({ params }) {
  const [monographAbout, setMonographAbout] = useState("");
  const [estRtnDate, setEstRtnDate] = useState("");
  const [bookDate, setBookDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [minDate, setMinDate] = useState();
  const [excludeDates, setExcludeDates] = useState();
  const router = useRouter();

  useEffect(() => {
    async function getMonographAbout() {
      setMonographAbout(await fetchMonographAbout(params.bookId));
      setMinDate(await fetchMinDate(params.bookId));
      setExcludeDates(await fetchMinDate(params.bookId));
    }

    getMonographAbout();
    setIsLoading(false);
  }, []);

  function dateChangeHandler(date) {
    setBookDate(date);
    checkEstimateReturnDate(date);
  }

  function checkEstimateReturnDate(date) {
    const selectedDate = new Date(date);

    selectedDate.setDate(selectedDate.getDate() + 7);

    const day = selectedDate.getDate().toString().padStart(2, "0");
    const month = (selectedDate.getMonth() + 1).toString().padStart(2, "0");
    const year = selectedDate.getFullYear();

    const formattedDate = `${day}-${month}-${year}`;
    setEstRtnDate(formattedDate);
  }

  async function submitHandler(e) {
    setIsLoading(true);
    e.preventDefault();
    try {
      const response = await saveBookReservation(
        monographAbout.book_id,
        localStorage.getItem("user_id"),
        bookDate
      );

      sendConfirmReserveEmail(response.bookingId);

      localStorage.setItem(
        "toast-message",
        "Your Application has been submitted"
      );
      router.push("/patron/reservation");
    } catch (error) {
      setIsLoading(false);
      toast.error("Error!");
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
      <PatronLeftSideBar />
      <div className="flex-1 flex flex-col">
        <div className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center">
          <p className="items-start w-1/2 text-left">
            {localStorage.getItem("fullname")}
          </p>
          <p className="items-start w-1/2 text-center">Reserve</p>
          <button
            class="text-white hover:text-gray-400 w-1/2 text-right"
            onClick={logoutHandler}
          >
            Logout
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              router.back();
            }}
            class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Back
          </button>
          <center>
            <br></br>
            <h1 className="text-3xl font-bold mb-4 text-center">
              Reserve book
            </h1>
            <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 py-6">
              <h2 className="text-xl font-semibold mb-4">Monograph Details</h2>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Book ID:
                </label>
                <p className="text-gray-700">{monographAbout.book_id}</p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Book Title:
                </label>
                <p className="text-gray-700">{monographAbout.title}</p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Status:
                </label>
                <p className="text-gray-700">{monographAbout.status}</p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Est. Return date:
                </label>
                <p className="text-gray-700">{estRtnDate}</p>
              </div>
              <form onSubmit={submitHandler}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Reserve Dates:
                  </label>
                  <DatePickerExcDate
                    excludeDates={excludeDates}
                    style={"border rounded px-3 py-2 w-full"}
                    dateChangeHandler={dateChangeHandler}
                    selectedDate={bookDate}
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Submit
                </button>
              </form>
              <ToastContainer />
            </div>
          </center>
        </div>
      </div>
    </div>
  );
}
