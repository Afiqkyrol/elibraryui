import axiosInstance from "@/util/axiosInstance";

export async function fetchBookList() {
  const token = localStorage.getItem("auth-token");
  const response = await axiosInstance.get("/librarian/book-list-details", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
}

export async function fetchBookListV2() {
  const token = localStorage.getItem("auth-token");
  const response = await axiosInstance.get("/librarian/book-list-details-v2", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
}

export async function fetchBookCopyListV2(isbn) {
  const token = localStorage.getItem("auth-token");
  const response = await axiosInstance.get(
    `/librarian/book-list-details-v2/${isbn}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
}

export async function fetchEBookList() {
  const token = localStorage.getItem("auth-token");
  const response = await axiosInstance.get("/librarian/ebook-list-details", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
}

export async function fetchMonographAbout(reg_id) {
  const token = localStorage.getItem("auth-token");
  const response = await axiosInstance.get(`/librarian/book-list/${reg_id}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  console.log(response.data);
  return response.data;
}

export async function fetchStatusBook(book_id) {
  const token = localStorage.getItem("auth-token");
  const response = await axiosInstance.get(
    `/librarian/status-book/${book_id}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
}

export async function fetchStatusBorrow(book_id) {
  const token = localStorage.getItem("auth-token");
  const response = await axiosInstance.get(
    `/librarian/status-borrow/${book_id}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
}

export async function fetchUser(user_id) {
  const token = localStorage.getItem("auth-token");
  const response = await axiosInstance.get(`/librarian/user/${user_id}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
}

export async function fetchUserById(user_id) {
  const token = localStorage.getItem("auth-token");
  const response = await axiosInstance.get(
    `/librarian/user_details/${user_id}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
}

export async function fetchReservationList() {
  const token = localStorage.getItem("auth-token");
  const response = await axiosInstance.get("/librarian/reservation-list", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
}

export async function fetchReservationListSearch(acc_number) {
  const token = localStorage.getItem("auth-token");
  const response = await axiosInstance.get(
    `/librarian/reservation-list/accession-no/${acc_number}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
}

export async function fetchReservedBookDetails(reserve_id) {
  const token = localStorage.getItem("auth-token");
  const response = await axiosInstance.get(
    `/librarian/reservation-list/${reserve_id}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
}

export async function fetchExtendApplicationList() {
  const token = localStorage.getItem("auth-token");
  const response = await axiosInstance.get("/librarian/extend-list", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
}

export async function fetchExtendApplication(history_id) {
  const token = localStorage.getItem("auth-token");
  const response = await axiosInstance.get(
    `/librarian/extend-list/${history_id}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
}

export async function fetchReturnList() {
  const token = localStorage.getItem("auth-token");
  const response = await axiosInstance.get(`/librarian/return-list`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
}

export async function fetchReturnListSearch(acc_number) {
  const token = localStorage.getItem("auth-token");
  const response = await axiosInstance.get(
    `/librarian/return-list/accession-no/${acc_number}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
}

export async function fetchBorrowedBook(history_id) {
  const token = localStorage.getItem("auth-token");
  const response = await axiosInstance.get(
    `/librarian/extend-list/${history_id}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
}

export async function fetchDamagedBookList() {
  const token = localStorage.getItem("auth-token");
  const response = await axiosInstance.get(`/librarian/damaged-list`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
}

export async function fetchDamagedBookDetails(damaged_id) {
  const token = localStorage.getItem("auth-token");
  const response = await axiosInstance.get(
    `/librarian/damaged-list/${damaged_id}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
}

export async function fetchRegMonographDetails(book_id) {
  const token = localStorage.getItem("auth-token");
  const response = await axiosInstance.get(
    `/librarian/monograph-list/${book_id}`,
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
    `/librarian/monograph-list/details/${book_id}`,
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
    `/librarian/monograph-list/marctag/${book_id}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
}

export async function fetchCataloging() {
  const token = localStorage.getItem("auth-token");
  const response = await axiosInstance.get(
    `/librarian/monograph-list/cataloging`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
}

export async function fetchCatalogingLanguage() {
  const token = localStorage.getItem("auth-token");
  const response = await axiosInstance.get(
    `/librarian/monograph-list/cataloging/language`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
}

export async function fetchCatalogingSubject() {
  const token = localStorage.getItem("auth-token");
  const response = await axiosInstance.get(
    `/librarian/monograph-list/cataloging/subject`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
}

export async function fetchCatalogingType() {
  const token = localStorage.getItem("auth-token");
  const response = await axiosInstance.get(
    `/librarian/monograph-list/cataloging/type`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
}

export async function fetchCatalogingOptions() {
  const token = localStorage.getItem("auth-token");
  const response = await axiosInstance.get(
    `/librarian/monograph-list/cataloging/options`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
}

export async function fetchAuthorList() {
  const token = localStorage.getItem("auth-token");
  const response = await axiosInstance.get(`/librarian/monograph/author`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
}

export async function fetchAuthor(author_id) {
  const token = localStorage.getItem("auth-token");
  const response = await axiosInstance.get(
    `/librarian/monograph/author/` + author_id,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
}

export async function fetchPublisherList() {
  const token = localStorage.getItem("auth-token");
  const response = await axiosInstance.get(`/librarian/monograph/publisher`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
}

export async function fetchPublisher(publisher_id) {
  const token = localStorage.getItem("auth-token");
  const response = await axiosInstance.get(
    `/librarian/monograph/publisher/` + publisher_id,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
}

export async function fetchMonographImage(book_id) {
  const token = localStorage.getItem("auth-token");
  const response = await axiosInstance.get(`/librarian/image/${book_id}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
}

export async function fetchMinDate(book_id) {
  const token = localStorage.getItem("auth-token");
  const response = await axiosInstance.get(
    `/librarian/min-reserved-date/${book_id}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
}

export async function fetchAvailableReturnDate(reserve_id) {
  const token = localStorage.getItem("auth-token");
  const response = await axiosInstance.get(
    `/librarian/available-return-date/${reserve_id}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
}

export async function fetchMonoStatusList() {
  const token = localStorage.getItem("auth-token");
  const response = await axiosInstance.get(`/librarian/monograph-status`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
}

export async function fetchLtMonoCat() {
  const token = localStorage.getItem("auth-token");
  const response = await axiosInstance.get(`/librarian/lt-mono-cat`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
}

export async function fetchDashboardReservationList() {
  const token = localStorage.getItem("auth-token");
  const response = await axiosInstance.get(
    "/librarian/dashboard/reservation-list",
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
}

export async function fetchDashboardExtendApplicationList() {
  const token = localStorage.getItem("auth-token");
  const response = await axiosInstance.get("/librarian/dashboard/extend-list", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
}
