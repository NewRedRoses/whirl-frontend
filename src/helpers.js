const validatedGetReq = async (url) => {
  return await fetch(url, {
    credentials: "include",
    mode: "cors",
    headers: {
      Accept: "application/json",
    },
  });
};

const validatedPostReq = async (url, content = "") => {
  return await fetch(url, {
    method: "POST",
    credentials: "include",
    mode: "cors",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body: new URLSearchParams({ content }),
  });
};

export { validatedGetReq, validatedPostReq };
