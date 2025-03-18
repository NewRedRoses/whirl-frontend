const validatedGetReq = async (url) => {
  return await fetch(url, {
    credentials: "include",
    mode: "cors",
  });
};

const validatedPostReq = async (url, content = "") => {
  return await fetch(url, {
    method: "POST",
    credentials: "include",
    mode: "cors",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ content }),
  });
};

export { validatedGetReq, validatedPostReq };
