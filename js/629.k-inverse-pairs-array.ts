/*
 * @lc app=leetcode id=629 lang=typescript
 *
 * [629] K Inverse Pairs Array
 *
 * https://leetcode.com/problems/k-inverse-pairs-array/description/
 *
 * algorithms
 * Hard (31.87%)
 * Likes:    434
 * Dislikes: 80
 * Total Accepted:    13.7K
 * Total Submissions: 42.3K
 * Testcase Example:  '3\n0'
 *
 * For an integer array nums, an inverse pair is a pair of integers [i, j]
 * where 0 <= i < j < nums.length and nums[i] > nums[j].
 * 
 * Given two integers n and k, return the number of different arrays consist of
 * numbers from 1 to n such that there are exactly k inverse pairs. Since the
 * answer can be huge, return it modulo 10^9 + 7.
 * 
 * 
 * Example 1:
 * 
 * 
 * Input: n = 3, k = 0
 * Output: 1
 * Explanation: Only the array [1,2,3] which consists of numbers from 1 to 3
 * has exactly 0 inverse pairs.
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: n = 3, k = 1
 * Output: 2
 * Explanation: The array [1,3,2] and [2,1,3] have exactly 1 inverse pair.
 * 
 * 
 * 
 * Constraints:
 * 
 * 
 * 1 <= n <= 1000
 * 0 <= k <= 1000
 * 
 * 
 */

// @lc code=start
const MOD = 10 ** 9 + 7;

function kInversePairs(n: number, k: number): number {
    let memo = Array.from({ length: 1001 }, x => Array<number>(1001));

    const fn = (n: number, k: number): number => {
        if (n == 0) return 0;
        if (k == 0) return 1;
        if (memo[n][k] !== undefined) return memo[n][k];

        let sum = 0;
        for (let i = 0; i <= Math.min(k, n - 1); i++) {
            sum += fn(n - 1, k - i);
            sum %= MOD;
        }
        memo[n][k] = sum;
        return sum;
    }

    return fn(n, k);
};
// @lc code=end

import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

Deno.test("test", () => {
    const n = 3, k = 1;
    const output = 2;
    assertEquals(kInversePairs(n, k), output);
})

