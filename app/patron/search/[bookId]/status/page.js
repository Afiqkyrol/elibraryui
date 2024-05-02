"use client";

import StatusBookTable from "@/app/component/table/StatusBookTable";
import StatusBorrowTable from "@/app/component/table/StatusBorrowTabble";
import { useEffect, useState } from "react";
import Loading from "@/app/loading";
import PatronLeftSideBar from "@/app/component/PatronLeftSideBar";
import { fetchStatusBook, fetchStatusBorrow } from "@/api/patron/getApi";
import { useRouter } from "next/navigation";

export default function ShowReservationList({ params }) {
  const [reservationList, setReservationList] = useState([]);
  const [borrowedList, setBorrowedList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

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
    window.location.href = "/login";
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex h-screen">
      <PatronLeftSideBar />
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
          <button
            onClick={() => {
              router.back();
            }}
            class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Back
          </button>
          <center style={{ height: "50%" }}>
            <h1 className="text-3xl font-bold mb-4 text-center h-[10%]">
              Reservation
            </h1>
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
