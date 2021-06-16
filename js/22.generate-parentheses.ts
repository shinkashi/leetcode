/*
 * @lc app=leetcode id=22 lang=typescript
 *
 * [22] Generate Parentheses
 *
 * https://leetcode.com/problems/generate-parentheses/description/
 *
 * algorithms
 * Medium (66.37%)
 * Likes:    8197
 * Dislikes: 341
 * Total Accepted:    759K
 * Total Submissions: 1.1M
 * Testcase Example:  '3'
 *
 * Given n pairs of parentheses, write a function to generate all combinations
 * of well-formed parentheses.
 * 
 * 
 * Example 1:
 * Input: n = 3
 * Output: ["((()))","(()())","(())()","()(())","()()()"]
 * Example 2:
 * Input: n = 1
 * Output: ["()"]
 * 
 * 
 * Constraints:
 * 
 * 
 * 1 <= n <= 8
 * 
 * 
 */

// @lc code=start
function generateParenthesis(n: number): string[] {
    const res: string[] = [];
    let lv = 0;

    const dfs = (s: string, lv: number) => {
        if (s.length == n * 2) {
            if (lv == 0) res.push(s);
            return;
        }
        dfs(s + "(", lv + 1);
        if (lv > 0) dfs(s + ")", lv - 1);
    }

    dfs("", 0);

    return res;
};
// @lc code=end

import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

Deno.test("test", () => {
    const n = 3;
    const output = ["((()))", "(()())", "(())()", "()(())", "()()()"]
    assertEquals(generateParenthesis(n).sort(), output.sort());
})
Deno.test("test", () => {
    const n = 1;
    const output = ["()"];
    assertEquals(generateParenthesis(n).sort(), output.sort());
})
