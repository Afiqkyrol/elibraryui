"use client";

import {
  fetchMinDate,
  fetchMonographAbout,
  fetchUser,
} from "@/api/librarian/getApi";
import { saveBookReservation } from "@/api/librarian/postApi";
import LibrarianLeftSideBar from "@/app/elibrary_ui/component/LibrarianLeftSideBar";
import Loading from "@/app/elibrary_ui/loading";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ShowReservationForm({ params }) {
  const [monographAbout, setMonographAbout] = useState("");
  const [user, setUser] = useState("");
  const [idInput, setIdInput] = useState("");
  const [isLocked, setIsLocked] = useState(true);
  const [estRtnDate, setEstRtnDate] = useState("");
  const [bookDate, setBookDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [minDate, setMinDate] = useState();
  const router = useRouter();

  useEffect(() => {
    async function getMonographAbout() {
      setMonographAbout(await fetchMonographAbout(params.bookId));
      setMinDate(await fetchMinDate(params.bookId));
    }

    getMonographAbout();
    setIsLoading(false);
  }, []);

  function idInputHandler(e) {
    setIdInput(e.target.value);
  }

  async function searchUserHandler(e) {
    e.preventDefault();
    if (await fetchUser(idInput)) {
      setUser(await fetchUser(idInput));
      setIsLocked(false);
      toast.info("User found");
    } else {
      toast.warning("No user found");
      setUser("");
      setIsLocked(true);
    }
  }

  function checkEstimateReturnDate(e) {
    const selectedDate = new Date(e.target.value);
    setBookDate(new Date(e.target.value));
    selectedDate.setDate(selectedDate.getDate() + 7); // Add 7 days to the selected date

    const day = selectedDate.getDate().toString().padStart(2, "0");
    const month = (selectedDate.getMonth() + 1).toString().padStart(2, "0");
    const year = selectedDate.getFullYear();

    const formattedDate = `${day}-${month}-${year}`;
    setEstRtnDate(formattedDate);
  }

  async function submitHandler(e) {
    e.preventDefault();
    try {
      await saveBookReservation(monographAbout.book_id, user.id, bookDate);
      localStorage.setItem(
        "toast-message",
        "Your Application has been submitted"
      );
      router.push("/elibrary_ui/librarian/reservation");
    } catch (error) {
      toast.error("Error");
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
          <p className="items-start w-1/2 text-center">Reserve</p>
          <button
            class="text-white hover:text-gray-400 w-1/2 text-right"
            onClick={logoutHandler}
          >
            Logout
          </button>
        </div>
        <div>
          <center>
            <br></br>
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
              <form onSubmit={searchUserHandler}>
                <div className="mb-4 relative">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    User IC Number:
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      className="border rounded px-3 py-2 w-full"
                      onChange={idInputHandler}
                      value={idInput}
                      required
                    />
                    <button className="absolute inset-y-0 right-0 px-3 py-2 bg-gray-200 border-l border-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a4 4 0 1 1-8 0 4 4 0 0 1 8 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.5 17.5l2.5 2.5"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </form>
              <form onSubmit={submitHandler}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Name:
                  </label>
                  <input
                    type="text"
                    className="border rounded px-3 py-2 w-full"
                    value={user.fullName}
                    readOnly
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Reserve Date:
                  </label>
                  <input
                    type="date"
                    className="border rounded px-3 py-2 w-full"
                    onChange={checkEstimateReturnDate}
                    min={String(minDate).substring(0, 10)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLocked}
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
