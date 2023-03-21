interface CookieOptions {
    name: String,
    value: String,
    lifetime?: Number,
    isHttpOnly?: Boolean,
}

const createSetCookieHeader = (options: CookieOptions): [string, string] => {
    return [`Set-Cookie`, `${options.name}="${options.value}"; SameSite=Strict; Path=/; ${options.lifetime!==undefined ? `Max-Age=${options.lifetime};` : ""} ${options.isHttpOnly ? "HttpOnly;" : ""}`];
}

export { createSetCookieHeader }