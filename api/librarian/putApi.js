import axiosInstance from "@/util/axiosInstance";

export async function updateReservationStatus(
  reserve_id,
  reserved_date,
  status
) {
  const formData = new FormData();
  formData.append("reserved_date", reserved_date);
  formData.append("status", status);

  const token = localStorage.getItem("auth-token");

  const response = await axiosInstance.put(
    `/librarian/reservation-list/${reserve_id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token,
      },
    }
  );

  return response;
}

export async function updateReservationStatusClosed(reserve_id, status) {
  const formData = new FormData();
  formData.append("status", status);

  const token = localStorage.getItem("auth-token");

  const response = await axiosInstance.put(
    `/librarian/reservation-list/closed/${reserve_id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token,
      },
    }
  );

  return response;
}

export async function updateExtendApplicationStatus(
  history_id,
  extend_date,
  status
) {
  const formData = new FormData();
  formData.append("extend_date", extend_date);
  formData.append("status", status);

  const token = localStorage.getItem("auth-token");

  const response = await axiosInstance.put(
    `/librarian/extend-list/${history_id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token,
      },
    }
  );

  return response;
}

export async function updateReturnBorrowedBook(history_id, late) {
  let history_late = "no";

  if (late) {
    history_late = "yes";
  }

  const formData = new FormData();
  formData.append("history_late", history_late);

  const token = localStorage.getItem("auth-token");

  const response = await axiosInstance.put(
    `/librarian/return-list/${history_id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token,
      },
    }
  );

  return response;
}

export async function updateDamagedBookDetails(damaged_id, damaged_details) {
  const formData = new FormData();
  formData.append("damaged_details", damaged_details);

  const token = localStorage.getItem("auth-token");

  const response = await axiosInstance.put(
    `/librarian/damaged-list/${damaged_id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token,
      },
    }
  );

  return response;
}

export async function updateRegMonograph(
  reg_id,
  file,
  title,
  description,
  reg_featured,
  reg_publish,
  reg_ebook,
  status
) {
  if (file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("reg_featured", reg_featured);
    formData.append("reg_publish", reg_publish);
    formData.append("reg_ebook", reg_ebook);
    formData.append("status", status);

    const token = localStorage.getItem("auth-token");

    const response = await axiosInstance.put(
      `/librarian/monograph-list/update/${reg_id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      }
    );

    return response.data;
  } else {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("reg_featured", reg_featured);
    formData.append("reg_publish", reg_publish);
    formData.append("reg_ebook", reg_ebook);
    formData.append("status", status);

    const token = localStorage.getItem("auth-token");

    const response = await axiosInstance.put(
      `/librarian/monograph-list/update-without-image/${reg_id}`,
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
}

export async function updateNewCatalog(mono_id, tag, ind1, ind2, data) {
  const librarian_id = localStorage.getItem("user_id");
  const formData = new FormData();
  formData.append("mono_id", mono_id);
  formData.append("tag", tag);
  formData.append("ind1", ind1);
  formData.append("ind2", ind2);
  formData.append("data", data);

  const token = localStorage.getItem("auth-token");

  const response = await axiosInstance.put(
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

export async function updateAuthor(
  author_id,
  author_name,
  email,
  telephone,
  publisher
) {
  const formData = new FormData();
  formData.append("author_name", author_name);
  formData.append("author_email", email);
  formData.append("author_telephone", telephone);
  formData.append("publisher_id", publisher);

  const token = localStorage.getItem("auth-token");

  const response = await axiosInstance.put(
    "/librarian/monograph/author/" + author_id,
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

export async function updatePublisher(
  publisher_id,
  publisher_name,
  address1,
  address2,
  address3,
  email,
  telephone
) {
  const formData = new FormData();
  formData.append("publisher_name", publisher_name);
  formData.append("publisher_address1", address1);
  formData.append("publisher_address2", address2);
  formData.append("publisher_address3", address3);
  formData.append("publisher_telephone", telephone);
  formData.append("publisher_email", email);

  const token = localStorage.getItem("auth-token");

  const response = await axiosInstance.put(
    "/librarian/monograph/publisher/" + publisher_id,
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
