const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:9001";
const apiURL = `${baseURL}/api/v1` || "http://localhost:9001/api/v1";

export const fetchApi = async (url: string, options: any) => {
  const fetchUrl = `${apiURL}${url}`;

  // Check if the options include headers, otherwise, create an empty headers object
  options.headers = options.headers || {};

  //if its a post request set the content type to application/json
  if (options.method === "POST") {
    options.headers["Content-Type"] = "application/json";
  }

  options.cache = options.cache || "no-cache"; //if options.headers has no cache set it to no-cache

  //if options.headers has no cache set it to no-cache

  console.log("fetchUrl", fetchUrl);
  console.log("options", options);

  const response = await fetch(fetchUrl, {
    ...options,
  });

  const data = await response.json();

  return { data, status: response.status } || {};
};
