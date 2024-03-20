interface User {
  name: string;
  email: string;
  password: string;
}

interface RequestOptions {
  method: string;
  headers: HeadersInit;
  body: string;
  redirect: RequestRedirect;
}

export const endpointCaller = async (
  userName: string,
  userEmail: string,
  userPassword: string,
  category: string,
  endpointLink: string
): Promise<void> => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const userData: User = {
    name: userName,
    email: userEmail,
    password: userPassword,
  };

  const raw = JSON.stringify(userData);

  const requestOptions: RequestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const response = await fetch(`${endpointLink}${category}`, requestOptions);
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const result = await response.text();
    console.log(result);
  } catch (error) {
    console.error("error", error);
    // Re-throw the error to propagate it further if necessary
    throw error;
  }
};
