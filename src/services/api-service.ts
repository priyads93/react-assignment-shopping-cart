import { handleApiResponse } from "../utils/handleApiResponse";

/**
 * Sends a POST request to the specified URL with the provided data and headers.
 *
 * @param url - The endpoint URL to which the POST request will be sent.
 * @param data - The payload to be sent in the body of the POST request.
 * @param headers - An object containing key-value pairs of headers to include in the request.
 * @returns A promise that resolves to the processed API response.
 * @throws Will throw an error if the API response indicates a failure.
 */
export async function callPostMethod(
  url: string,
  data: unknown,
  headers: Record<string, string>
) {
  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });
  return handleApiResponse(response);
}

/**
 * Makes an HTTP GET request to the specified URL with optional headers, query parameters, and path parameters.
 *
 * @param url - The base URL to which the GET request will be made.
 * @param headers - Optional headers to include in the request as a key-value pair object.
 * @param queryParams - Optional query parameters to append to the URL as a key-value pair object.
 * @param pathParams - Optional path parameters to append to the URL as a key-value pair object.
 * @returns A promise that resolves to the response of the API call after being processed by `handleApiResponse`.
 *
 * @throws Will throw an error if the fetch request fails or if `handleApiResponse` encounters an issue.
 */
export async function callGetMethod(
  url: string,
  headers?: Record<string, string>,
  queryParams?: Record<string, string>,
  pathParams?: Record<string, string>
) {
  if (queryParams) {
    const queryString = Object.keys(queryParams).reduce(
      (acc: string, currValue: string) => {
        acc = acc + `${currValue}=${queryParams[currValue]}`;
        return acc;
      },
      ""
    );
    url = `${url}?${queryString}`;
  }
  if (pathParams) {
    const pathString = Object.keys(pathParams).reduce(
      (acc: string, currValue: string) => {
        acc = acc + `/${pathParams[currValue]}`;
        return acc;
      },
      ""
    );
    url = `${url}${pathString}`;
  }
  const response = await fetch(url, {
    method: "GET",
    headers,
  });
  return handleApiResponse(response);
}
