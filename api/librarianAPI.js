import axiosInstance from "@/util/axiosInstance";

export async function fetchBookList() {
  const token = localStorage.getItem("auth-token");
  const response = await axiosInstance.get("/librarian/book-list", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
}

export async function fetchSearchBookResults(search_by, title, monograph_type) {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("search_by", search_by);
  formData.append("monograph_type", monograph_type);

  const token = localStorage.getItem("auth-token");

  const response = await axiosInstance.post(
    "/librarian/search-books",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
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
