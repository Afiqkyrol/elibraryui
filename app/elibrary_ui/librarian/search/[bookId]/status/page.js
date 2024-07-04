"use client";

import StatusBookTable from "@/app/elibrary_ui/librarian/component/StatusBookTable";
import StatusBorrowTable from "@/app/elibrary_ui/librarian/component/StatusBorrowTabble";
import { useEffect, useState } from "react";
import Loading from "@/app/elibrary_ui/loading";
import LibrarianLeftSideBar from "@/app/elibrary_ui/component/LibrarianLeftSideBar";
import { fetchStatusBook, fetchStatusBorrow } from "@/api/librarian/getApi";

export default function ShowReservationList({ params }) {
  const [reservationList, setReservationList] = useState([]);
  const [borrowedList, setBorrowedList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getStatusBook() {
      setReservationList(await fetchStatusBook(params.bookId));
      setBorrowedList(await fetchStatusBorrow(params.bookId));
    }

    getStatusBook();
    setIsLoading(false);
  }, []);

  function logoutHandler() {
    setIsLoading(true);
    localStorage.clear();
    window.close();
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex h-screen">
      <LibrarianLeftSideBar />
      <div className="flex-1 flex flex-col">
        <div className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center">
          <p className="items-start w-1/2 text-left">
            {localStorage.getItem("fullname")}
          </p>
          <p className="items-start w-1/2 text-center">Book Status</p>
          <button
            class="text-white hover:text-gray-400 w-1/2 text-right"
            onClick={logoutHandler}
          >
            Logout
          </button>
        </div>
        <div style={{ height: "100%" }}>
          <center style={{ height: "50%" }}>
            <br></br>
            <h1 className="text-3xl font-bold mb-4 text-center">Reservation</h1>
            <StatusBookTable data={reservationList} id={params.bookId} />
          </center>
          <center style={{ height: "50%" }}>
            <br></br>
            <h1 className="text-3xl font-bold mb-4 text-center justify-center">
              Borrowed
            </h1>
            <StatusBorrowTable data={borrowedList} />
          </center>
        </div>
      </div>
    </div>
  );
}
