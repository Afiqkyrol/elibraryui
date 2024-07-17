import Link from "next/link";

export default function StatusBorrowedTable(props) {
  let tableContent;
  if (props.data.length === 0) {
    tableContent = (
      <tbody className="bg-white divide-y divide-gray-200">
        <tr>
          <td className="px-6 py-4 whitespace-nowrap" colSpan="8">
            <div className="flex items-center justify-center">
              <p className="text-gray-500">Empty</p>
            </div>
          </td>
        </tr>
      </tbody>
    );
  } else {
    tableContent = (
      <tbody class="bg-white divide-y divide-gray-200">
        {props.data.map((book, index) => (
          <tr key={index}>
            <td class="px-6 py-4 whitespace-no-wrap">{book.book_id}</td>
            <td class="px-6 py-4 whitespace-no-wrap">
              <Link
                href="#"
                className="text-blue-600 hover:underline"
                style={{ color: "blue" }}
              >
                {book.book_title}
              </Link>
            </td>
            <td class="px-6 py-4 whitespace-no-wrap">{book.borrower}</td>
            <td class="px-6 py-4 whitespace-no-wrap">{book.copy}</td>
            <td class="px-6 py-4 whitespace-no-wrap">
              {book.status_extend === "approved"
                ? String(book.extend_date).substring(0, 10)
                : String(book.est_date_to_return).substring(0, 10)}
            </td>
            <td class="px-6 py-4 whitespace-no-wrap">
              {String(book.act_date_return).substring(0, 10)}
            </td>
            <td class="px-6 py-4 whitespace-no-wrap">{book.status_book}</td>
            <td className="px-6 py-4 whitespace-no-wrap">
              {book.status_book === "with user" ? (
                <Link href={`/elibrary_ui/librarian/return/${book.history_id}`}>
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
                    Return
                  </button>
                </Link>
              ) : (
                <span>Done</span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    );
  }
  return (
    <div class="container mx-auto" style={{ width: "95%" }}>
      <table class="min-w-full">
        <thead>
          <tr>
            <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Book ID
            </th>
            <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Borrower
            </th>
            <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Copy
            </th>
            <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Return Date
            </th>
            <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Act Return Date
            </th>
            <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        {tableContent}
      </table>
    </div>
  );
}
