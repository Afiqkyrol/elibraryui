"use client";

import Link from "next/link";

export default function LibrarianLeftSideBar() {
  return (
    <div class="bg-gray-800 w-64">
      <nav class="flex flex-col flex-1">
        <Link
          href="/librarian"
          class="px-6 py-3 text-gray-300 hover:bg-gray-700"
        >
          Dashboard
        </Link>
        <Link
          href="/librarian/search"
          class="px-6 py-3 text-gray-300 hover:bg-gray-700"
        >
          Search
        </Link>
        <Link
          href="/librarian/monograph"
          class="px-6 py-3 text-gray-300 hover:bg-gray-700"
        >
          List of Monograph
        </Link>
        <Link
          href="/librarian/reservation"
          class="px-6 py-3 text-gray-300 hover:bg-gray-700"
        >
          List of Reservation
        </Link>
        <Link
          href="/librarian/extend"
          class="px-6 py-3 text-gray-300 hover:bg-gray-700"
        >
          List of Extend Application
        </Link>
        <Link
          href="/librarian/return"
          class="px-6 py-3 text-gray-300 hover:bg-gray-700"
        >
          List of Borrowed
        </Link>
        <Link
          href="/librarian/damaged"
          class="px-6 py-3 text-gray-300 hover:bg-gray-700"
        >
          List of Damaged
        </Link>
      </nav>
    </div>
  );
}
