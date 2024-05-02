"use client";

import { fetchBorrowedBook } from "@/api/librarian/getApi";
import { saveDamagedBook } from "@/api/librarian/postApi";
import { updateReturnBorrowedBook } from "@/api/librarian/putApi";
import LibrarianLeftSideBar from "@/app/component/LibrarianLeftSideBar";
import Loading from "@/app/loading";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function showBorowedBookDetailsPage({ params }) {
  const [borrowedBook, setBorrowedBook] = useState([]);
  const [damage, setDamage] = useState();
  const [late, setLate] = useState(true);
  const [damageDetails, setDamageDetails] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function getBorrowedBook() {
      setBorrowedBook(await fetchBorrowedBook(params.historyId));
    }

    getBorrowedBook();
    setIsLoading(false);
  }, []);

  async function submitHandler(e) {
    e.preventDefault();
    if (late === true) {
      setLate(true);
    } else {
      setLate(false);
    }
    console.log(late);

    try {
      await updateReturnBorrowedBook(params.historyId, late);

      if (damage) {
        await saveDamagedBook(
          borrowedBook.book_id,
          damageDetails,
          borrowedBook.borrower_id
        );
      }

      localStorage.setItem("toast-message", "The application has been updated");
      router.push("/librarian/return");
    } catch (error) {
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
      <LibrarianLeftSideBar />
      <ToastContainer />
      <div className="flex-1 flex flex-col">
        <div className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center">
          <p className="items-start w-1/2 text-left">
            {localStorage.getItem("fullname")}
          </p>
          <p className="items-start w-1/2 text-center">Borrowed Book</p>
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
                    Borrower:
                  </label>
                  <p className="text-gray-700">{borrowedBook.borrower}</p>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Date Borrowed:
                  </label>
                  <p className="text-gray-700">
                    {String(borrowedBook.date_borrowed).substring(0, 10)}
                  </p>
                </div>
              </div>
              <div className="w-1/2 pl-4">
                <form onSubmit={submitHandler}>
                  <div className="mb-4">
                    <span className="block text-gray-700 text-sm font-bold mb-2">
                      Damaged:
                    </span>
                    <label className="inline-flex items-center mr-4">
                      <input
                        type="radio"
                        className="form-radio text-blue-500"
                        name="damage"
                        value={true}
                        onChange={() => setDamage(true)}
                        required
                      />
                      <span className="ml-2">Yes</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio text-red-500"
                        name="damage"
                        value={false}
                        onChange={() => setDamage(false)}
                        required
                      />
                      <span className="ml-2">No</span>
                    </label>
                  </div>
                  <div className="mb-4">
                    <span className="block text-gray-700 text-sm font-bold mb-2">
                      Late:
                    </span>
                    <label className="inline-flex items-center mr-4">
                      <input
                        type="radio"
                        className="form-radio text-blue-500"
                        name="late"
                        value={true}
                        onChange={() => setLate(true)}
                        required
                      />
                      <span className="ml-2">Yes</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio text-red-500"
                        name="late"
                        value={false}
                        onChange={() => setLate(false)}
                        required
                      />
                      <span className="ml-2">No</span>
                    </label>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Damaged Details {"(If yes)"}:
                    </label>
                    <textarea
                      id="damage_details"
                      name="damage_details"
                      class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                      rows="4"
                      onChange={(e) => setDamageDetails(e.target.value)}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Return
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
