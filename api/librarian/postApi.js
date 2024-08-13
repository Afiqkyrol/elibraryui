import axiosInstance from "@/util/axiosInstance";

export async function fetchSearchBookResults(search_by, title, monograph_type) {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("search_by", search_by);
  formData.append("monograph_type", monograph_type);

  const token = localStorage.getItem("auth-token");

  const response = await axiosInstance.post(
    "/librarian/book-list/search-books",
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

export async function fetchSearchBookResultsV2(category, title) {
  const formData = new FormData();
  formData.append("category", category);
  formData.append("title", title);

  const token = localStorage.getItem("auth-token");

  const response = await axiosInstance.post(
    "/librarian/book-list/search-books-v2",
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
    "/librarian/ebook-list-details/search-ebook",
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

export async function saveBookReservation(book_id, user_id, booking_date) {
  const formData = new FormData();
  formData.append("book_id", book_id);
  formData.append("user_id", user_id);
  formData.append("booking_date", booking_date);

  const token = localStorage.getItem("auth-token");

  const response = await axiosInstance.post(
    "/librarian/book/reserve",
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

export async function saveBorrowedBook(reserve_id, return_date) {
  const librarian_id = localStorage.getItem("user_id");
  const formData = new FormData();
  formData.append("librarian_id", librarian_id);
  formData.append("return_date", return_date);

  const token = localStorage.getItem("auth-token");

  const response = await axiosInstance.post(
    `/librarian/borrow/${reserve_id}`,
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

export async function saveDamagedBook(
  mono_id,
  damaged_description,
  last_person
) {
  const librarian_id = localStorage.getItem("user_id");
  const formData = new FormData();
  formData.append("mono_id", mono_id);
  formData.append("damaged_description", damaged_description);
  formData.append("last_person", last_person);
  formData.append("librarian_id", librarian_id);

  const token = localStorage.getItem("auth-token");

  const response = await axiosInstance.post(
    "/librarian/return-list/damage",
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

export async function saveRegMonograph(
  file,
  title,
  description,
  reg_featured,
  reg_publish,
  reg_ebook,
  status
) {
  const librarian_id = localStorage.getItem("username");
  const formData = new FormData();
  formData.append("file", file);
  formData.append("title", title);
  formData.append("description", description);
  formData.append("reg_featured", reg_featured);
  formData.append("reg_publish", reg_publish);
  formData.append("reg_ebook", reg_ebook);
  formData.append("reg_by", librarian_id);
  formData.append("status", status);

  const token = localStorage.getItem("auth-token");

  const response = await axiosInstance.post(
    "/librarian/monograph-list/add",
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

export async function saveRegEbook(
  file,
  pdf,
  title,
  description,
  reg_featured,
  reg_publish,
  reg_ebook,
  status
) {
  const librarian_id = localStorage.getItem("username");
  const formData = new FormData();
  formData.append("file", file);
  formData.append("pdf", pdf);
  formData.append("title", title);
  formData.append("description", description);
  formData.append("reg_featured", reg_featured);
  formData.append("reg_publish", reg_publish);
  formData.append("reg_ebook", reg_ebook);
  formData.append("reg_by", librarian_id);
  formData.append("status", status);

  const token = localStorage.getItem("auth-token");

  const response = await axiosInstance.post(
    "/librarian/ebook-list/add",
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

export async function saveNewCatalog(tag, cat_id, mono_id, ind1, ind2, data) {
  const librarian_id = localStorage.getItem("user_id");
  const formData = new FormData();
  formData.append("tag", tag);
  formData.append("cat_id", cat_id);
  formData.append("mono_id", mono_id);
  formData.append("ind1", ind1);
  formData.append("ind2", ind2);
  formData.append("data", data);

  const token = localStorage.getItem("auth-token");

  const response = await axiosInstance.post(
    "/librarian/monograph-list/catalog",
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

export async function saveAuthor(author_name, email, telephone, publisher) {
  const librarian_id = localStorage.getItem("user_id");
  const formData = new FormData();
  formData.append("author_name", author_name);
  formData.append("author_email", email);
  formData.append("author_telephone", telephone);
  formData.append("publisher_id", publisher);

  const token = localStorage.getItem("auth-token");

  const response = await axiosInstance.post(
    "/librarian/monograph/author",
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

export async function savePublisher(
  publisher_name,
  address1,
  address2,
  address3,
  email,
  telephone
) {
  const librarian_id = localStorage.getItem("user_id");
  const formData = new FormData();
  formData.append("publisher_name", publisher_name);
  formData.append("publisher_address1", address1);
  formData.append("publisher_address2", address2);
  formData.append("publisher_address3", address3);
  formData.append("publisher_telephone", telephone);
  formData.append("publisher_email", email);

  const token = localStorage.getItem("auth-token");

  const response = await axiosInstance.post(
    "/librarian/monograph/publisher",
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

export async function saveRegMonographWithoutImage(
  title,
  description,
  reg_featured,
  reg_publish,
  reg_ebook,
  status
) {
  const librarian_id = localStorage.getItem("username");
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("reg_featured", reg_featured);
  formData.append("reg_publish", reg_publish);
  formData.append("reg_ebook", reg_ebook);
  formData.append("reg_by", librarian_id);
  formData.append("status", status);

  const token = localStorage.getItem("auth-token");

  const response = await axiosInstance.post(
    "/librarian/monograph-list/add-without-image",
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

export async function saveRegEbookWithoutImage(
  pdf,
  title,
  description,
  reg_featured,
  reg_publish,
  reg_ebook,
  status
) {
  const librarian_id = localStorage.getItem("username");
  const formData = new FormData();
  formData.append("pdf", pdf);
  formData.append("title", title);
  formData.append("description", description);
  formData.append("reg_featured", reg_featured);
  formData.append("reg_publish", reg_publish);
  formData.append("reg_ebook", reg_ebook);
  formData.append("reg_by", librarian_id);
  formData.append("status", status);

  const token = localStorage.getItem("auth-token");

  const response = await axiosInstance.post(
    "/librarian/ebook-list/add-without-image",
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
