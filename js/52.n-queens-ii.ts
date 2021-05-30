/*
 * @lc app=leetcode id=52 lang=typescript
 *
 * [52] N-Queens II
 *
 * https://leetcode.com/problems/n-queens-ii/description/
 *
 * algorithms
 * Hard (60.71%)
 * Likes:    901
 * Dislikes: 187
 * Total Accepted:    167.6K
 * Total Submissions: 272.2K
 * Testcase Example:  '4'
 *
 * The n-queens puzzle is the problem of placing n queens on an n x n
 * chessboard such that no two queens attack each other.
 * 
 * Given an integer n, return the number of distinct solutions to the n-queens
 * puzzle.
 * 
 * 
 * Example 1:
 * 
 * 
 * Input: n = 4
 * Output: 2
 * Explanation: There are two distinct solutions to the 4-queens puzzle as
 * shown.
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: n = 1
 * Output: 1
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
function totalNQueens(n: number): number {
    const board: number[] = [];

    const answer: number[][] = [];

    const isSameBoard = (a: number[], b: number[]): boolean => {
        for (let i = 0; i < a.length; i++) {
            if (a[i] != b[i]) return false;
        }
        return true;
    }

    const flipBoard = (a: number[]): number[] => {
        return [...a].reverse();
    }

    const rotateBoard = (a: number[]): number[] => {
        const b = Array(a.length);
        for (let i = 0; i < a.length; i++) {
            b[a[i]] = a.length - 1 - i;
        }
        return b;
    }

    const checkIfAlreadyExists = (board: number[]): boolean => {
        // let b = [...board];
        // if (answer.some(a => isSameBoard(a, b))) return true;

        // b = rotateBoard(b);
        // if (answer.some(a => isSameBoard(a, b))) return true;
        // b = rotateBoard(b);
        // if (answer.some(a => isSameBoard(a, b))) return true;
        // b = rotateBoard(b);
        // if (answer.some(a => isSameBoard(a, b))) return true;

        // b = flipBoard([...board]);
        // if (answer.some(a => isSameBoard(a, b))) return true;
        // b = rotateBoard(b);
        // if (answer.some(a => isSameBoard(a, b))) return true;
        // b = rotateBoard(b);
        // if (answer.some(a => isSameBoard(a, b))) return true;
        // b = rotateBoard(b);
        // if (answer.some(a => isSameBoard(a, b))) return true;

        return false;
    }

    let cnt = 0;

    const dfs = () => {
        const y = board.length;
        // console.log({ board })
        if (y == n) {
            if (!checkIfAlreadyExists(board)) {
                answer.push(board);
                cnt++;
            }
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
    return cnt;
};
// @lc code=end

import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

Deno.test("1", () => {
    assertEquals(totalNQueens(1), 1);
})

Deno.test("4", () => {
    assertEquals(totalNQueens(4), 2);
})




