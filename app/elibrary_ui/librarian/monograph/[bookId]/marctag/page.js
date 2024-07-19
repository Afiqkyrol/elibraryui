"use client";

import { fetchMonographMarcTag } from "@/api/librarian/getApi";
import LibrarianLeftSideBar from "@/app/elibrary_ui/component/LibrarianLeftSideBar";
import Loading from "@/app/elibrary_ui/loading";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ShowMarcTagDetailsPage({ params }) {
  const [isLoading, setIsLoading] = useState(true);
  const [marcTagList, setMarcTagList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function getMarcTag() {
      setMarcTagList(await fetchMonographMarcTag(params.bookId));
    }

    getMarcTag();
    setIsLoading(false);
  }, []);

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
      <div className="flex-1 flex flex-col overflow-y-hidden">
        <div className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center">
          <p className="items-start w-1/2 text-left">
            {localStorage.getItem("fullname")}
          </p>
          <p className="items-start w-1/2 text-center">Marc Tag</p>
          <button
            className="text-white hover:text-gray-400 w-1/2 text-right"
            onClick={logoutHandler}
          >
            Logout
          </button>
        </div>
        <div className="overflow-y-auto">
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
            <div className="container mx-auto" style={{ width: "95%" }}>
              <table className="min-w-full w-4/5">
                <thead>
                  <tr>
                    <th
                      style={{ width: "5%" }}
                      className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                    >
                      OPACTAG
                    </th>
                    <th
                      style={{ width: "15%" }}
                      className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                    >
                      IND1
                    </th>
                    <th
                      style={{ width: "15%" }}
                      className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                    >
                      IND2
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      DATA
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {marcTagList.map((book, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-no-wrap">
                        {book.catreg_tag}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap">
                        {book.catreg_ind1}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap">
                        {book.catreg_ind2}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap">
                        {book.catreg_data}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </center>
        </div>
      </div>
    </div>
  );
}
