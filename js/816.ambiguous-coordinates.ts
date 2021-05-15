/*
 * @lc app=leetcode id=816 lang=typescript
 *
 * [816] Ambiguous Coordinates
 *
 * https://leetcode.com/problems/ambiguous-coordinates/description/
 *
 * algorithms
 * Medium (48.23%)
 * Likes:    138
 * Dislikes: 261
 * Total Accepted:    11.7K
 * Total Submissions: 24K
 * Testcase Example:  '"(123)"'
 *
 * We had some 2-dimensional coordinates, like "(1, 3)" or "(2, 0.5)".  Then,
 * we removed all commas, decimal points, and spaces, and ended up with the
 * string s.  Return a list of strings representing all possibilities for what
 * our original coordinates could have been.
 * 
 * Our original representation never had extraneous zeroes, so we never started
 * with numbers like "00", "0.0", "0.00", "1.0", "001", "00.01", or any other
 * number that can be represented with less digits.  Also, a decimal point
 * within a number never occurs without at least one digit occuring before it,
 * so we never started with numbers like ".1".
 * 
 * The final answer list can be returned in any order.  Also note that all
 * coordinates in the final answer have exactly one space between them
 * (occurring after the comma.)
 * 
 * 
 * Example 1:
 * Input: s = "(123)"
 * Output: ["(1, 23)", "(12, 3)", "(1.2, 3)", "(1, 2.3)"]
 * 
 * 
 * 
 * Example 2:
 * Input: s = "(00011)"
 * Output:  ["(0.001, 1)", "(0, 0.011)"]
 * Explanation: 
 * 0.0, 00, 0001 or 00.01 are not allowed.
 * 
 * 
 * 
 * Example 3:
 * Input: s = "(0123)"
 * Output: ["(0, 123)", "(0, 12.3)", "(0, 1.23)", "(0.1, 23)", "(0.1, 2.3)",
 * "(0.12, 3)"]
 * 
 * 
 * 
 * Example 4:
 * Input: s = "(100)"
 * Output: [(10, 0)]
 * Explanation: 
 * 1.0 is not allowed.
 * 
 * 
 * 
 * 
 * Note: 
 * 
 * 
 * 4 <= s.length <= 12.
 * s[0] = "(", s[s.length - 1] = ")", and the other elements in s are
 * digits.
 * 
 * 
 * 
 * 
 */

// @lc code=start
function ambiguousCoordinates(s: string): string[] {
    const patterns = (w: string) => {
        const res: string[] = [];
        // not decimal
        if (w === '0' || w[0] != '0') res.push(w);

        // decimal
        for (let i = 1; i < w.length; i++) {
            const w1 = w.slice(0, i);
            const w2 = w.slice(i);
            if (w1 != "0" && w1[0] == "0") continue;
            if (w2.endsWith('0')) continue;
            res.push(w1 + '.' + w2);
        }

        return res;
    }

    let res = [];

    s = s.slice(1, s.length - 1);

    for (let i = 1; i < s.length; i++) {
        const k1 = s.slice(0, i);
        const k2 = s.slice(i);
        // console.log({ k1, k2 });
        const words1 = patterns(k1);
        const words2 = patterns(k2);
        // console.log({ words1, words2 })
        if (words1.length > 0 && words2.length > 0) {
            for (const w1 of words1) {
                for (const w2 of words2) {
                    res.push(`(${w1}, ${w2})`)
                }
            }
        }
    }

    return res
};
// @lc code=end

import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

Deno.test("a", () => {
    const s = "(123)";
    const output = ["(1, 23)", "(12, 3)", "(1.2, 3)", "(1, 2.3)"];
    assertEquals(ambiguousCoordinates(s).sort(), output.sort());
})
Deno.test("a", () => {
    const s = "(00011)";
    const output = ["(0.001, 1)", "(0, 0.011)"];
    assertEquals(ambiguousCoordinates(s).sort(), output.sort());
})
Deno.test("a", () => {
    const s = "(0123)";
    const output = ["(0, 123)", "(0, 12.3)", "(0, 1.23)", "(0.1, 23)", "(0.1, 2.3)", "(0.12, 3)"];
    assertEquals(ambiguousCoordinates(s).sort(), output.sort());
})
Deno.test("a", () => {
    const s = "(100)";
    const output = ["(10, 0)"];
    assertEquals(ambiguousCoordinates(s).sort(), output.sort());
})

