import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

function concatenatedBinary(n: number): number {
    const MOD = 1_000_000_007;
    let res = 0;


    for (let i = 1; i <= n; i++) {
        // const bin = i.toString(2);
        for (let j = i; j; j >>= 1) {
            // for (let j = 0; j < bin.length; j++) {
            res *= 2;
            res %= MOD;
        }
        res += i;
        // res %= MOD;
    }
    return res;
};

Deno.test("test", () => {
    const n = 1;
    const output = 1;
    assertEquals(concatenatedBinary(n), output);
})
Deno.test("test", () => {
    const n = 3;
    const output = 27;
    assertEquals(concatenatedBinary(n), output);
})
Deno.test("test", () => {
    const n = 12;
    const output = 505379714;
    assertEquals(concatenatedBinary(n), output);
})
Deno.test("test", () => {
    const n = 10 ** 5;
    const output = 757631812;
    assertEquals(concatenatedBinary(n), output);
})

