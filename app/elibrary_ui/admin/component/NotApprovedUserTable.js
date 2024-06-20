import Link from "next/link";

export default function NotApprovedUserTable(props) {
  return (
    <div className="container" style={{ width: "90%", overflowX: "scroll" }}>
      <br></br>
      <table className="min-w-full w-4/5">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Fullname
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              User ID
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Role
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Reg_date
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Phone No
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Address1
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Address2
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              state
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Approved
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Approved by
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Approved_date
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {props.data.map((user, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-no-wrap">{user.id}</td>
              <td className="px-6 py-4 whitespace-no-wrap">{user.fullName}</td>
              <td className="px-6 py-4 whitespace-no-wrap">{user.username}</td>
              <td className="px-6 py-4 whitespace-no-wrap">{user.role_id}</td>
              <td className="px-6 py-4 whitespace-no-wrap">{user.email}</td>
              <td className="px-6 py-4 whitespace-no-wrap">
                {String(user.regDate).substring(0, 10)}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">{user.phoneNo}</td>
              <td className="px-6 py-4 whitespace-no-wrap">{user.address1}</td>
              <td className="px-6 py-4 whitespace-no-wrap">{user.address2}</td>
              <td className="px-6 py-4 whitespace-no-wrap">{user.state}</td>
              <td className="px-6 py-4 whitespace-no-wrap">{user.approved}</td>
              <td className="px-6 py-4 whitespace-no-wrap">
                {user.approvedBy}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                {String(user.approvedDate).substring(0, 10)}
              </td>
              <td>
                <Link href={`/elibrary_ui/admin/user/new/${user.id}`}>
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
