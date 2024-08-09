"use client";

import { fetchRegMonographDetails } from "@/api/librarian/getApi";
import LibrarianLeftSideBar from "@/app/elibrary_ui/component/LibrarianLeftSideBar";
import Loading from "@/app/elibrary_ui/loading";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ShowEbookDetails({ params }) {
  const [monographDetails, setMonographDetails] = useState([]);
  const [downloadCount, setDownloadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getMonographDetails() {
      setMonographDetails(await fetchRegMonographDetails(params.bookId));
    }

    getMonographDetails();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (monographDetails.dtMonographRegistration != null) {
      setDownloadCount(
        monographDetails.dtMonographRegistration.reg_download_count
      );
    }
  }, [monographDetails]);

  function logoutHandler() {
    setIsLoading(true);
    localStorage.clear();
    window.close();
  }

  if (isLoading) {
    return <Loading />;
  }
  console.log(monographDetails);

  return (
    <div className="flex h-screen">
      <LibrarianLeftSideBar />
      <div className="flex-1 flex flex-col">
        <div className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center">
          <p className="items-start w-1/2 text-left">
            {localStorage.getItem("fullname")}
          </p>
          <p className="items-start w-1/2 text-center">E-book</p>
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
            <div
              class="bg-gray-100 flex items-center justify-center"
              style={{ height: "100%" }}
            >
              <div
                class="max-w-xl mx-auto bg-white p-8 shadow-md rounded-md"
                style={{ width: "90%" }}
              >
                <h1 class="text-2xl font-semibold text-gray-800 mb-4">
                  Book Details
                </h1>
                <div style={{ height: "100%", overflowY: "auto" }}>
                  <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700">
                      Book ID:
                    </label>
                    <p class="text-gray-900">{monographDetails.book_id}</p>
                  </div>
                  <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700">
                      Call Number:
                    </label>
                    <p class="text-gray-900">{monographDetails.call_no}</p>
                  </div>
                  <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700">
                      Author:
                    </label>
                    <p class="text-gray-900">{monographDetails.author}</p>
                  </div>
                  <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700">
                      Title:
                    </label>
                    <p class="text-gray-900">{monographDetails.title}</p>
                  </div>
                  <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700">
                      Publisher:
                    </label>
                    <p class="text-gray-900">{monographDetails.publisher}</p>
                  </div>
                  <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700">
                      Downloads count:
                    </label>
                    <p class="text-gray-900">{downloadCount}</p>
                  </div>
                  <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700">
                      Status:
                    </label>
                    <p class="text-gray-900">{monographDetails.status}</p>
                  </div>
                </div>
                <div class="flex justify-between mt-8">
                  <Link
                    href={`/elibrary_ui/librarian/ebook/${params.bookId}/details`}
                  >
                    <button class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600">
                      Details
                    </button>
                  </Link>
                  <Link
                    href={`/elibrary_ui/librarian/ebook/${params.bookId}/marctag`}
                  >
                    <button class="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600">
                      Marc Tag
                    </button>
                  </Link>
                  <Link
                    href={`/elibrary_ui/librarian/ebook/${params.bookId}/update`}
                  >
                    <button class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                      Update
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </center>
        </div>
      </div>
    </div>
  );
}
