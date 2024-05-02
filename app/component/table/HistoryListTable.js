import Link from "next/link";

export default function HistoryListTable(props) {
  return (
    <div class="container mx-auto" style={{ width: "95%" }}>
      <table class="min-w-full">
        <thead>
          <tr>
            <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Book ID
            </th>
            <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Date Borrowed
            </th>
            <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Est Date return
            </th>
            <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Act Return Date
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          {props.data.map((book, index) => (
            <tr key={index}>
              <td class="px-6 py-4 whitespace-no-wrap">{book.book_id}</td>
              <td class="px-6 py-4 whitespace-no-wrap">
                <Link
                  href={`/patron/search/${book.reg_id}`}
                  class="text-blue-600 hover:underline"
                  style={{ color: "blue" }}
                >
                  {book.book_title}
                </Link>
              </td>
              <td class="px-6 py-4 whitespace-no-wrap">
                {String(book.date_borrowed).substring(0, 10)}
              </td>
              <td class="px-6 py-4 whitespace-no-wrap">
                {book.extend_date != null
                  ? String(book.extend_date).substring(0, 10)
                  : String(book.est_date_to_return).substring(0, 10)}
              </td>
              <td class="px-6 py-4 whitespace-no-wrap">
                {String(book.act_date_return).substring(0, 10)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
