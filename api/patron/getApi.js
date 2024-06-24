import axiosInstance from "@/util/axiosInstance";

//////////////////////////////////////////////////////////////////////////////////////////

export async function fetchReservationList() {
  const token = localStorage.getItem("auth-token");
  const user_id = localStorage.getItem("user_id");
  const response = await axiosInstance.get(
    `/patron/reservation-list/${user_id}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
}

export async function fetchBorrowedList() {
  const token = localStorage.getItem("auth-token");
  const user_id = localStorage.getItem("user_id");
  const response = await axiosInstance.get(`/patron/borrowed-list/${user_id}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
}

export async function fetchHistoryList() {
  const token = localStorage.getItem("auth-token");
  const user_id = localStorage.getItem("user_id");
  const response = await axiosInstance.get(`/patron/history-list/${user_id}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
}

export async function fetchBookList() {
  const token = localStorage.getItem("auth-token");
  const response = await axiosInstance.get("/patron/book-list-details", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
}

export async function fetchStatusBook(book_id) {
  const token = localStorage.getItem("auth-token");
  const response = await axiosInstance.get(`/patron/status-book/${book_id}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
}

export async function fetchStatusBorrow(book_id) {
  const token = localStorage.getItem("auth-token");
  const response = await axiosInstance.get(`/patron/status-borrow/${book_id}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
}

export async function fetchMonographAbout(reg_id) {
  const token = localStorage.getItem("auth-token");
  const response = await axiosInstance.get(`/patron/book-list/${reg_id}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  console.log(response.data);
  return response.data;
}

export async function fetchBorrowedBook(history_id) {
  const token = localStorage.getItem("auth-token");
  const response = await axiosInstance.get(
    `/patron/borrowed-list/book/${history_id}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
}

export async function checkIfReserved(book_id) {
  const token = localStorage.getItem("auth-token");
  const response = await axiosInstance.get(
    `/patron/book/check-reserve/${book_id}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
}

export async function fetchMonographDetails(book_id) {
  const token = localStorage.getItem("auth-token");
  const response = await axiosInstance.get(
    `/patron/monograph-list/details/${book_id}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
}

export async function fetchMonographMarcTag(book_id) {
  const token = localStorage.getItem("auth-token");
  const response = await axiosInstance.get(
    `/patron/monograph-list/marctag/${book_id}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
}

export async function fetchRegFeatured() {
  const token = localStorage.getItem("auth-token");
  const response = await axiosInstance.get("/patron/featured", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
}

export async function fetchMonographImage(book_id) {
  const token = localStorage.getItem("auth-token");
  const response = await axiosInstance.get(`/patron/image/${book_id}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
}

export async function fetchMinDate(book_id) {
  const token = localStorage.getItem("auth-token");
  const response = await axiosInstance.get(
    `/patron/min-reserved-date/${book_id}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
}

//////////////////////////////////////////////////////////////////////////////////////////
