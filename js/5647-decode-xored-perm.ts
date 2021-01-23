import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

function decode(encoded: number[]): number[] {
    const len = encoded.length

    let res = Array(len + 1);

    for (let i = 1; i <= len + 1; i++) {
        res[0] = i;
        let valid = true;
        for (let j = 1; j < len + 1; j++) {
            res[j] = res[j - 1] ^ encoded[j - 1];
            if (res[j] < 1 || res[j] > len + 1) {
                valid = false;
                break;
            }
        }
        // console.log({ res, valid });
        if (valid) return res;
    }

    return res;
};

Deno.test("a", () => {
    assertEquals(decode([6, 5, 4, 6]), [2, 4, 1, 5, 3]);
})
