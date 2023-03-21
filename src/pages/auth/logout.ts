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
  const response = new Response(null, {
    status: 200,
  });
  const [rtcH, rtcV] = createSetCookieHeader({
    name: refreshCookie,
    value: "",
    lifetime: 0,
    isHttpOnly: true,
  });
  const [atcH, atcV] = createSetCookieHeader({
    name: accessCookie,
    value: "",
    lifetime: 0,
    isHttpOnly: true,
  });
  response.headers.append(rtcH, rtcV);
  response.headers.append(atcH, atcV);
  return response;
};
