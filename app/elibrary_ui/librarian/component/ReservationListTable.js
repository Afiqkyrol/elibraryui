import { useState } from "react";
import Link from "next/link";

export default function ReservationListTable({ data }) {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;

  const offset = currentPage * itemsPerPage;
  const currentItems = data.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(data.length / itemsPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, pageCount - 1));
  };

  return (
    <div className="container mx-auto w-full flex justify-center flex-col">
      <table>
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              No
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Accession No
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Patron ID
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Date Reserved
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentItems.map((book, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-no-wrap">{index + 1}</td>
              <td className="px-6 py-4 whitespace-no-wrap">
                {book.accession_no}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                {book.book_title}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">{book.user_id}</td>
              <td className="px-6 py-4 whitespace-no-wrap">
                <Link
                  href={`/elibrary_ui/librarian/user/${book.user_id}`}
                  className="text-blue-600 hover:underline"
                  style={{ color: "blue" }}
                >
                  {book.user_name}
                </Link>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                {book.date_reserved}
              </td>
              {book.status === "pending" && (
                <td className="px-6 py-4 whitespace-no-wrap">
                  <p className="text-blue-600">{book.status}</p>
                </td>
              )}
              {book.status === "approved" && (
                <td className="px-6 py-4 whitespace-no-wrap">
                  <p className="text-green-600">{book.status}</p>
                </td>
              )}
              {book.status === "closed" && (
                <td className="px-6 py-4 whitespace-no-wrap">{book.status}</td>
              )}
              {book.status === "rejected" && (
                <td className="px-6 py-4 whitespace-no-wrap">
                  <p className="text-red-600">{book.status}</p>
                </td>
              )}
              <td>
                <div style={{ display: "flex", gap: "10px" }}>
                  {book.status === "pending" && (
                    <Link
                      href={`/elibrary_ui/librarian/reservation/${book.reserve_id}`}
                    >
                      <button className="flex items-center space-x-2 bg-blue-500 text-white font-bold py-2 px-4 rounded">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M15.707 5.293a1 1 0 0 1 1.414 1.414l-10 10a1 1 0 0 1-1.414 0l-3-3a1 1 0 1 1 1.414-1.414l2.293 2.293 9-9zM6 16h2v-2H6v2zm4 0h2v-2h-2v2z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Manage
                      </button>
                    </Link>
                  )}
                  {book.status === "approved" && (
                    <Link
                      href={`/elibrary_ui/librarian/reservation/${book.reserve_id}/borrow`}
                    >
                      <button className="flex items-center space-x-2 bg-blue-500 text-white font-bold py-2 px-4 rounded">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3.293 11.707a1 1 0 0 1 0-1.414l7-7a1 1 0 0 1 1.414 1.414L6.414 11H17a1 1 0 0 1 0 2H6.414l5.293 5.293a1 1 0 1 1-1.414 1.414l-7-7a1 1 0 0 1 0-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Borrow
                      </button>
                    </Link>
                  )}
                  {book.status === "closed" && <p>N/A</p>}
                  {book.status === "rejected" && <p>N/A</p>}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <button
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          onClick={handlePrevPage}
          disabled={currentPage === 0}
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {currentPage + 1} of {pageCount}
        </span>
        <button
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          onClick={handleNextPage}
          disabled={currentPage === pageCount - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
}
