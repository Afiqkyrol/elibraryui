import axiosInstance from "@/util/axiosInstance";

//////////////////////////////////////////////////////////////////////////////////////////

export async function fetchSearchBookResults(search_by, title, monograph_type) {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("search_by", search_by);
  formData.append("monograph_type", monograph_type);

  const token = localStorage.getItem("auth-token");

  const response = await axiosInstance.post(
    "/patron/book-list/search-books",
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

//////////////////////////////////////////////////////////////////////////////////////////

export async function saveBookReservation(book_id, user_id, booking_date) {
  const formData = new FormData();
  formData.append("book_id", book_id);
  formData.append("user_id", user_id);
  formData.append("booking_date", booking_date);

  const token = localStorage.getItem("auth-token");

  const response = await axiosInstance.post("/patron/book/reserve", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + token,
    },
  });

  return response.data;
}

export async function fetchSearchBookResultsV2(category, title) {
  const formData = new FormData();
  formData.append("category", category);
  formData.append("title", title);

  const token = localStorage.getItem("auth-token");

  const response = await axiosInstance.post(
    "/patron/book-list/search-books-v2",
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

export async function fetchSearchEBookResults(category, title) {
  const formData = new FormData();
  formData.append("category", category);
  formData.append("title", title);
  formData.append("monograph_type", "test");

  const token = localStorage.getItem("auth-token");

  const response = await axiosInstance.post(
    "/patron/ebook-list-details/search-ebook",
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
