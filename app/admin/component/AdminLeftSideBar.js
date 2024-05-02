"use client";

import Link from "next/link";

export default function AdminLeftSideBar() {
  return (
    <div class="bg-gray-800 w-64">
      <nav class="flex flex-col flex-1">
        <Link href="/admin" class="px-6 py-3 text-gray-300 hover:bg-gray-700">
          Dashboard
        </Link>
        <Link
          href="/admin/monograph-type"
          class="px-6 py-3 text-gray-300 hover:bg-gray-700"
        >
          Monograph Type
        </Link>
        <Link
          href="/admin/monograph-subject"
          class="px-6 py-3 text-gray-300 hover:bg-gray-700"
        >
          Monograph Subject
        </Link>
        <Link
          href="/admin/monograph-language"
          class="px-6 py-3 text-gray-300 hover:bg-gray-700"
        >
          Monograph Language
        </Link>
        <Link
          href="/admin/monograph-status"
          class="px-6 py-3 text-gray-300 hover:bg-gray-700"
        >
          Monograph Status
        </Link>
        <Link
          href="/admin/monograph-book-status"
          class="px-6 py-3 text-gray-300 hover:bg-gray-700"
        >
          Monograph Book Status
        </Link>
        <Link
          href="/admin/monograph-borrow-status"
          class="px-6 py-3 text-gray-300 hover:bg-gray-700"
        >
          Monograph Borrow Status
        </Link>
        <Link
          href="/admin/monograph-location"
          class="px-6 py-3 text-gray-300 hover:bg-gray-700"
        >
          Monograph Location
        </Link>
        <Link
          href="/admin/monograph-cataloging"
          class="px-6 py-3 text-gray-300 hover:bg-gray-700"
        >
          Monograph Cataloging
        </Link>
        <Link
          href="/admin/user"
          class="px-6 py-3 text-gray-300 hover:bg-gray-700"
        >
          User
        </Link>
        <Link
          href="/admin/user-role"
          class="px-6 py-3 text-gray-300 hover:bg-gray-700"
        >
          User Role
        </Link>
      </nav>
    </div>
  );
}
