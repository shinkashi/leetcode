import { assertEquals } from "https://deno.land/std@0.78.0/testing/asserts.ts";

function getSmallestString(n, k) {
    let r = k - n;
    let z = Math.floor(r / 25);
    let m = r % 25;
    let mStr = m ? String.fromCharCode(97 + m) : "";
    let aStr = 'a'.repeat(Math.max(n - z - mStr.length, 0));
    let zStr = 'z'.repeat(z);
    return aStr + mStr + zStr;
};

Deno.test("test", () => {
    const n = 3, k = 27;
    const output = "aay";
    assertEquals(getSmallestString(n, k), output);
})
Deno.test("test", () => {
    const n = 5, k = 73;
    const output = "aaszz";
    assertEquals(getSmallestString(n, k), output);
})


Deno.test("test", () => {
    const n = 1, k = 1;
    const output = "a";
    assertEquals(getSmallestString(n, k), output);
})

Deno.test("test", () => {
    const n = 5, k = 130;
    const output = "zzzzz";
    assertEquals(getSmallestString(n, k), output);
})

