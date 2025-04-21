export async function handleApiResponse(response: Response) {
  const data = await response.json();
  if (!response.ok) throw new Error("Failed on log in request");
  return data;
}
