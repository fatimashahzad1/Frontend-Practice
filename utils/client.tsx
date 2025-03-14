export const postClient = async ({
  url,
  data,
  token,
}: {
  url: string;
  data?: any;
  token?: string;
}) => {
  try {
    const newUrl = process.env.NEXT_PUBLIC_API_BASE_URL + url;

    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      credentials: 'include',
      ...(data && { body: JSON.stringify(data) }),
    };

    const response = await fetch(newUrl, options);

    if (!response.ok) {
      const errorBody = await response.json();
      return errorBody;
    }

    return await response.json();
  } catch (error: any) {
    console.error('Error in postRequest:', error.message);
    throw error;
  }
};

export const patchClient = async ({
  url,
  data,
  token,
}: {
  url: string;
  data?: any;
  token?: string;
}) => {
  try {
    const newUrl = process.env.NEXT_PUBLIC_API_BASE_URL + url;

    const response = await fetch(newUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Request Failed');
    }

    return await response.json();
  } catch (error: any) {
    console.error('Error in patchRequest:', error.message);
    throw error;
  }
};

export const getClient = async (url: string, token?: string) => {
  try {
    const newUrl = process.env.NEXT_PUBLIC_API_BASE_URL + url;

    // Set up headers with optional Authorization token
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(newUrl, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      const errorBody = await response.json();
      return errorBody;
    }

    return await response.json();
  } catch (error: any) {
    console.error('Error in getClient:', error.message);
    throw error;
  }
};

export const deleteClient = async ({
  url,
  token,
}: {
  url: string;
  token?: string;
}) => {
  try {
    const newUrl = process.env.NEXT_PUBLIC_API_BASE_URL + url;

    const options: RequestInit = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      credentials: 'include',
    };

    const response = await fetch(newUrl, options);

    if (!response.ok) {
      const errorBody = await response.json();
      return errorBody;
    }

    return await response.json();
  } catch (error: any) {
    console.error('Error in postRequest:', error.message);
    throw error;
  }
};
