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
