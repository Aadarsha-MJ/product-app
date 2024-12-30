import { create } from "zustand";

export const allUser = create((set, get) => ({
  token: null,
  setToken: (token) => set({ token }),
  registerUser: async (newUser) => {
    try {
      if (!newUser.name || !newUser.email || !newUser.password) {
        return { success: false, message: "Please fill all the fields." };
      }

      const res = await fetch("/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      // Check if the response is OK (status code 2xx)
      if (!res.ok) {
        const data = await res.json();
        return {
          success: false,
          message: data.message || "Failed to register user.",
        };
      }

      // successful registration
      const data = await res.json();

      // save the user data and token
      set({
        token: data.data.token, // save the token for authenticated routes
      });
      return {
        success: true,
        message: `Your account has been created successfully, welcome ${data.data.name}`,
      };
    } catch (error) {
      console.error("Error registering user:", error);
      return { success: false, message: "Failed to register user." };
    }
  },

  loginUser: async (credentials) => {
    try {
      if (!credentials.email || !credentials.password) {
        return {
          success: false,
          message: "Please provide email and password.",
        };
      }

      const res = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!res.ok) {
        const data = await res.json();
        return {
          success: false,
          message: data.message || "Failed to log in.",
        };
      }

      const data = await res.json();
      set({
        token: data.data.token, // Save the token for authenticated routes
      });

      return {
        success: true,
        message: `Welcome back, ${data.data.name}!`,
      };
    } catch (error) {
      console.error("Error logging in user:", error);
      return { success: false, message: "Failed to log in." };
    }
  },

  logout: () => {
    set({ token: null }); // Clears the token
  },

  fetchUserDetails: async () => {
    const { token } = get();
    if (!token) {
      return { success: false, message: "User is not logged in." };
    }

    try {
      const res = await fetch("/api/user/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
        },
      });

      if (!res.ok) {
        const data = await res.json();
        return {
          success: false,
          message: data.message || "Failed to fetch user details.",
        };
      }

      const data = await res.json();
      set({ userDetails: data.data }); // Save user details in the state
      return { success: true, user: data.data };
    } catch (error) {
      console.error("Error fetching user details:", error);
      return { success: false, message: "Failed to fetch user details." };
    }
  },
}));
