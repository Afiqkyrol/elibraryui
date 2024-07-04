"use client";

import { sendStatusExtendBorrowEmail } from "@/api/email/emailApi";
import { fetchExtendApplication } from "@/api/librarian/getApi";
import { updateExtendApplicationStatus } from "@/api/librarian/putApi";
import LibrarianLeftSideBar from "@/app/elibrary_ui/component/LibrarianLeftSideBar";
import Loading from "@/app/elibrary_ui/loading";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ShowBorrowedBookDetailsPage({ params }) {
  const [borrowed, setBorrowed] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [extendDate, setExtendDate] = useState();
  const [status, setStatus] = useState();
  const router = useRouter();

  useEffect(() => {
    async function getBorrowed() {
      setBorrowed(await fetchExtendApplication(params.historyId));
    }

    getBorrowed();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (borrowed.extend_date) {
      setExtendDate(String(borrowed.extend_date).substring(0, 10));
    }
  }, [borrowed]);

  function dateInputHandler(e) {
    setExtendDate(e.target.value);
  }

  async function submitHandler(e) {
    setIsLoading(true);
    e.preventDefault();
    try {
      await updateExtendApplicationStatus(params.historyId, extendDate, status);
      await sendStatusExtendBorrowEmail(params.historyId);

      localStorage.setItem("toast-message", "The application has been updated");
      router.push("/elibrary_ui/librarian/extend");
    } catch (error) {
      toast.error("Error!");
    }
  }

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
      <ToastContainer />
      <div className="flex-1 flex flex-col">
        <div className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center">
          <p className="items-start w-1/2 text-left">
            {localStorage.getItem("fullname")}
          </p>
          <p className="items-start w-1/2 text-center">Borrowed Details</p>
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
            <div className="flex justify-between max-w-4xl mx-auto bg-white shadow-md rounded px-8 py-6">
              <div className="w-1/2 pr-4">
                <h2 className="text-xl font-semibold mb-4">Borrowed Details</h2>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Book ID:
                  </label>
                  <p className="text-gray-700">{borrowed.extend_date}</p>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Book Title:
                  </label>
                  <p className="text-gray-700">{borrowed.book_title}</p>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Name:
                  </label>
                  <p className="text-gray-700">{borrowed.borrower}</p>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Date Borrowed:
                  </label>
                  <p className="text-gray-700">
                    {String(borrowed.date_borrowed).substring(0, 10)}
                  </p>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Date Return:
                  </label>
                  <p className="text-gray-700">
                    {String(borrowed.est_date_to_return).substring(0, 10)}
                  </p>
                </div>
              </div>
              <div className="w-1/2 pl-4">
                <form onSubmit={submitHandler}>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Extend Date:
                    </label>
                    <input
                      type="date"
                      className="border rounded px-3 py-2 w-full"
                      value={extendDate}
                      onChange={dateInputHandler}
                      required
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
                        value="approved"
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
                        value="rejected"
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
            </div>
          </center>
        </div>
      </div>
    </div>
  );
}
