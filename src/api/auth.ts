import type { AstroCookies } from "astro";
import type { User } from "src/userStore";
import { baseUrl } from "src/api/index";

const accessCookie = "at";
const refreshCookie = "rt";

interface Credentials {
  email: String;
  password: String;
}

interface AuthenticationResponse {
  accessToken: String;
  refreshToken: String;
}

// horrible horror below...

const authenticate = async (
  credentials: Credentials
): Promise<AuthenticationResponse | null> => {
  const resp = await fetch(baseUrl + "/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: credentials.email,
      password: credentials.password,
    }),
  });
  const respJson = await resp.json();

  if (resp.status != 200) return null;

  const authReponse = respJson as AuthenticationResponse;

  return authReponse;
};

const isAllowed = (user: User | null, allowedRoles: Array<String>): Boolean => {
  let isAllowed = true;
  allowedRoles.forEach((role) => {
    if (!user?.roles.includes(role)) isAllowed = false;
  });
  return isAllowed;
};

const getUser = async (cookies: AstroCookies): Promise<User | null> => {
  if (!cookies.has(accessCookie)) return null;
  const token = cookies.get(accessCookie).value;

  const resp = await fetch(baseUrl + "/api/auth/whoami", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (resp.status == 401) {
    return null;
  }
  if (resp.status != 200) {
    console.log("Unexpected response status!");
    return null;
  }

  return await resp.json();
};

export { authenticate, getUser, isAllowed, accessCookie, refreshCookie };
