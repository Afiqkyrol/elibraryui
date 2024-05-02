"use client";

import { checkIfReserved, fetchBorrowedBook } from "@/api/patron/getApi";
import Loading from "@/app/loading";
import PatronLeftSideBar from "@/app/component/PatronLeftSideBar";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateBorrowReservation } from "@/api/patron/putApi";
import { useRouter } from "next/navigation";
import { sendConfirmExtendBorrowEmail } from "@/api/email/emailApi";

export default function showExtendAppPage({ params }) {
  const [borrowedBook, setBorrowedBook] = useState("");
  const [extendDate, setExtendDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function getMonographAboutAndBorrowedBook() {
      setBorrowedBook(await fetchBorrowedBook(params.historyId));
    }

    getMonographAboutAndBorrowedBook();
    setIsLoading(false);
  }, []);

  function logoutHandler() {
    setIsLoading(true);
    localStorage.clear();
    window.location.href = "/login";
  }

  function dateInputHandler(e) {
    setExtendDate(new Date(e.target.value));
  }

  async function submitHandler(e) {
    e.preventDefault();
    try {
      if (!(await checkIfReserved(borrowedBook.book_id))) {
        setIsLoading(true);

        await updateBorrowReservation(params.historyId, extendDate);
        sendConfirmExtendBorrowEmail(params.historyId);
        localStorage.setItem(
          "toast-message",
          "Your Application has been submitted"
        );
        router.push("/patron/borrowed");
      } else {
        toast.warning(
          "You cannot extend your application, this book has been reserved by someone else"
        );
      }
    } catch (error) {
      setIsLoading(false);
      toast("Something went wrong");
    }
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
          <p className="items-start w-1/2 text-center">Borrowed</p>
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
              Borrowed book
            </h1>
            <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 py-6">
              <h2 className="text-xl font-semibold mb-4">Monograph Details</h2>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Book ID:
                </label>
                <p className="text-gray-700">{borrowedBook.book_id}</p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Book Title:
                </label>
                <p className="text-gray-700">{borrowedBook.book_title}</p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Data Borrowed:
                </label>
                <p className="text-gray-700">
                  {String(borrowedBook.date_borrowed).substring(0, 10)}
                </p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Est Return date:
                </label>
                <p className="text-gray-700">
                  {String(borrowedBook.est_date_to_return).substring(0, 10)}
                </p>
              </div>
              <form onSubmit={submitHandler}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Extend Date:
                  </label>
                  <input
                    type="date"
                    className="border rounded px-3 py-2 w-full"
                    onChange={dateInputHandler}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Extends
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
