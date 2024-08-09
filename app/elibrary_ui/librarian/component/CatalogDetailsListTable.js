import { barcodePath, imagePath } from "@/util/config";
import Link from "next/link";
import { useState } from "react";

export default function CatalogDetailsListTable({
  data,
  image,
  isbnNum,
  setIsbnNum,
}) {
  if (
    data &&
    data.cataloging &&
    data.cataloging.length > 0 &&
    data.catalog &&
    data.catalog.length > 0
  ) {
    for (let i = 0; i < data.catalog.length; i++) {
      if (data.catalog[i].catreg_tag == 3) {
        // setIsbnNum(data.cataloging[i].)
        // console.log(data.cataloging[i]);
        setIsbnNum(data.catalog[i].catreg_data);
      }
    }
    return (
      <div className="container mx-auto" style={{ width: "95%" }}>
        <img
          style={{ height: "280px", width: "200px" }}
          src={imagePath + image}
        />
        <img
          style={{ height: "80px", width: "200px" }}
          src={
            "https://barcode.tec-it.com/barcode.ashx?data=" +
            isbnNum +
            "&code=ISBN13&translate-esc=on"
          }
        />
        <Link href={barcodePath + isbnNum} target="_blank">
          <button>Download Barcode</button>
        </Link>
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
                  {data.catalog[index].catreg_data}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
