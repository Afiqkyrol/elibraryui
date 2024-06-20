import Link from "next/link";

export default function MonoBorrowStsTable(props) {
  return (
    <div className="container mx-auto" style={{ width: "95%" }}>
      <div className="flex gap-4">
        <Link href="/elibrary_ui/admin/monograph-borrow-status/add">
          <button className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add Monograph Borrow Status
          </button>
        </Link>
      </div>
      <br></br>
      <table className="min-w-full w-4/5">
        <thead>
          <tr>
            <th
              style={{ width: "10%" }}
              className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
            >
              ID
            </th>
            <th
              style={{ width: "20%" }}
              className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
            >
              Status
            </th>
            <th
              style={{ width: "25%" }}
              className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
            >
              Description
            </th>
            <th
              style={{ width: "10%" }}
              className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {props.data.map((sts, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-no-wrap">
                {sts.borrow_sts_id}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                {sts.borrow_sts_status}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                {sts.borrow_sts_description}
              </td>
              <td>
                <Link
                  href={`/elibrary_ui/admin/monograph-borrow-status/${sts.borrow_sts_id}`}
                >
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    update
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
