"use client";

import Loading from "@/app/loading";
import PatronLeftSideBar from "@/app/component/PatronLeftSideBar";
import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchMonographAbout } from "@/api/patron/getApi";
import { useRouter } from "next/navigation";

export default function showMonographAboutPage({ params }) {
  const [monographAbout, setMonographAbout] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function getMonographAbout(reg_id) {
      setMonographAbout(await fetchMonographAbout(reg_id));
    }

    getMonographAbout(params.bookId);
    setIsLoading(false);
  }, []);

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
          <p className="items-start w-1/2 text-center">About Monograph</p>
          <button
            class="text-white hover:text-gray-400 w-1/2 text-right"
            onClick={logoutHandler}
          >
            Logout
          </button>
        </div>
        <div
          class="bg-gray-100 flex items-center justify-center"
          style={{ height: "100%" }}
        >
          <div
            class="max-w-xl mx-auto bg-white p-8 shadow-md rounded-md"
            style={{ width: "90%" }}
          >
            <button
              onClick={() => {
                router.back();
              }}
              class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Back
            </button>
            <h1 class="text-2xl font-semibold text-gray-800 mb-4">
              Book Details
            </h1>
            <div style={{ height: "100%", overflowY: "auto" }}>
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700">
                  Book ID:
                </label>
                <p class="text-gray-900">{monographAbout.book_id}</p>
              </div>
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700">
                  Call Number:
                </label>
                <p class="text-gray-900">{monographAbout.call_no}</p>
              </div>
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700">
                  Author:
                </label>
                <p class="text-gray-900">{monographAbout.author}</p>
              </div>
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700">
                  Title:
                </label>
                <p class="text-gray-900">{monographAbout.title}</p>
              </div>
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700">
                  Publisher:
                </label>
                <p class="text-gray-900">{monographAbout.publisher}</p>
              </div>
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700">
                  Item Number:
                </label>
                <p class="text-gray-900">{monographAbout.item_number}</p>
              </div>
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700">
                  Status:
                </label>
                <p class="text-gray-900">{monographAbout.status}</p>
              </div>
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700">
                  Copy:
                </label>
                <p class="text-gray-900">0{monographAbout.copy}</p>
              </div>
            </div>
            <div class="flex justify-between mt-8">
              <Link href={`/patron/search/${monographAbout.book_id}/details`}>
                <button class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600">
                  Details
                </button>
              </Link>
              <Link href={`/patron/search/${monographAbout.book_id}/marctag`}>
                <button class="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600">
                  Marc Tag
                </button>
              </Link>
              <Link href={`/patron/search/${monographAbout.book_id}/status`}>
                <button class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                  Reserve
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
