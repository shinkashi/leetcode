/*
 * @lc app=leetcode id=576 lang=typescript
 *
 * [576] Out of Boundary Paths
 *
 * https://leetcode.com/problems/out-of-boundary-paths/description/
 *
 * algorithms
 * Medium (36.39%)
 * Likes:    1059
 * Dislikes: 167
 * Total Accepted:    49K
 * Total Submissions: 126.8K
 * Testcase Example:  '2\n2\n2\n0\n0'
 *
 * There is an m x n grid with a ball. The ball is initially at the position
 * [startRow, startColumn]. You are allowed to move the ball to one of the four
 * adjacent cells in the grid (possibly out of the grid crossing the grid
 * boundary). You can apply at most maxMove moves to the ball.
 * 
 * Given the five integers m, n, maxMove, startRow, startColumn, return the
 * number of paths to move the ball out of the grid boundary. Since the answer
 * can be very large, return it modulo 10^9 + 7.
 * 
 * 
 * Example 1:
 * 
 * 
 * Input: m = 2, n = 2, maxMove = 2, startRow = 0, startColumn = 0
 * Output: 6
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: m = 1, n = 3, maxMove = 3, startRow = 0, startColumn = 1
 * Output: 12
 * 
 * 
 * 
 * Constraints:
 * 
 * 
 * 1 <= m, n <= 50
 * 0 <= maxMove <= 50
 * 0 <= startRow < m
 * 0 <= startColumn < n
 * 
 */

// @lc code=start
function findPaths(m: number, n: number, maxMove: number, startRow: number, startColumn: number): number {
    let dp = Array.from({ length: m }, x => Array(n).fill(0));
    let dp2 = Array.from({ length: m }, x => Array(n).fill(0));
    dp[startRow][startColumn] = 1;

    const MOD = 10 ** 9 + 7;

    let cnt = 0;

    for (let move = 1; move <= maxMove; move++) {
        for (const row of dp2) row.fill(0);
        for (let y = 0; y < m; y++) {
            for (let x = 0; x < n; x++) {
                const dirs = [[y - 1, x], [y + 1, x], [y, x - 1], [y, x + 1]];
                for (const [ny, nx] of dirs) {
                    if (nx < 0 || nx >= n || ny < 0 || ny >= m) {
                        cnt += dp[y][x];
                        cnt %= MOD;
                    } else {
                        dp2[ny][nx] += dp[y][x];
                        dp2[ny][nx] %= MOD;
                    }
                }
            }
        }
        [dp, dp2] = [dp2, dp];
    }
    return cnt;
};
// @lc code=end
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

Deno.test("a", () => {
    const m = 2, n = 2, maxMove = 2, startRow = 0, startColumn = 0
    assertEquals(findPaths(m, n, maxMove, startRow, startColumn), 6);
})

Deno.test("a", () => {
    const m = 1, n = 3, maxMove = 3, startRow = 0, startColumn = 1;
    assertEquals(findPaths(m, n, maxMove, startRow, startColumn), 12);
})
