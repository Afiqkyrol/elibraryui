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
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentItems.map((book, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-no-wrap">{book.book_id}</td>
              <td className="px-6 py-4 whitespace-no-wrap">
                <Link
                  href={`/elibrary_ui/patron/reservation/${book.reserve_id}`}
                  className="text-blue-600 hover:underline"
                  style={{ color: "blue" }}
                >
                  {book.book_title}
                </Link>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">{book.user_id}</td>
              <td className="px-6 py-4 whitespace-no-wrap">{book.user_name}</td>
              <td className="px-6 py-4 whitespace-no-wrap">
                {book.date_reserved}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">{book.status}</td>
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
