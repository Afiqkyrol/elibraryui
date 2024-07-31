"use client";

import { fetchBorrowedBook } from "@/api/patron/getApi";
import PatronLeftSideBar from "@/app/elibrary_ui/component/PatronLeftSideBar";
import Loading from "@/app/loading";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ShowExtendBorrowedBookDetailsPage({ params }) {
  const [isLoading, setIsLoading] = useState(true);
  const [borrow, setBorrow] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function getExtendApplicationDetails() {
      setBorrow(await fetchBorrowedBook(params.historyId));
    }

    getExtendApplicationDetails();
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  function logoutHandler() {
    setIsLoading(true);
    localStorage.clear();
    window.close();
  }

  console.log(borrow);

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
                  Book Title:
                </label>
                <p className="text-gray-700">{borrow.book_title}</p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Data Borrowed:
                </label>
                <p className="text-gray-700">
                  {String(borrow.date_borrowed).substring(0, 10)}
                </p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Est Return date:
                </label>
                <p className="text-gray-700">
                  {String(borrow.est_date_to_return).substring(0, 10)}
                </p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Extend Status:
                </label>
                <p className="text-gray-700">{borrow.status_extend}</p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Remark:
                </label>
                <p className="text-gray-700">{borrow.status_remark}</p>
              </div>
            </div>
          </center>
        </div>
      </div>
    </div>
  );
}
