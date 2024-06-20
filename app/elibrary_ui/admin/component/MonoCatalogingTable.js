import Link from "next/link";

export default function MonoCatalogingTable(props) {
  return (
    <div className="container mx-auto" style={{ width: "95%" }}>
      <div className="flex gap-4">
        <Link href="/elibrary_ui/admin/monograph-cataloging/add">
          <button className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add Monograph Catalog
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
              tag
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Ind 1
            </th>

            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Ind 2
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Data
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
          {props.data.map((cat, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-no-wrap">
                {cat.cataloging_id}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                {cat.cataloging_tag}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                {cat.cataloging_Ind1}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                {cat.cataloging_Ind2}
              </td>

              <td className="px-6 py-4 whitespace-no-wrap">
                {cat.cataloging_data}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                {String(cat.cataloging_created_at).substring(0, 10)}
              </td>
              <td>
                <Link
                  href={`/elibrary_ui/admin/monograph-cataloging/${cat.cataloging_id}`}
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
