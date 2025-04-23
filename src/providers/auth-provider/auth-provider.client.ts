"use client";

import type { AuthProvider } from "@refinedev/core";
import Cookies from "js-cookie";

const mockUsers = [
  {
    name: "Менеджер",
    email: "manager@mail.com",
    roles: ["manager"],
    avatar: "https://img.icons8.com/?size=100&id=23280&format=png&color=000000",
  },
  {
    name: "Администратор",
    email: "admin@mail.com",
    roles: ["editor"],
    avatar: "https://img.icons8.com/?size=100&id=23280&format=png&color=000000",
  },
];

export const authProviderClient: AuthProvider = {
  login: async ({ email, username, password, remember }) => {
    // Suppose we actually send a request to the back end here.
    // const user = mockUsers[0];
    const response = await fetch("http://192.168.100.170:2024/api/v1/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const user = await response.json();
      if (user) {
        Cookies.set("auth", JSON.stringify(user.rows[0]), {
          expires: 30,
          path: "/",
          secure: true, // Только для HTTPS
          sameSite: "strict", // Защита от CSRF
        });
        return { success: true, redirectTo: "/" };
      } else {
        return {
          success: false,
          error: {
            name: "LoginError",
            message: "Invalid username or password",
          },
        };
      }
    }

    return {
      success: false,
      error: {
        name: "LoginError",
        message: "Invalid username or password",
      },
    };
  },
  logout: async () => {
    Cookies.remove("auth", { path: "/" });
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async () => {
    const auth = Cookies.get("auth");
    if (auth) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      logout: true,
      redirectTo: "/login",
    };
  },
  getPermissions: async () => {
    const auth = Cookies.get("auth");
    if (auth) {
      const parsedUser = JSON.parse(auth);
      return parsedUser.roles;
    }
    return null;
  },
  getIdentity: async () => {
    const auth = Cookies.get("auth");
    if (auth) {
      const parsedUser = JSON.parse(auth);
      return parsedUser;
    }
    return null;
  },
  onError: async (error) => {
    if (error.response?.status === 401) {
      return {
        logout: true,
      };
    }

    return { error };
  },
};
