import axiosInstance from "@/util/axiosInstance";

export async function saveMonoType(type_name, type_desc, type_active) {
  const formData = new FormData();
  formData.append("type_name", type_name);
  formData.append("type_desc", type_desc);
  formData.append("type_active", type_active);

  const token = localStorage.getItem("auth-token");

  const response = await axiosInstance.post("/admin/monograph-type", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + token,
    },
  });

  return response;
}

export async function saveMonoSubject(
  subject_name,
  subject_desc,
  subject_active
) {
  const formData = new FormData();
  formData.append("subject_name", subject_name);
  formData.append("subject_desc", subject_desc);
  formData.append("subject_active", subject_active);

  const token = localStorage.getItem("auth-token");

  const response = await axiosInstance.post(
    "/admin/monograph-subject",
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

export async function saveMonoLanguage(lang_name, lang_desc, lang_active) {
  const formData = new FormData();
  formData.append("lang_name", lang_name);
  formData.append("lang_desc", lang_desc);
  formData.append("lang_active", lang_active);

  const token = localStorage.getItem("auth-token");

  const response = await axiosInstance.post(
    "/admin/monograph-language",
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

export async function saveMonoStatus(sts_status, sts_desc) {
  const formData = new FormData();
  formData.append("sts_status", sts_status);
  formData.append("sts_desc", sts_desc);

  const token = localStorage.getItem("auth-token");

  const response = await axiosInstance.post(
    "/admin/monograph-status",
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

export async function saveMonoBorrowStatus(borrow_sts_status, borrow_sts_desc) {
  const formData = new FormData();
  formData.append("borrow_sts_status", borrow_sts_status);
  formData.append("borrow_sts_desc", borrow_sts_desc);

  const token = localStorage.getItem("auth-token");

  const response = await axiosInstance.post(
    "/admin/monograph-borrow-status",
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

export async function saveMonoBookStatus(book_sts_status, book_sts_desc) {
  const formData = new FormData();
  formData.append("book_sts_status", book_sts_status);
  formData.append("book_sts_desc", book_sts_desc);

  const token = localStorage.getItem("auth-token");

  const response = await axiosInstance.post(
    "/admin/monograph-book-status",
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

export async function saveMonoLocation(
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

  const response = await axiosInstance.post(
    "/admin/monograph-location",
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

export async function saveMonoCataloging(
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

  const response = await axiosInstance.post(
    "/admin/monograph-cataloging",
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

export async function saveUserRole(
  roles_type,
  roles_description,
  roles_active
) {
  const formData = new FormData();
  formData.append("roles_type", roles_type);
  formData.append("roles_description", roles_description);
  formData.append("roles_active", roles_active);

  const token = localStorage.getItem("auth-token");

  const response = await axiosInstance.post("/admin/user-role", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + token,
    },
  });

  return response;
}

export async function saveUser(
  username,
  fullName,
  password,
  address1,
  address2,
  state,
  email,
  phoneNo,
  approvedBy,
  role,
  role_id
) {
  const token = localStorage.getItem("auth-token");
  try {
    await axiosInstance.post(
      "/admin/user",
      {
        username,
        fullName,
        password,
        address1,
        address2,
        state,
        email,
        phoneNo,
        approvedBy,
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
