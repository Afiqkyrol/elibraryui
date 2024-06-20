import Link from "next/link";

export default function ReservationListTable(props) {
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
              <td className="px-6 py-4 whitespace-no-wrap">{book.user_name}</td>
              <td className="px-6 py-4 whitespace-no-wrap">
                {book.date_reserved}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">{book.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
