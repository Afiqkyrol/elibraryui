import { useState } from "react";
import Link from "next/link";

export default function EbookSearchListTable({ data }) {
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
    <div className="flex flex-col items-center mt-4 h-full">
      <div className="w-full overflow-y-scroll">
        <table className="w-full">
          <thead>
            <tr>
              <th
                style={{ width: "10%" }}
                className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
              >
                Book ID
              </th>
              <th
                style={{ width: "30%" }}
                className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
              >
                Title
              </th>
              <th
                style={{ width: "60%" }}
                className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
              >
                Description
              </th>
              <th
                style={{ width: "60%" }}
                className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
              >
                Author
              </th>
              <th
                style={{ width: "60%" }}
                className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
              >
                Publisher
              </th>
              <th
                style={{ width: "60%" }}
                className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
              >
                Type
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems.map((book, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-no-wrap">
                  {book.monograph.reg_id}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  <Link
                    href={`/elibrary_ui/patron/search-ebook/${book.monograph.reg_id}`}
                    className="text-blue-600 hover:underline"
                    style={{ color: "blue" }}
                  >
                    {book.monograph.reg_title}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  {book.monograph.reg_description}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  {book.monograph.reg_author_id}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  {book.monograph.reg_publisher_id}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  {book.monograph.reg_type}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between mt-4 w-full">
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
