import Link from "next/link";

export default function MonoLocTable(props) {
  return (
    <div className="container mx-auto" style={{ width: "95%" }}>
      <div className="flex gap-4">
        <Link href="/elibrary_ui/admin/monograph-location/add">
          <button className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add Monograph Location
          </button>
        </Link>
      </div>
      <br></br>
      <table className="min-w-full w-4/5">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Location
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Wilayah
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Code
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Telephone
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Address
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Created at
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {props.data.map((loc, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-no-wrap">{loc.loc_id}</td>
              <td className="px-6 py-4 whitespace-no-wrap">
                {loc.loc_location}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                {loc.loc_wilayah}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                {loc.loc_location_code}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                {loc.loc_telephone}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                {loc.loc_address}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                {String(loc.loc_created_at).substring(0, 10)}
              </td>
              <td>
                <Link
                  href={`/elibrary_ui/admin/monograph-location/${loc.loc_id}`}
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
