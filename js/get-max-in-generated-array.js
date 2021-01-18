import { assertEquals, assertThrows } from "https://deno.land/std@0.69.0/testing/asserts.ts";

/**
 * @param {number} n
 * @return {number}
 */
var getMaximumGenerated = function (n) {
    if (n === 0) return 0;

    const A = Array(n + 1);
    A[0] = 0;
    A[1] = 1;

    for (let j = 2; j <= n; j++) {
        if (j % 2 == 0) {
            A[j] = A[j / 2];
        } else {
            const i = j >> 1;
            A[j] = A[i] + A[i + 1];
        }
    }

    return Math.max(...A);
};

Deno.test('a', () => { assertEquals(getMaximumGenerated(7), 3) })
Deno.test('a', () => { assertEquals(getMaximumGenerated(2), 1) })
Deno.test('a', () => { assertEquals(getMaximumGenerated(3), 2) })
Deno.test('a', () => { assertEquals(getMaximumGenerated(1), 1) })
Deno.test('a', () => { assertEquals(getMaximumGenerated(0), 0) })
