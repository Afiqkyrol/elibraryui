import { imagePath } from "@/util/config";
import Link from "next/link";

export default function CatalogDetailsListTable({ data, image }) {
  if (
    data &&
    data.cataloging &&
    data.cataloging.length > 0 &&
    data.catalog &&
    data.catalog.length > 0
  ) {
    return (
      <div className="container mx-auto" style={{ width: "95%" }}>
        <img
          style={{ height: "140px", width: "100px" }}
          src={imagePath + image}
        />
        <img
          style={{ height: "100px", width: "200px" }}
          src={
            "https://barcode.tec-it.com/barcode.ashx?data=" +
            9781234567897 +
            "&code=ISBN13&translate-esc=on"
          }
        />
        <table className="min-w-full w-4/5">
          <thead>
            <tr>
              <th
                style={{ width: "35%" }}
                className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
              >
                Description
              </th>
              <th
                style={{ width: "65%" }}
                className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
              >
                Data
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.cataloging.map((book, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-no-wrap">
                  {book.cataloging_data}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  <Link href={`#`} className="text-blue-600 hover:underline">
                    {data.catalog[index].catreg_data}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
