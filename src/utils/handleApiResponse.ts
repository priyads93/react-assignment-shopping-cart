import { DefaultError } from "@tanstack/react-query";

export async function handleApiResponse(response: Response) {
  try {
    const data = await response.json();
    if (!response.ok) throw new Error("Failed on log in request");
    return data;
  } catch (error: unknown) {
    const apiErrorResponse: DefaultError = {
      message:
        (error as { message: string }).message ?? "Internal Server Error",
      name: "Api Error",
    };
    throw apiErrorResponse;
  }
}
