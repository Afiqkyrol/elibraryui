import Link from "next/link";

export default function CopyListTableV2(props) {
  return (
    <div
      className="flex justify-center mt-4 h-full"
      style={{ overflowY: "scroll" }}
    >
      <table className="w-full">
        <thead>
          <tr>
            <th
              style={{ width: "10%" }}
              className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
            >
              No
            </th>
            <th
              style={{ width: "30%" }}
              className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
            >
              ISBN No
            </th>
            <th
              style={{ width: "60%" }}
              className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
            >
              Accession No
            </th>
            <th
              style={{ width: "60%" }}
              className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
            >
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {props.data.map((book, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-no-wrap">{index + 1}</td>
              <td className="px-6 py-4 whitespace-no-wrap">{props.isbn}</td>
              <td className="px-6 py-4 whitespace-no-wrap">
                <Link
                  href={`/elibrary_ui/librarian/monograph/${book.dtMonographRegistration.reg_id}`}
                  className="text-blue-600 hover:underline"
                  style={{ color: "blue" }}
                >
                  {book.accession_no}
                </Link>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">{book.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
