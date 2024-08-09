import { useState } from "react";
import Link from "next/link";

export default function DamagedListTable({ data }) {
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

  let tableContent;
  if (currentItems.length === 0) {
    tableContent = (
      <tbody className="bg-white divide-y divide-gray-200">
        <tr>
          <td className="px-6 py-4 whitespace-nowrap" colSpan="4">
            <div className="flex items-center justify-center">
              <p className="text-gray-500">Empty</p>
            </div>
          </td>
        </tr>
      </tbody>
    );
  } else {
    tableContent = (
      <tbody className="bg-white divide-y divide-gray-200">
        {currentItems.map((book, index) => (
          <tr key={index}>
            <td className="px-6 py-4 whitespace-no-wrap">{book.book_id}</td>
            <td className="px-6 py-4 whitespace-no-wrap">{book.book_title}</td>
            <td className="px-6 py-4 whitespace-no-wrap">
              {book.damaged_description}
            </td>
            <td className="px-6 py-4 whitespace-no-wrap">
              <Link href={`/elibrary_ui/librarian/damaged/${book.damaged_id}`}>
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
                  Edit
                </button>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    );
  }

  return (
    <div className="container mx-auto" style={{ width: "95%" }}>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-4 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase">
              Book ID
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Damage Description
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        {tableContent}
      </table>
      {data.length > 0 && (
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
      )}
    </div>
  );
}
