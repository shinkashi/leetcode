/*
 * @lc app=leetcode id=473 lang=typescript
 *
 * [473] Matchsticks to Square
 *
 * https://leetcode.com/problems/matchsticks-to-square/description/
 *
 * algorithms
 * Medium (38.50%)
 * Likes:    928
 * Dislikes: 80
 * Total Accepted:    48.9K
 * Total Submissions: 126.1K
 * Testcase Example:  '[1,1,2,2,2]'
 *
 * You are given an integer array matchsticks where matchsticks[i] is the
 * length of the i^th matchstick. You want to use all the matchsticks to make
 * one square. You should not break any stick, but you can link them up, and
 * each matchstick must be used exactly one time.
 * 
 * Return true if you can make this square and false otherwise.
 * 
 * 
 * Example 1:
 * 
 * 
 * Input: matchsticks = [1,1,2,2,2]
 * Output: true
 * Explanation: You can form a square with length 2, one side of the square
 * came two sticks with length 1.
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: matchsticks = [3,3,3,3,4]
 * Output: false
 * Explanation: You cannot find a way to form a square with all the
 * matchsticks.
 * 
 * 
 * 
 * Constraints:
 * 
 * 
 * 1 <= matchsticks.length <= 15
 * 0 <= matchsticks[i] <= 10^9
 * 
 * 
 */

// @lc code=start
function makesquare(matchsticks: number[]): boolean {
    const total = matchsticks.reduce((a, b) => a + b);
    if (total % 4 !== 0) return false;
    const edgeLen = total / 4;
    const target = [edgeLen, edgeLen, edgeLen, edgeLen];

    const dfs = (index: number) => {
        if (index == matchsticks.length) return true;
        const n = matchsticks[index];
        for (let i = 0; i <= 3; i++) {
            if (target[i] >= n) {
                target[i] -= n;
                if (dfs(index + 1)) return true;
                target[i] += n;
            }
        }
        return false;
    }

    return dfs(0);
}

function makesquare_TLE(matchsticks: number[]): boolean {
    const edgeLen = matchsticks.reduce((a, b) => a + b) / 4;
    const pos = Array(matchsticks.length).fill(1);

    const checkSquare = (pos: number[]): boolean => {
        for (let i = 1; i <= 3; i++) {
            let sum = 0;
            for (let j = 0; j < pos.length; j++) {
                if (pos[j] == i) sum += matchsticks[j];
                if (sum > edgeLen) return false;
            }
            if (sum !== edgeLen) return false;
        }
        return true;
    }

    const incrementEdge = (pos: number[]): boolean => {
        for (let i = 0; i < pos.length; i++) {
            if (pos[i] != 4) {
                pos[i]++;
                return true;
            }
            pos[i] = 1;
        }
        return false;
    }

    while (incrementEdge(pos)) {
        // console.log(pos);
        if (checkSquare(pos)) {
            // console.log({ pos, matchsticks })
            return true;
        }
    }
    return false;
};
// @lc code=end
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

Deno.test("a", () => {
    const matchsticks = [1, 1, 2, 2, 2];
    assertEquals(makesquare(matchsticks), true)
})
Deno.test("b", () => {
    const matchsticks = [3, 3, 3, 3, 4]
    assertEquals(makesquare(matchsticks), false)
})
Deno.test("c", () => {
    const matchsticks = [5, 5, 5, 5, 4, 4, 4, 4, 3, 3, 3, 3]
    assertEquals(makesquare(matchsticks), true)
})
Deno.test("d", () => {
    const matchsticks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 5, 4, 3, 2, 1]
    assertEquals(makesquare(matchsticks), false)
})
Deno.test("e", () => {
    const matchsticks = [8365434, 5366065, 7050965, 6579097, 377476, 5742073, 4607969, 2236531, 780778, 4138914, 8243332, 3627509, 1437375, 1886257, 9043799]
    assertEquals(makesquare(matchsticks), false)
})
Deno.test("e", () => {
    const matchsticks = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2];
    assertEquals(makesquare(matchsticks), false)
})
