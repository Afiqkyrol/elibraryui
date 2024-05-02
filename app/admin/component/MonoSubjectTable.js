import Link from "next/link";

export default function MonoSubjectTable(props) {
  return (
    <div className="container mx-auto" style={{ width: "95%" }}>
      <div className="flex gap-4">
        <Link href="/admin/monograph-subject/add">
          <button className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add Monograph Subject
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
              Type
            </th>
            <th
              style={{ width: "25%" }}
              className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
            >
              Description
            </th>

            <th
              style={{ width: "5%" }}
              className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
            >
              Subject Active
            </th>

            <th
              style={{ width: "20%" }}
              className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
            >
              Created at
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
          {props.data.map((subject, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-no-wrap">
                {subject.subject_id}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                {subject.subject_subject}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                {subject.subject_description}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                {subject.subject_active}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                {String(subject.subject_created_at).substring(0, 10)}
              </td>
              <td>
                <Link href={`/admin/monograph-subject/${subject.subject_id}`}>
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
