import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

/**
 * @param {number[]} instructions
 * @return {number}
 */
var createSortedArray = function (instructions) {
    const bsearch = (i, instructions) => {
        let a = 0;
        let b = instructions.length - 1;

        while (a + 1 < b) {
            console.log({ a, b });
            const m = Math.floor((a + b) / 2);
            if (instructions[i] < instructions[m]) {
                b = m;
            } else {
                a = m;
            }
        }
        return b;
    }

    const r = [1, 2, 3, 4, 5, 6, 7, 8];
    console.log(bsearch(2, r));
};

Deno.test('a', () => {
    assertEquals(createSortedArray([1, 5, 6, 2]), 1);
});
