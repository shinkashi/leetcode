/*
 * @lc app=leetcode id=462 lang=typescript
 *
 * [462] Minimum Moves to Equal Array Elements II
 *
 * https://leetcode.com/problems/minimum-moves-to-equal-array-elements-ii/description/
 *
 * algorithms
 * Medium (54.46%)
 * Likes:    796
 * Dislikes: 56
 * Total Accepted:    59.8K
 * Total Submissions: 108.5K
 * Testcase Example:  '[1,2,3]'
 *
 * Given an integer array nums of size n, return the minimum number of moves
 * required to make all array elements equal.
 * 
 * In one move, you can increment or decrement an element of the array by 1.
 * 
 * 
 * Example 1:
 * 
 * 
 * Input: nums = [1,2,3]
 * Output: 2
 * Explanation:
 * Only two moves are needed (remember each move increments or decrements one
 * element):
 * [1,2,3]  =>  [2,2,3]  =>  [2,2,2]
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: nums = [1,10,2,9]
 * Output: 16
 * 
 * 
 * 
 * Constraints:
 * 
 * 
 * n == nums.length
 * 1 <= nums.length <= 10^5
 * -10^9 <= nums[i] <= 10^9
 * 
 * 
 */

import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

// @lc code=start
function minMoves2(nums: number[]): number {
    nums.sort((a, b) => a - b);
    const sum = nums.reduce((a, b) => a + b);
    const med1 = nums[Math.ceil(nums.length / 2) - 1];
    const med2 = nums[Math.floor(nums.length / 2) - 1] ?? med1;
    const moves1 = nums.map(n => Math.abs(n - med1));
    const moves2 = nums.map(n => Math.abs(n - med2));
    const diff1 = moves1.reduce((a, b) => a + b);
    const diff2 = moves2.reduce((a, b) => a + b);
    console.log({ sum, med1, med2, moves1, moves2, diff1, diff2 })
    return Math.min(diff1, diff2);
};
// @lc code=end

Deno.test("a", () => {
    const nums = [1, 10, 2, 9];
    assertEquals(minMoves2(nums), 16);
});

Deno.test("a", () => {
    const nums = [1, 0, 0, 8, 6];
    assertEquals(minMoves2(nums), 14);
});

Deno.test("a", () => {
    const nums = [1];
    assertEquals(minMoves2(nums), 0);
});


