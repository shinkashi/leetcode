import { assertEquals } from "https://deno.land/std@0.78.0/testing/asserts.ts";


/**
 * @param {number[]} A
 * @param {number} K
 * @return {number}
 */
var smallestRangeII = function (A, K) {
    A.sort((a, b) => a - b)

    let right = A[A.length - 1] - K;
    let left = A[0] + K;
    let diff = A[A.length - 1] - A[0];

    for (let i = 0; i < A.length - 1; i++) {
        let max = Math.max(right, A[i] + K)
        let min = Math.min(left, A[i + 1] - K)
        diff = Math.min(diff, Math.abs(max - min))
    }
    return diff

};



Deno.test('1', () => {
    const A = [1], K = 0
    assertEquals(smallestRangeII(A, K), 0)
})

Deno.test('2', () => {
    const A = [0, 10], K = 2
    assertEquals(smallestRangeII(A, K), 6)
})

Deno.test('3', () => {
    const A = [1, 3, 6], K = 3
    assertEquals(smallestRangeII(A, K), 3)
})

Deno.test('4', () => {
    const A = [7, 8, 8], K = 5
    assertEquals(smallestRangeII(A, K), 1)
})

Deno.test('5', () => {
    const A = [2, 7, 2], K = 1
    assertEquals(smallestRangeII(A, K), 3)
})
