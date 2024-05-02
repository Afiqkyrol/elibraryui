import axiosInstance from "@/util/axiosInstance";

export async function updateMonoType(
  type_id,
  type_name,
  type_desc,
  type_active
) {
  const formData = new FormData();
  formData.append("type_name", type_name);
  formData.append("type_desc", type_desc);
  formData.append("type_active", type_active);

  const token = localStorage.getItem("auth-token");

  const response = await axiosInstance.put(
    `/admin/monograph-type/${type_id}`,
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

export async function updateMonoSubject(
  subject_id,
  subject_name,
  subject_desc,
  subject_active
) {
  const formData = new FormData();
  formData.append("subject_name", subject_name);
  formData.append("subject_desc", subject_desc);
  formData.append("subject_active", subject_active);

  const token = localStorage.getItem("auth-token");

  const response = await axiosInstance.put(
    `/admin/monograph-subject/${subject_id}`,
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

export async function updateMonoLanguage(
  lang_id,
  lang_name,
  lang_desc,
  lang_active
) {
  const formData = new FormData();
  formData.append("lang_name", lang_name);
  formData.append("lang_desc", lang_desc);
  formData.append("lang_active", lang_active);

  const token = localStorage.getItem("auth-token");

  const response = await axiosInstance.put(
    `/admin/monograph-language/${lang_id}`,
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

export async function updateMonoStatus(sts_id, sts_status, sts_desc) {
  const formData = new FormData();
  formData.append("sts_status", sts_status);
  formData.append("sts_desc", sts_desc);

  const token = localStorage.getItem("auth-token");

  const response = await axiosInstance.put(
    `/admin/monograph-status/${sts_id}`,
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

export async function updateMonoBorrowStatus(
  borrow_sts_id,
  borrow_sts_status,
  borrow_sts_desc
) {
  const formData = new FormData();
  formData.append("borrow_sts_status", borrow_sts_status);
  formData.append("borrow_sts_desc", borrow_sts_desc);

  const token = localStorage.getItem("auth-token");

  const response = await axiosInstance.put(
    `/admin/monograph-borrow-status/${borrow_sts_id}`,
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

export async function updateMonoBookStatus(
  book_sts_id,
  book_sts_status,
  book_sts_desc
) {
  const formData = new FormData();
  formData.append("book_sts_status", book_sts_status);
  formData.append("book_sts_desc", book_sts_desc);

  const token = localStorage.getItem("auth-token");

  const response = await axiosInstance.put(
    `/admin/monograph-book-status/${book_sts_id}`,
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

export async function updateMonoLocation(
  loc_id,
  location,
  wilayah,
  code,
  telephone,
  address
) {
  const formData = new FormData();
  formData.append("loc_location", location);
  formData.append("loc_wilayah", wilayah);
  formData.append("loc_location_code", code);
  formData.append("loc_telephone", telephone);
  formData.append("loc_address", address);

  const token = localStorage.getItem("auth-token");

  const response = await axiosInstance.put(
    `/admin/monograph-location/${loc_id}`,
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

export async function updateMonoCataloging(
  cataloging_id,
  cataloging_tag,
  cataloging_Ind1,
  cataloging_Ind2,
  cataloging_data
) {
  const formData = new FormData();
  formData.append("cataloging_tag", cataloging_tag);
  formData.append("cataloging_Ind1", cataloging_Ind1);
  formData.append("cataloging_Ind2", cataloging_Ind2);
  formData.append("cataloging_data", cataloging_data);

  const token = localStorage.getItem("auth-token");

  const response = await axiosInstance.put(
    `/admin/monograph-cataloging/${cataloging_id}`,
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

export async function updateUserRole(
  roles_id,
  roles_type,
  roles_description,
  roles_active
) {
  const formData = new FormData();
  formData.append("roles_type", roles_type);
  formData.append("roles_description", roles_description);
  formData.append("roles_active", roles_active);

  const token = localStorage.getItem("auth-token");

  const response = await axiosInstance.put(
    `/admin/user-role/${roles_id}`,
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

export async function updateUser(
  user_id,
  username,
  fullName,
  address1,
  address2,
  state,
  email,
  phoneNo,
  role,
  role_id
) {
  const token = localStorage.getItem("auth-token");
  try {
    await axiosInstance.put(
      `/admin/user/${user_id}`,
      {
        username,
        fullName,
        address1,
        address2,
        state,
        email,
        phoneNo,
        role,
        role_id,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  } catch (error) {
    console.log(error.response);
  }
}

export async function updateNotApprovedUser(
  user_id,
  username,
  fullName,
  address1,
  address2,
  state,
  email,
  phoneNo,
  role,
  role_id,
  approved,
  approvedBy
) {
  const token = localStorage.getItem("auth-token");
  try {
    await axiosInstance.put(
      `/admin/not-approved-user/${user_id}`,
      {
        username,
        fullName,
        address1,
        address2,
        state,
        email,
        phoneNo,
        role,
        role_id,
        approved,
        approvedBy,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  } catch (error) {
    console.log(error.response);
  }
}
