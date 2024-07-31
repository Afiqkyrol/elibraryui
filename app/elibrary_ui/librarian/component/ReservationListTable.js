import Link from "next/link";

export default function ReservationListTable(props) {
  return (
    <div className="container mx-auto w-full flex justify-center">
      <table>
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
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {props.data.map((book, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-no-wrap">{book.book_id}</td>
              <td className="px-6 py-4 whitespace-no-wrap">
                <Link
                  href="#"
                  className="text-blue-600 hover:underline"
                  style={{ color: "blue" }}
                >
                  {book.book_title}
                </Link>
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
                      <button class="flex items-center space-x-2 bg-blue-500 text-white font-bold py-2 px-4 rounded">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M15.707 5.293a1 1 0 0 1 1.414 1.414l-10 10a1 1 0 0 1-1.414 0l-3-3a1 1 0 1 1 1.414-1.414l2.293 2.293 9-9zM6 16h2v-2H6v2zm4 0h2v-2h-2v2z"
                            clip-rule="evenodd"
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
                      <button class="flex items-center space-x-2 bg-blue-500 text-white font-bold py-2 px-4 rounded">
                        {/* Replace the SVG code with a different icon */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          {/* Use an appropriate icon for borrowing */}
                          <path
                            fill-rule="evenodd"
                            d="M3.293 11.707a1 1 0 0 1 0-1.414l7-7a1 1 0 0 1 1.414 1.414L6.414 11H17a1 1 0 0 1 0 2H6.414l5.293 5.293a1 1 0 1 1-1.414 1.414l-7-7a1 1 0 0 1 0-1.414z"
                            clip-rule="evenodd"
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
    </div>
  );
}
