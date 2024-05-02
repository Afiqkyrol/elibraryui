import axiosInstance from "@/util/axiosInstance";

export async function deleteType(type_id) {
  const token = localStorage.getItem("auth-token");
  await axiosInstance.delete(`/admin/monograph-type/${type_id}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}

export async function deleteSubject(subject_id) {
  const token = localStorage.getItem("auth-token");
  await axiosInstance.delete(`/admin/monograph-subject/${subject_id}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}

export async function deleteLanguage(lang_id) {
  const token = localStorage.getItem("auth-token");
  await axiosInstance.delete(`/admin/monograph-language/${lang_id}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}

export async function deleteStatus(sts_id) {
  const token = localStorage.getItem("auth-token");
  await axiosInstance.delete(`/admin/monograph-status/${sts_id}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}

export async function deleteBorrowStatus(sts_id) {
  const token = localStorage.getItem("auth-token");
  await axiosInstance.delete(`/admin/monograph-borrow-status/${sts_id}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}

export async function deleteBookStatus(sts_id) {
  const token = localStorage.getItem("auth-token");
  await axiosInstance.delete(`/admin/monograph-book-status/${sts_id}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}

export async function deleteLocation(loc_id) {
  const token = localStorage.getItem("auth-token");
  await axiosInstance.delete(`/admin/monograph-location/${loc_id}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}

export async function deleteCataloging(cat_id) {
  const token = localStorage.getItem("auth-token");
  await axiosInstance.delete(`/admin/monograph-cataloging/${cat_id}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}

export async function deleteRole(role_id) {
  const token = localStorage.getItem("auth-token");
  await axiosInstance.delete(`/admin/user-role/${role_id}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}

export async function deleteUser(user_id) {
  const token = localStorage.getItem("auth-token");
  await axiosInstance.delete(`/admin/user/${user_id}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}
