const URL = process.env.API_URL
  ? process.env.API_URL
  : "https://exnaton-backend.herokuapp.com/api/v1";
export async function api<T>(endpoint: RequestInfo): Promise<T> {
  try {
    const response = await fetch(`${URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const body = await response.json();
    return body;
  } catch (error) {
    throw new Error("Request failed: " + error);
  }
}

export default api;
