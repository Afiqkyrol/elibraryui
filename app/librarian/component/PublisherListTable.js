import Link from "next/link";

export default function PublisherListTable(props) {
  return (
    <div className="container mx-auto" style={{ width: "95%" }}>
      <div className="flex gap-4">
        <Link href="/librarian/monograph/publisher/add">
          <button className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add +
          </button>
        </Link>
      </div>
      <br></br>
      <table className="min-w-full w-4/5">
        <thead>
          <tr>
            <th
              style={{ width: "30%" }}
              className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
            >
              Publisher Name
            </th>
            <th
              style={{ width: "30%" }}
              className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
            >
              Publisher Telephone
            </th>
            <th
              style={{ width: "40%" }}
              className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
            >
              Publisher Email
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {props.data.map((publisher, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-no-wrap">
                {publisher.publisher_name}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                {publisher.publisher_telephone}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                {publisher.publisher_email}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
