export const postClient = async (url: string, data: any) => {
  try {
    const newUrl = process.env.NEXT_PUBLIC_API_BASE_URL + url;

    const response = await fetch(newUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (!response.ok) {
      const errorBody = await response.json();
      return errorBody;
    }

    return await response.json();
  } catch (error: any) {
    console.error("Error in postRequest:", error.message);
    throw error;
  }
};
