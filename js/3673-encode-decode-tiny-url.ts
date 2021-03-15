import { assert, assertEquals } from "https://deno.land/std/testing/asserts.ts";

const URLPATH = "http://tinyurl.com/";


// JavaScript Implementation of Java String.hashCode()
function hashCode(s: string): number {
    let h = 0;
    for (let i = 0; i < s.length; i++)
        h = Math.imul(31, h) + s.charCodeAt(i) | 0;
    return h;
}

let urlmap = new Map<string, string>();

/**
 * Encodes a URL to a shortened URL.
 */
function encode(longUrl: string): string {
    const codeBase = String(hashCode(longUrl))
    let suffix = 0;
    while (true) {
        const code = `${codeBase}-${suffix}`;
        if (!urlmap.has(code)) {
            urlmap.set(code, longUrl);
            return URLPATH + code;
        }
        suffix++;
    };
}
/**
 * Decodes a shortened URL to its original URL.
 */
function decode(shortUrl: string): string {
    return urlmap.get(shortUrl.split(URLPATH)[1]) ?? ""
};

/**
 * Your functions will be called as such:
 * decode(encode(strs));
 */

Deno.test("test", () => {
    const input = "https://leetcode.com/problems/design-tinyurl2";
    const tinyurl = encode(input);
    assert(tinyurl.startsWith(URLPATH));
    console.log(tinyurl);
    console.log(urlmap);
    const output = decode(tinyurl);
    assertEquals(input, output)
});

Deno.test("test", () => {
    const input = "https://leetcode.com/problems/design-tinyurl2";
    const url1 = encode(input);
    const url2 = encode(input);
    assertEquals(decode(url1), input);
    assertEquals(decode(url2), input);
});
