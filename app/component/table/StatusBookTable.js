import Link from "next/link";

export default function StatusBookTable(props) {
  let tableContent;

  if (props.data.length === 0) {
    if (props.action === "extend") {
      tableContent = (
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            <td className="px-6 py-4 whitespace-nowrap" colSpan="5">
              <div className="flex items-center justify-center">
                <p>Since there is no reservation for this book.&nbsp;</p>
                <button className="text-indigo-600 hover:text-indigo-900">
                  <Link
                    href={`/patron/borrow/${props.id}/${props.data[0].book_id}`}
                  >
                    Click here to extend your borrowed duration.
                  </Link>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      );
    } else {
      tableContent = (
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            <td className="px-6 py-4 whitespace-nowrap" colSpan="5">
              <div className="flex items-center justify-center">
                <p>No reservations.&nbsp;</p>
                <button className="text-indigo-600 hover:text-indigo-900">
                  <Link href={`/patron/search/${props.id}/status/reserve`}>
                    Click here to make reservation.
                  </Link>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      );
    }
  } else {
    tableContent = (
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
            <td className="px-6 py-4 whitespace-no-wrap">{book.user_name}</td>
            <td className="px-6 py-4 whitespace-no-wrap"></td>
            <td className="px-6 py-4 whitespace-no-wrap">
              {book.date_reserved}
            </td>
          </tr>
        ))}
      </tbody>
    );
  }

  return (
    <div
      className="container mx-auto h-[90%] overflow-y-scroll"
      style={{ width: "95%" }}
    >
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
              Reserved By
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Copy
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Date Reserved
            </th>
          </tr>
        </thead>
        {tableContent}
      </table>
    </div>
  );
}
