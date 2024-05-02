import Link from "next/link";

export default function BorrowedListTable(props) {
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
              Status extend
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
                {book.book_title}
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
                {book.status_extend}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                {book.status_extend === "pending" ? (
                  <Link href={`/librarian/extend/${book.history_id}`}>
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
                      Edit
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
    </div>
  );
}
