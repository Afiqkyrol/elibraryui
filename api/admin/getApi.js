import axiosInstance from "@/util/axiosInstance";

export async function fetchMonoTypeList() {
  const token = localStorage.getItem("auth-token");
  const response = await axiosInstance.get(`/admin/monograph-type`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
}

export async function fetchMonoType(type_id) {
  const token = localStorage.getItem("auth-token");
  const response = await axiosInstance.get(`/admin/monograph-type/${type_id}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
}

export async function fetchMonoSubjectList() {
  const token = localStorage.getItem("auth-token");
  const response = await axiosInstance.get(`/admin/monograph-subject`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
}

export async function fetchMonoSubject(subject_id) {
  const token = localStorage.getItem("auth-token");
  const response = await axiosInstance.get(
    `/admin/monograph-subject/${subject_id}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
}

export async function fetchMonoLanguageList() {
  const token = localStorage.getItem("auth-token");
  const response = await axiosInstance.get(`/admin/monograph-language`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
}

export async function fetchMonoLanguage(lang_id) {
  const token = localStorage.getItem("auth-token");
  const response = await axiosInstance.get(
    `/admin/monograph-language/${lang_id}`,
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
  const response = await axiosInstance.get(`/admin/monograph-status`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
}

export async function fetchMonoStatus(sts_id) {
  const token = localStorage.getItem("auth-token");
  const response = await axiosInstance.get(
    `/admin/monograph-status/${sts_id}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
}

export async function fetchMonoBorrowStatusList() {
  const token = localStorage.getItem("auth-token");
  const response = await axiosInstance.get(`/admin/monograph-borrow-status`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
}

export async function fetchMonoBorrowStatus(borrow_sts_id) {
  const token = localStorage.getItem("auth-token");
  const response = await axiosInstance.get(
    `/admin/monograph-borrow-status/${borrow_sts_id}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
}

export async function fetchMonoBookStatusList() {
  const token = localStorage.getItem("auth-token");
  const response = await axiosInstance.get(`/admin/monograph-book-status`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
}

export async function fetchMonoBookStatus(book_sts_id) {
  const token = localStorage.getItem("auth-token");
  const response = await axiosInstance.get(
    `/admin/monograph-book-status/${book_sts_id}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
}

export async function fetchMonoLocationList() {
  const token = localStorage.getItem("auth-token");
  const response = await axiosInstance.get(`/admin/monograph-location`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
}

export async function fetchMonoLocation(loc_id) {
  const token = localStorage.getItem("auth-token");
  const response = await axiosInstance.get(
    `/admin/monograph-location/${loc_id}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
}

export async function fetchMonoCatalogingList() {
  const token = localStorage.getItem("auth-token");
  const response = await axiosInstance.get(`/admin/monograph-cataloging`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
}

export async function fetchMonoCataloging(cataloging_id) {
  const token = localStorage.getItem("auth-token");
  const response = await axiosInstance.get(
    `/admin/monograph-cataloging/${cataloging_id}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
}

export async function fetchUserRoleList() {
  const token = localStorage.getItem("auth-token");
  const response = await axiosInstance.get(`/admin/user-role`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
}

export async function fetchUserRole(roles_id) {
  const token = localStorage.getItem("auth-token");
  const response = await axiosInstance.get(`/admin/user-role/${roles_id}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
}

export async function fetchApprovedUserList() {
  const token = localStorage.getItem("auth-token");
  const response = await axiosInstance.get(`/admin/approved-user`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
}

export async function fetchNotApprovedUserList() {
  const token = localStorage.getItem("auth-token");
  const response = await axiosInstance.get(`/admin/not-approved-user`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
}

export async function fetchUser(user_id) {
  const token = localStorage.getItem("auth-token");
  const response = await axiosInstance.get(`/admin/user/${user_id}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
}
