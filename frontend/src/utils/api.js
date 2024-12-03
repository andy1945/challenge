import axios from "axios";

const API_URL = "http://localhost:3939";

const client = axios.create({ baseURL: API_URL });

export const getClients = async () => {
  const { data } = await client.get("/clients");
  return data;
};

// Added this for user login

//interceptor to include the token
client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Function to login
export const login = async (username, password) => {
  try {
    const response = await client.post(
      "/auth",
      {},
      {
        auth: {
          username,
          password,
        },
      }
    );

    return response.data; // Returning the JWT and other data from the response
  } catch (error) {
    throw new Error("Login failed! Wrong email or password");
  }
};

// Logout API
export const logout = () => {
  // We can clear the token and session info here, although it's handled by the frontend
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("expiry");
};

export const getAggregatedRevenue = async () => {
  const { data } = await client.get("/admin");
  return data;
};
