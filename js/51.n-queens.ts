/*
 * @lc app=leetcode id=51 lang=typescript
 *
 * [51] N-Queens
 *
 * https://leetcode.com/problems/n-queens/description/
 *
 * algorithms
 * Hard (50.37%)
 * Likes:    3039
 * Dislikes: 109
 * Total Accepted:    257.6K
 * Total Submissions: 506.4K
 * Testcase Example:  '4'
 *
 * The n-queens puzzle is the problem of placing n queens on an n x n
 * chessboard such that no two queens attack each other.
 * 
 * Given an integer n, return all distinct solutions to the n-queens puzzle.
 * 
 * Each solution contains a distinct board configuration of the n-queens'
 * placement, where 'Q' and '.' both indicate a queen and an empty space,
 * respectively.
 * 
 * 
 * Example 1:
 * 
 * 
 * Input: n = 4
 * Output: [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
 * Explanation: There exist two distinct solutions to the 4-queens puzzle as
 * shown above
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: n = 1
 * Output: [["Q"]]
 * 
 * 
 * 
 * Constraints:
 * 
 * 
 * 1 <= n <= 9
 * 
 * 
 */

// @lc code=start
function solveNQueens(n: number): string[][] {
    const board: number[] = [];

    const answer: string[][] = [];

    const dumpBoard = (): string[] => {
        const res: string[] = [];
        for (let y = 0; y < n; y++) {
            let s = "";
            for (let x = 0; x < n; x++) {
                s += board[y] == x ? "Q" : ".";
            }
            res.push(s);
        }
        return res;
    }

    const dfs = () => {
        const y = board.length;
        // console.log({ board })
        if (y == n) {
            answer.push(dumpBoard());
        }

        for (let x = 0; x < n; x++) {

            // check vertical blunder
            if (board.includes(x)) continue;

            // check orthogonal blunder
            let collided = false;
            for (const [dy, dx] of [[1, 1], [1, -1], [-1, 1], [-1, -1]]) {
                let cx = x, cy = y;
                while (cx >= 0 && cx < n && cy >= 0 && cy < n) {
                    if (board[cy] === cx) { collided = true; break; }
                    cx += dx;
                    cy += dy;
                }
                if (collided) break;
            }
            if (collided) continue;

            // put a queen
            board.push(x);
            dfs();
            board.pop();
        }
    }

    dfs();
    return answer;
};
// @lc code=end
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

Deno.test("4", () => {
    const output = solveNQueens(4);
    const expected = [
        [".Q..", "...Q", "Q...", "..Q."],
        ["..Q.", "Q...", "...Q", ".Q.."]
    ];
    assertEquals(output, expected);
})

Deno.test("8", () => {
    const output = solveNQueens(8);
    assertEquals(output.length, 92);
})
