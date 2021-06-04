/*
 * @lc app=leetcode id=1465 lang=typescript
 *
 * [1465] Maximum Area of a Piece of Cake After Horizontal and Vertical Cuts
 *
 * https://leetcode.com/problems/maximum-area-of-a-piece-of-cake-after-horizontal-and-vertical-cuts/description/
 *
 * algorithms
 * Medium (34.01%)
 * Likes:    590
 * Dislikes: 162
 * Total Accepted:    54.2K
 * Total Submissions: 147.5K
 * Testcase Example:  '5\n4\n[1,2,4]\n[1,3]'
 *
 * Given a rectangular cake with height h and width w, and two arrays of
 * integers horizontalCuts and verticalCuts where horizontalCuts[i] is the
 * distance from the top of the rectangular cake to the ith horizontal cut and
 * similarly, verticalCuts[j] is the distance from the left of the rectangular
 * cake to the jth vertical cut.
 * 
 * Return the maximum area of a piece of cake after you cut at each horizontal
 * and vertical position provided in the arrays horizontalCuts and
 * verticalCuts. Since the answer can be a huge number, return this modulo 10^9
 * + 7.
 * 
 * 
 * Example 1:
 * 
 * 
 * 
 * 
 * Input: h = 5, w = 4, horizontalCuts = [1,2,4], verticalCuts = [1,3]
 * Output: 4 
 * Explanation: The figure above represents the given rectangular cake. Red
 * lines are the horizontal and vertical cuts. After you cut the cake, the
 * green piece of cake has the maximum area.
 * 
 * 
 * Example 2:
 * 
 * 
 * 
 * 
 * Input: h = 5, w = 4, horizontalCuts = [3,1], verticalCuts = [1]
 * Output: 6
 * Explanation: The figure above represents the given rectangular cake. Red
 * lines are the horizontal and vertical cuts. After you cut the cake, the
 * green and yellow pieces of cake have the maximum area.
 * 
 * 
 * Example 3:
 * 
 * 
 * Input: h = 5, w = 4, horizontalCuts = [3], verticalCuts = [3]
 * Output: 9
 * 
 * 
 * 
 * Constraints:
 * 
 * 
 * 2 <= h, w <= 10^9
 * 1 <= horizontalCuts.length < min(h, 10^5)
 * 1 <= verticalCuts.length < min(w, 10^5)
 * 1 <= horizontalCuts[i] < h
 * 1 <= verticalCuts[i] < w
 * It is guaranteed that all elements in horizontalCuts are distinct.
 * It is guaranteed that all elements in verticalCuts are distinct.
 * 
 * 
 */

// @lc code=start
function maxArea(h: number, w: number, horizontalCuts: number[], verticalCuts: number[]): number {
    horizontalCuts.sort((a, b) => a - b);
    let ymax = horizontalCuts[0];
    // horizontalCuts.push(h);
    for (let i = 1; i < horizontalCuts.length; i++) {
        ymax = Math.max(ymax, horizontalCuts[i] - horizontalCuts[i - 1]);
    }
    ymax = Math.max(ymax, h - horizontalCuts[horizontalCuts.length - 1]);

    verticalCuts.sort((a, b) => a - b);
    let xmax = verticalCuts[0];
    // verticalCuts.push(w);
    for (let i = 1; i < verticalCuts.length; i++) {
        xmax = Math.max(xmax, verticalCuts[i] - verticalCuts[i - 1]);
    }
    xmax = Math.max(xmax, w - verticalCuts[verticalCuts.length - 1]);

    const MOD = 10 ** 9 + 7;
    return (xmax % MOD) * (ymax % MOD) % MOD;
};
// @lc code=end

import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

Deno.test("a", () => {
    const h = 5, w = 4, horizontalCuts = [3, 1], verticalCuts = [1];
    const output = 6;
    assertEquals(maxArea(h, w, horizontalCuts, verticalCuts), output);
})
