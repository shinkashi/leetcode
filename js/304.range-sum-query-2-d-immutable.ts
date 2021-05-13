/*
 * @lc app=leetcode id=304 lang=typescript
 *
 * [304] Range Sum Query 2D - Immutable
 *
 * https://leetcode.com/problems/range-sum-query-2d-immutable/description/
 *
 * algorithms
 * Medium (41.31%)
 * Likes:    1680
 * Dislikes: 212
 * Total Accepted:    165.3K
 * Total Submissions: 383.5K
 * Testcase Example:  '["NumMatrix","sumRegion","sumRegion","sumRegion"]\n' +
  '[[[[3,0,1,4,2],[5,6,3,2,1],[1,2,0,1,5],[4,1,0,1,7],[1,0,3,0,5]]],[2,1,4,3],[1,1,2,2],[1,2,2,4]]'
 *
 * Given a 2D matrix matrix, handle multiple queries of the following
 * type:
 * 
 * 
 * Calculate the sum of the elements of matrix inside the rectangle defined by
 * its upper left corner (row1, col1) and lower right corner (row2, col2).
 * 
 * 
 * Implement the NumMatrix class:
 * 
 * 
 * NumMatrix(int[][] matrix) Initializes the object with the integer matrix
 * matrix.
 * int sumRegion(int row1, int col1, int row2, int col2) Returns the sum of the
 * elements of matrix inside the rectangle defined by its upper left corner
 * (row1, col1) and lower right corner (row2, col2).
 * 
 * 
 * 
 * Example 1:
 * 
 * 
 * Input
 * ["NumMatrix", "sumRegion", "sumRegion", "sumRegion"]
 * [[[[3, 0, 1, 4, 2], [5, 6, 3, 2, 1], [1, 2, 0, 1, 5], [4, 1, 0, 1, 7], [1,
 * 0, 3, 0, 5]]], [2, 1, 4, 3], [1, 1, 2, 2], [1, 2, 2, 4]]
 * Output
 * [null, 8, 11, 12]
 * 
 * Explanation
 * NumMatrix numMatrix = new NumMatrix([[3, 0, 1, 4, 2], [5, 6, 3, 2, 1], [1,
 * 2, 0, 1, 5], [4, 1, 0, 1, 7], [1, 0, 3, 0, 5]]);
 * numMatrix.sumRegion(2, 1, 4, 3); // return 8 (i.e sum of the red rectangle)
 * numMatrix.sumRegion(1, 1, 2, 2); // return 11 (i.e sum of the green
 * rectangle)
 * numMatrix.sumRegion(1, 2, 2, 4); // return 12 (i.e sum of the blue
 * rectangle)
 * 
 * 
 * 
 * Constraints:
 * 
 * 
 * m == matrix.length
 * n == matrix[i].length
 * 1 <= m, n <= 200
 * -10^5 <= matrix[i][j] <= 10^5
 * 0 <= row1 <= row2 < m
 * 0 <= col1 <= col2 < n
 * At most 10^4 calls will be made to sumRegion.
 * 
 * 
 */

// @lc code=start
class NumMatrix {
    public acc: number[][] = [];

    constructor(matrix: number[][]) {
        for (let y = 0; y < matrix.length; y++) {
            // accumulate a line
            this.acc[y] = [];
            let sum = 0;
            for (let x = 0; x < matrix[0].length; x++) {
                sum += matrix[y][x];
                this.acc[y][x] = sum;
                if (y > 0) this.acc[y][x] += this.acc[y - 1][x];
            }
        }
    }

    sumRegion(row1: number, col1: number, row2: number, col2: number): number {
        const leftTop = row1 > 0 && col1 > 0 ? this.acc[row1 - 1][col1 - 1] : 0;
        const left = col1 > 0 ? this.acc[row2][col1 - 1] : 0;
        const top = row1 > 0 ? this.acc[row1 - 1][col2] : 0;
        const whole = this.acc[row2][col2];
        return whole - left - top + leftTop;
    }
}

/**
 * Your NumMatrix object will be instantiated and called as such:
 * var obj = new NumMatrix(matrix)
 * var param_1 = obj.sumRegion(row1,col1,row2,col2)
 */
// @lc code=end

import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

const matrix = new NumMatrix([
    [3, 0, 1, 4, 2],
    [5, 6, 3, 2, 1],
    [1, 2, 0, 1, 5],
    [4, 1, 0, 1, 7],
    [1, 0, 3, 0, 5]
])

Deno.test("a", () => {
    const res = [
        [3, 3, 4, 8, 10],
        [8, 14, 18, 24, 27],
        [9, 17, 21, 28, 36],
        [13, 22, 26, 34, 49],
        [14, 23, 30, 38, 58],
    ];
    assertEquals(matrix.acc, res);
});

Deno.test("a", () => assertEquals(matrix.sumRegion(2, 1, 4, 3), 8));
Deno.test("a", () => assertEquals(matrix.sumRegion(1, 1, 2, 2), 11));
Deno.test("a", () => assertEquals(matrix.sumRegion(1, 2, 2, 4), 12));

