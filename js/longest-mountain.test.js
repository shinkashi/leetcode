import { assertEquals } from "https://deno.land/std@0.69.0/testing/asserts.ts";

/**
 * @param {number[]} A
 * @return {number}
*/

var longestMountain = function (A) {
    let maxCnt = 0;
    let plus = 0, minus = 0;

    if (A.length < 3) return 0;

    for (let i = 1; i < A.length; i++) {
        const diff = A[i] - A[i - 1];
        if (diff > 0) {
            if (minus > 0) {
                maxCnt = Math.max(maxCnt, 1 + plus + minus);
                plus = 0;
                minus = 0;
            }
            plus++;
        } else if (diff < 0 && plus > 0) {
            minus++;
        } else {
            if (plus && minus) maxCnt = Math.max(maxCnt, 1 + plus + minus);
            plus = 0;
            minus = 0;
        }
    }
    if (plus && minus) maxCnt = Math.max(maxCnt, 1 + plus + minus);
    return maxCnt;
};

Deno.test('test', () => {
    const input = [1, 2, 0, 2, 0, 2]
    const output = 3
    assertEquals(longestMountain(input), output)
})

Deno.test('test', () => {
    const input = [2, 1, 4, 7, 3, 2, 5]
    const output = 5
    assertEquals(longestMountain(input), output)
})

Deno.test('test', () => {
    const input = [0, 1, 2, 3, 4, 5, 4, 3, 2, 1, 0]
    const output = 11
    assertEquals(longestMountain(input), output)
})

Deno.test('test', () => {
    const input = [2, 2, 2]
    const output = 0
    assertEquals(longestMountain(input), output)
})

Deno.test('test', () => {
    const input = [0, 0, 1, 0, 0, 1, 1, 1, 1, 1]
    const output = 3
    assertEquals(longestMountain(input), output)
})

