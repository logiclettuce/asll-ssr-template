import type { APIRoute } from "astro";
import { accessCookie, authenticate, refreshCookie } from "src/api/auth";
import { createSetCookieHeader } from "src/cookie";

export const post: APIRoute = async ({
  // @ts-ignore
  cookies,
  // @ts-ignore
  params,
  // @ts-ignore
  request,
  // @ts-ignore
  redirect,
}) => {
  const data = await request.json();
  const authResponse = await authenticate({
    email: data.email,
    password: data.password,
  });

  if (!authResponse) return new Response(null, { status: 401 });

  const response = new Response("authenticated", {
    status: 200,
  });
  const [rtcH, rtcV] = createSetCookieHeader({
    name: refreshCookie,
    value: authResponse.refreshToken,
    lifetime: 1209600,
    isHttpOnly: true,
  });
  const [atcH, atcV] = createSetCookieHeader({
    name: accessCookie,
    value: authResponse.accessToken,
    lifetime: 86400,
    isHttpOnly: true,
  });
  response.headers.append(rtcH, rtcV);
  response.headers.append(atcH, atcV);
  return response;
};
