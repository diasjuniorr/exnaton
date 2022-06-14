interface ApiResponse {
  date: string;
  measurement: string;
  aETotalImport: number;
  aETotalExport: number;
  measurements: Measurement[];
}

interface Measurement {
  "0100011D00F": number;
  "0100021D01F": number;
  time: string;
}

function api<ApiResponse>(endpoint: string): Promise<ApiResponse> {
  return fetch(`https://exnaton-backend.herokuapp.com/api/v1${endpoint}`).then(
    (response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    }
  );
}

export default api;
