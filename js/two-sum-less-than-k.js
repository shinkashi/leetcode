import { assertEquals } from "https://deno.land/std@0.69.0/testing/asserts.ts"

/**
 * @param {number[]} A
 * @param {number} K
 * @return {number}
 */
var twoSumLessThanK = function (A, K) {
    let S = -1
    for (let i = 0; i < A.length; i++) {
        for (let j = i + 1; j < A.length; j++) {
            const sum = A[i] + A[j]
            if (sum < K && S < sum) {
                S = sum
            }
        }
    }
    return S
}

let A, K;

A = [34, 23, 1, 24, 75, 33, 54, 8]
K = 60
assertEquals(twoSumLessThanK(A, K), 58)

A = [10, 20, 30]
K = 15
assertEquals(twoSumLessThanK(A, K), -1)

