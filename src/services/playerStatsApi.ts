export const fetchApi = async (endpoint: string) => {
  try {
    const response = await fetch(`${process.env.API_URL}/${endpoint}`, {
      headers: {
        Authorization: process.env.API_KEY ?? "",
      },
    });

    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    return data;
  } catch (e) {
    console.error(`fetchApi ${endpoint} `, e);
    return null;
  }
};
