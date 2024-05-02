import Link from "next/link";

export default function ReservationListTableWithAction(props) {
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
              Patron ID
            </th>
            <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Date Reserved
            </th>
            <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          {props.data.map((book, index) => (
            <tr key={index}>
              <td class="px-6 py-4 whitespace-no-wrap">{book.book_id}</td>
              <td class="px-6 py-4 whitespace-no-wrap">
                <Link
                  href="#"
                  className="text-blue-600 hover:underline"
                  style={{ color: "blue" }}
                >
                  {book.book_title}
                </Link>
              </td>
              <td class="px-6 py-4 whitespace-no-wrap">{book.user_id}</td>
              <td class="px-6 py-4 whitespace-no-wrap">{book.user_name}</td>
              <td class="px-6 py-4 whitespace-no-wrap">{book.date_reserved}</td>
              <td class="px-6 py-4 whitespace-no-wrap">{book.status}</td>
              <td class="px-6 py-4 whitespace-no-wrap"></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
