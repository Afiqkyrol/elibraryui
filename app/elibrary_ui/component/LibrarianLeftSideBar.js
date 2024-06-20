"use client";

import Link from "next/link";

export default function LibrarianLeftSideBar() {
  return (
    <div className="bg-gray-800 w-1/6 h-screen">
      <nav className="flex flex-col flex-1">
        <Link
          href="/elibrary_ui/librarian"
          className="px-6 py-3 text-gray-300 hover:bg-gray-700"
        >
          Dashboard
        </Link>
        <Link
          href="/elibrary_ui/librarian/search"
          className="px-6 py-3 text-gray-300 hover:bg-gray-700"
        >
          Search
        </Link>
        <Link
          href="/elibrary_ui/librarian/monograph"
          className="px-6 py-3 text-gray-300 hover:bg-gray-700"
        >
          List of Monograph
        </Link>
        <Link
          href="/elibrary_ui/librarian/reservation"
          className="px-6 py-3 text-gray-300 hover:bg-gray-700"
        >
          List of Reservation
        </Link>
        <Link
          href="/elibrary_ui/librarian/extend"
          className="px-6 py-3 text-gray-300 hover:bg-gray-700"
        >
          List of Extend Application
        </Link>
        <Link
          href="/elibrary_ui/librarian/return"
          className="px-6 py-3 text-gray-300 hover:bg-gray-700"
        >
          List of Borrowed
        </Link>
        <Link
          href="/elibrary_ui/librarian/damaged"
          className="px-6 py-3 text-gray-300 hover:bg-gray-700"
        >
          List of Damaged
        </Link>
      </nav>
    </div>
  );
}
