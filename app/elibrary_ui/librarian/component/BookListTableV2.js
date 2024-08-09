import { useState } from "react";
import Link from "next/link";

export default function BookListTableV2({ data }) {
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
      <table className="min-w-full w-4/5">
        <thead>
          <tr>
            <th
              style={{ width: "10%" }}
              className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
            >
              No
            </th>
            <th
              style={{ width: "60%" }}
              className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
            >
              Title
            </th>
            <th
              style={{ width: "30%" }}
              className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
            >
              Author
            </th>
            <th
              style={{ width: "30%" }}
              className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
            >
              Publisher
            </th>
            <th
              style={{ width: "30%" }}
              className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
            >
              Call No
            </th>
            <th
              style={{ width: "30%" }}
              className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
            >
              Type
            </th>
            <th
              style={{ width: "30%" }}
              className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
            >
              Copy
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentItems.map((book, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-no-wrap">
                {index + 1 + offset}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                <Link
                  href={`/elibrary_ui/librarian/search/mono/${book.isbn_no}`}
                  className="text-blue-600 hover:underline"
                  style={{ color: "blue" }}
                >
                  {book.monograph.reg_title}
                </Link>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">{book.author}</td>
              <td className="px-6 py-4 whitespace-no-wrap">{book.publisher}</td>
              <td className="px-6 py-4 whitespace-no-wrap">{book.call_no}</td>
              <td className="px-6 py-4 whitespace-no-wrap">{book.type}</td>
              <td className="px-6 py-4 whitespace-no-wrap">
                <Link
                  href={`/elibrary_ui/librarian/search/mono/${book.isbn_no}`}
                  className="text-blue-600 hover:underline"
                  style={{ color: "blue" }}
                >
                  {book.copy} Copy
                </Link>
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
