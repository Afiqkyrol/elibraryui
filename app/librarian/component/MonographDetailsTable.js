export default function MonographDetailsTable({ data }) {
  return (
    <div
      className="container"
      style={{ width: "95%", height: "100%", overflowY: "scroll" }}
    >
      <table className="min-w-full" style={{}}>
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Data
            </th>
          </tr>
        </thead>
        <tbody
          className="bg-white divide-y divide-gray-200"
          style={{ height: "100%", overflowY: "scroll" }}
        >
          <tr>
            <td className="px-6 py-4 whitespace-no-wrap">Conntrol number</td>
            <td className="px-6 py-4 whitespace-no-wrap">
              {data.monograph.reg_control_no}
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-no-wrap">control</td>
            <td className="px-6 py-4 whitespace-no-wrap">test</td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-no-wrap">
              Date/Time Last transaction{" "}
            </td>
            <td className="px-6 py-4 whitespace-no-wrap">test</td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-no-wrap">ISBN</td>
            <td className="px-6 py-4 whitespace-no-wrap">
              {data.monograph.reg_ISBN}
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-no-wrap">Cataloging Source </td>
            <td className="px-6 py-4 whitespace-no-wrap">test</td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-no-wrap">Language Code</td>
            <td className="px-6 py-4 whitespace-no-wrap">
              {data.language.lang_type}
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-no-wrap">DDC Call no</td>
            <td className="px-6 py-4 whitespace-no-wrap">
              {data.monograph.reg_ddc_call_no}
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-no-wrap">Call Number</td>
            <td className="px-6 py-4 whitespace-no-wrap">test</td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-no-wrap">Author</td>
            <td className="px-6 py-4 whitespace-no-wrap">
              {data.author.author_name}
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-no-wrap">Title</td>
            <td className="px-6 py-4 whitespace-no-wrap">
              {data.monograph.reg_title}
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-no-wrap">Publisher </td>
            <td className="px-6 py-4 whitespace-no-wrap">
              {data.publisher.publisher_name}
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-no-wrap">Collation</td>
            <td className="px-6 py-4 whitespace-no-wrap">
              {data.monograph.reg_collation}
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-no-wrap">Catalog Notes</td>
            <td className="px-6 py-4 whitespace-no-wrap">
              {data.monograph.reg_catalog_notes}
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-no-wrap">
              Subject-Personal Name{" "}
            </td>
            <td className="px-6 py-4 whitespace-no-wrap">test</td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-no-wrap">
              Topical term - subject added entry{" "}
            </td>
            <td className="px-6 py-4 whitespace-no-wrap">test</td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-no-wrap">
              Geography - subject added entry
            </td>
            <td className="px-6 py-4 whitespace-no-wrap">test</td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-no-wrap">Accession no </td>
            <td className="px-6 py-4 whitespace-no-wrap">test</td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-no-wrap">Document Type</td>
            <td className="px-6 py-4 whitespace-no-wrap">
              {data.type.type_type}
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-no-wrap">Subject</td>
            <td className="px-6 py-4 whitespace-no-wrap">test</td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-no-wrap">Format</td>
            <td className="px-6 py-4 whitespace-no-wrap">test</td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-no-wrap">Cataloging Level</td>
            <td className="px-6 py-4 whitespace-no-wrap">test</td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-no-wrap">Quantity</td>
            <td className="px-6 py-4 whitespace-no-wrap">test</td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-no-wrap">Location</td>
            <td className="px-6 py-4 whitespace-no-wrap">test</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
