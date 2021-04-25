/*
 * @lc app=leetcode id=48 lang=typescript
 *
 * [48] Rotate Image
 *
 * https://leetcode.com/problems/rotate-image/description/
 *
 * algorithms
 * Medium (60.69%)
 * Likes:    4785
 * Dislikes: 335
 * Total Accepted:    567.5K
 * Total Submissions: 932.1K
 * Testcase Example:  '[[1,2,3],[4,5,6],[7,8,9]]'
 *
 * You are given an n x n 2D matrix representing an image, rotate the image by
 * 90 degrees (clockwise).
 * 
 * You have to rotate the image in-place, which means you have to modify the
 * input 2D matrix directly. DO NOT allocate another 2D matrix and do the
 * rotation.
 * 
 * 
 * Example 1:
 * 
 * 
 * Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
 * Output: [[7,4,1],[8,5,2],[9,6,3]]
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
 * Output: [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]
 * 
 * 
 * Example 3:
 * 
 * 
 * Input: matrix = [[1]]
 * Output: [[1]]
 * 
 * 
 * Example 4:
 * 
 * 
 * Input: matrix = [[1,2],[3,4]]
 * Output: [[3,1],[4,2]]
 * 
 * 
 * 
 * Constraints:
 * 
 * 
 * matrix.length == n
 * matrix[i].length == n
 * 1 <= n <= 20
 * -1000 <= matrix[i][j] <= 1000
 * 
 * 
 */

import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

// @lc code=start
/**
 Do not return anything, modify matrix in-place instead.
 */

function rotate(matrix: number[][]): void {
    const n = matrix.length;

    const rotateRing = (depth: number) => {
        const w = n - depth * 2;
        // console.log({ w })
        for (let i = 0; i < w - 1; i++) {
            const left = depth;
            const right = depth + w - 1;
            const top = depth;
            const bottom = depth + w - 1;
            const [x1, y1] = [left + i, top];
            const [x2, y2] = [right, top + i];
            const [x3, y3] = [right - i, bottom];
            const [x4, y4] = [left, bottom - i];
            [
                matrix[y2][x2],
                matrix[y3][x3],
                matrix[y4][x4],
                matrix[y1][x1],
            ] = [
                    matrix[y1][x1],
                    matrix[y2][x2],
                    matrix[y3][x3],
                    matrix[y4][x4]
                ];

        }


    }
    for (let i = 0; i < n / 2; i++) {
        rotateRing(i);
    }
    // console.log("");
    // console.table(matrix);
};

// @lc code=end

Deno.test("a", () => {
    const m = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
    rotate(m);
    assertEquals(m,
        [[7, 4, 1], [8, 5, 2], [9, 6, 3]]
    );
});

Deno.test("a", () => {
    const m = [[5, 1, 9, 11], [2, 4, 8, 10], [13, 3, 6, 7], [15, 14, 12, 16]];
    rotate(m);
    assertEquals(m,
        [[15, 13, 2, 5], [14, 3, 4, 1], [12, 6, 8, 9], [16, 7, 10, 11]]
    );
});

Deno.test("a", () => {
    const m = [[1]];
    rotate(m);
    assertEquals(m,
        [[1]]
    );
});

Deno.test("a", () => {
    const m = [[1, 2], [3, 4]]
    rotate(m);
    assertEquals(m,
        [[3, 1], [4, 2]]
    );
});
