import { useState } from "react";
import Link from "next/link";

export default function BorrowedListTable({ data }) {
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
    <div className="container mx-auto" style={{ width: "95%" }}>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Book ID
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Date Borrowed
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Est Return Date
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Extend Date
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Act Return Date
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Status extend
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentItems.map((book, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-no-wrap">{book.book_id}</td>
              <td className="px-6 py-4 whitespace-no-wrap">
                <Link
                  href={`/elibrary_ui/patron/borrowed/${book.history_id}/details`}
                  className="text-blue-600 hover:underline"
                >
                  {book.book_title}
                </Link>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                {String(book.date_borrowed).substring(0, 10)}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                {String(book.est_date_to_return).substring(0, 10)}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                {String(book.extend_date).substring(0, 10)}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                {String(book.act_date_return).substring(0, 10)}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                {book.status_extend}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                {book.extend_date == null && book.act_date_return == null ? (
                  <Link
                    href={`/elibrary_ui/patron/borrowed/${book.history_id}`}
                  >
                    <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        ></path>
                      </svg>
                      Extends
                    </button>
                  </Link>
                ) : (
                  <p>N/A</p>
                )}
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
