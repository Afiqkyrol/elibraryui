import Link from "next/link";

export default function StatusBorrowTable(props) {
  let tableContent;
  if (props.data.length === 0) {
    tableContent = (
      <tbody className="bg-white divide-y divide-gray-200">
        <tr>
          <td className="px-6 py-4 whitespace-nowrap" colSpan="5">
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
            <td class="px-6 py-4 whitespace-no-wrap"></td>
            <td class="px-6 py-4 whitespace-no-wrap">
              {book.est_date_to_return}
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
          </tr>
        </thead>
        {tableContent}
      </table>
    </div>
  );
}
