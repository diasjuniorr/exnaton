export async function api<T>(endpoint: RequestInfo): Promise<T> {
  try {
    const response = await fetch(
      `https://exnaton-backend.herokuapp.com/api/v1${endpoint}`
    );
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
