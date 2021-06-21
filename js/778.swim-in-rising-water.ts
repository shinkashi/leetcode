/*
 * @lc app=leetcode id=778 lang=typescript
 *
 * [778] Swim in Rising Water
 *
 * https://leetcode.com/problems/swim-in-rising-water/description/
 *
 * algorithms
 * Hard (55.20%)
 * Likes:    1144
 * Dislikes: 90
 * Total Accepted:    45.2K
 * Total Submissions: 79.5K
 * Testcase Example:  '[[0,2],[1,3]]'
 *
 * On an N x N grid, each square grid[i][j] represents the elevation at that
 * point (i,j).
 * 
 * Now rain starts to fall. At time t, the depth of the water everywhere is t.
 * You can swim from a square to another 4-directionally adjacent square if and
 * only if the elevation of both squares individually are at most t. You can
 * swim infinite distance in zero time. Of course, you must stay within the
 * boundaries of the grid during your swim.
 * 
 * You start at the top left square (0, 0). What is the least time until you
 * can reach the bottom right square (N-1, N-1)?
 * 
 * Example 1:
 * 
 * 
 * Input: [[0,2],[1,3]]
 * Output: 3
 * Explanation:
 * At time 0, you are in grid location (0, 0).
 * You cannot go anywhere else because 4-directionally adjacent neighbors have
 * a higher elevation than t = 0.
 * 
 * You cannot reach point (1, 1) until time 3.
 * When the depth of water is 3, we can swim anywhere inside the grid.
 * 
 * 
 * Example 2:
 * 
 * 
 * Input:
 * [[0,1,2,3,4],[24,23,22,21,5],[12,13,14,15,16],[11,17,18,19,20],[10,9,8,7,6]]
 * Output: 16
 * Explanation:
 * ⁠0  1  2  3  4
 * 24 23 22 21  5
 * 12 13 14 15 16
 * 11 17 18 19 20
 * 10  9  8  7  6
 * 
 * The final route is marked in bold.
 * We need to wait until time 16 so that (0, 0) and (4, 4) are connected.
 * 
 * 
 * Note:
 * 
 * 
 * 2 <= N <= 50.
 * grid[i][j] is a permutation of [0, ..., N*N - 1].
 * 
 * 
 */

// @lc code=start
function swimInWater(grid: number[][]): number {
    const N = grid.length;

    const visited = Array(N * N).fill(false);

    const reach = (y: number, x: number, t: number): boolean => {
        visited[y * N + x] = true;

        const dir = [0, 1, 0, -1, 0]
        for (let i = 0; i < dir.length - 1; i++) {
            const [dy, dx] = [dir[i], dir[i + 1]]
            const ny = y + dy;
            const nx = x + dx;
            if (ny < 0 || ny >= N) continue;
            if (nx < 0 || nx >= N) continue;
            if (visited[ny * N + nx]) continue;
            if (grid[ny][nx] > t) continue;
            if (ny == N - 1 && nx == N - 1) return true;
            if (reach(ny, nx, t)) {
                return true;
            }
        }
        return false;
    }

    // binarySearch
    let lo = grid[0][0], hi = N * N;
    while (lo < hi) {
        const mid = lo + ((hi - lo) >> 1);
        // console.log({ mid })
        visited.fill(false);
        if (reach(0, 0, mid)) {
            hi = mid;
        } else {
            lo = mid + 1;
        }
    }
    return lo;
};
// @lc code=end

import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

Deno.test("a", () => {
    const grid = [[0, 2], [1, 3]]
    const output = 3
    assertEquals(swimInWater(grid), output)
})

Deno.test("a", () => {
    const grid = [[3, 2], [0, 1]]
    const output = 3
    assertEquals(swimInWater(grid), output)
})

Deno.test("a", () => {
    const grid = [[0, 1, 2, 3, 4], [24, 23, 22, 21, 5], [12, 13, 14, 15, 16], [11, 17, 18, 19, 20], [10, 9, 8, 7, 6]]
    const output = 16
    assertEquals(swimInWater(grid), output)
})
Deno.test("c", () => {
    const grid = [[26, 99, 80, 1, 89, 86, 54, 90, 47, 87], [9, 59, 61, 49, 14, 55, 77, 3, 83, 79], [42, 22, 15, 5, 95, 38, 74, 12, 92, 71], [58, 40, 64, 62, 24, 85, 30, 6, 96, 52], [10, 70, 57, 19, 44, 27, 98, 16, 25, 65], [13, 0, 76, 32, 29, 45, 28, 69, 53, 41], [18, 8, 21, 67, 46, 36, 56, 50, 51, 72], [39, 78, 48, 63, 68, 91, 34, 4, 11, 31], [97, 23, 60, 17, 66, 37, 43, 33, 84, 35], [75, 88, 82, 20, 7, 73, 2, 94, 93, 81]]
    const output = 81
    assertEquals(swimInWater(grid), output)
})
