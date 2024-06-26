import { imagePath } from "@/util/config";
import Link from "next/link";

export default function FeaturedDisplay({ data }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {data.map((ft, index) => (
        <Link key={index} href={`patron/search/${ft.reg_id}`}>
          <div className="bg-white shadow-md rounded-lg p-4">
            <img
              className="h-48 w-full object-cover rounded-md mb-4"
              src={imagePath + ft.reg_id}
              alt={ft.reg_title}
            />
            <p className="text-gray-600">Book ID: {ft.reg_id}</p>
            <h1 className="text-xl font-semibold text-gray-800 mb-2">
              {ft.reg_title}
            </h1>
            <p className="text-gray-700">{ft.reg_description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
