"use client";

import Link from "next/link";

export default function PatronLeftSideBar() {
  return (
    <div className={"bg-gray-800 w-64"}>
      <nav className="flex flex-col flex-1">
        <Link
          href="/elibrary_ui/patron"
          className="px-6 py-3 text-gray-300 hover:bg-gray-700"
        >
          Dashboard
        </Link>
        <Link
          href="/elibrary_ui/patron/search"
          className="px-6 py-3 text-gray-300 hover:bg-gray-700"
        >
          Search
        </Link>
        <Link
          href="/elibrary_ui/patron/borrowed"
          className="px-6 py-3 text-gray-300 hover:bg-gray-700"
        >
          List of Borrowed
        </Link>
        <Link
          href="/elibrary_ui/patron/reservation"
          className="px-6 py-3 text-gray-300 hover:bg-gray-700"
        >
          List of Reservation
        </Link>
        <Link
          href="/elibrary_ui/patron/history"
          className="px-6 py-3 text-gray-300 hover:bg-gray-700"
        >
          History
        </Link>
      </nav>
    </div>
  );
}
