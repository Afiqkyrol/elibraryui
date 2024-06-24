import Link from "next/link";

export default function BookListTable(props) {
  return (
    <div className="container mx-auto" style={{ width: "95%" }}>
      <table className="min-w-full w-4/5">
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
          {props.data.map((book, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-no-wrap">
                {book.monograph.reg_id}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                <Link
                  href={`/elibrary_ui/patron/search/${book.monograph.reg_id}`}
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
  );
}
