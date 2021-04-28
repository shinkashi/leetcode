/*
 * @lc app=leetcode id=63 lang=typescript
 *
 * [63] Unique Paths II
 *
 * https://leetcode.com/problems/unique-paths-ii/description/
 *
 * algorithms
 * Medium (35.42%)
 * Likes:    2704
 * Dislikes: 295
 * Total Accepted:    369.3K
 * Total Submissions: 1M
 * Testcase Example:  '[[0,0,0],[0,1,0],[0,0,0]]'
 *
 * A robot is located at the top-left corner of a m x n grid (marked 'Start' in
 * the diagram below).
 * 
 * The robot can only move either down or right at any point in time. The robot
 * is trying to reach the bottom-right corner of the grid (marked 'Finish' in
 * the diagram below).
 * 
 * Now consider if some obstacles are added to the grids. How many unique paths
 * would there be?
 * 
 * An obstacle and space is marked as 1 and 0 respectively in the grid.
 * 
 * 
 * Example 1:
 * 
 * 
 * Input: obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]
 * Output: 2
 * Explanation: There is one obstacle in the middle of the 3x3 grid above.
 * There are two ways to reach the bottom-right corner:
 * 1. Right -> Right -> Down -> Down
 * 2. Down -> Down -> Right -> Right
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: obstacleGrid = [[0,1],[0,0]]
 * Output: 1
 * 
 * 
 * 
 * Constraints:
 * 
 * 
 * m == obstacleGrid.length
 * n == obstacleGrid[i].length
 * 1 <= m, n <= 100
 * obstacleGrid[i][j] is 0 or 1.
 * 
 * 
 */

import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

// @lc code=start
function uniquePathsWithObstacles(obstacleGrid: number[][]): number {
    const h = obstacleGrid.length;
    const w = obstacleGrid[0].length;
    if (obstacleGrid[0][0] === 1) return 0;
    if (obstacleGrid[h - 1][w - 1] === 1) return 0;

    const dp = Array.from({ length: h }, x => Array(w).fill(0));
    dp[0][0] = 1;
    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            if (obstacleGrid[y][x] === 1) continue;
            if (x > 0) dp[y][x] += dp[y][x - 1];
            if (y > 0) dp[y][x] += dp[y - 1][x];
        }
    }
    return dp[h - 1][w - 1];
};
// @lc code=end

Deno.test("a", () => {
    const obstacleGrid = [[0, 0, 0], [0, 1, 0], [0, 0, 0]]
    const output = 2;
    const res = uniquePathsWithObstacles(obstacleGrid);
    assertEquals(res, output);
})


