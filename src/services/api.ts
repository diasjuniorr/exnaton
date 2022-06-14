export async function api<T>(endpoint: RequestInfo): Promise<T> {
  const response = await fetch(
    `https://exnaton-backend.herokuapp.com/api/v1${endpoint}`
  );
  const body = await response.json();
  return body;
}

export default api;
