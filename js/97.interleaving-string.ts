/*
 * @lc app=leetcode id=97 lang=typescript
 *
 * [97] Interleaving String
 *
 * https://leetcode.com/problems/interleaving-string/description/
 *
 * algorithms
 * Medium (32.82%)
 * Likes:    2456
 * Dislikes: 126
 * Total Accepted:    200.3K
 * Total Submissions: 599.9K
 * Testcase Example:  '"aabcc"\n"dbbca"\n"aadbbcbcac"'
 *
 * Given strings s1, s2, and s3, find whether s3 is formed by an interleaving
 * of s1 and s2.
 * 
 * An interleaving of two strings s and t is a configuration where they are
 * divided into non-empty substrings such that:
 * 
 * 
 * s = s1 + s2 + ... + sn
 * t = t1 + t2 + ... + tm
 * |n - m| <= 1
 * The interleaving is s1 + t1 + s2 + t2 + s3 + t3 + ... or t1 + s1 + t2 + s2 +
 * t3 + s3 + ...
 * 
 * 
 * Note: a + b is the concatenation of strings a and b.
 * 
 * 
 * Example 1:
 * 
 * 
 * Input: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"
 * Output: true
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbbaccc"
 * Output: false
 * 
 * 
 * Example 3:
 * 
 * 
 * Input: s1 = "", s2 = "", s3 = ""
 * Output: true
 * 
 * 
 * 
 * Constraints:
 * 
 * 
 * 0 <= s1.length, s2.length <= 100
 * 0 <= s3.length <= 200
 * s1, s2, and s3 consist of lowercase English letters.
 * 
 * 
 * 
 * Follow up: Could you solve it using only O(s2.length) additional memory
 * space?
 * 
 */

// @lc code=start
function isInterleave(s1: string, s2: string, s3: string): boolean {
    const memo = new Map<string, boolean>();
    const dfs = (i1: number, i2: number, i3: number): boolean => {
        const k = `${i1}/${i2}/${i3}`
        const m = memo.get(k)
        if (m !== undefined) return m;

        // console.log({ i1, i2, i3 })

        if (i1 == s1.length && i2 == s2.length && i3 == s3.length) {
            memo.set(k, true);
            return true;
        }

        if (s1[i1] && s3[i3] === s1[i1]) {
            if (dfs(i1 + 1, i2, i3 + 1)) {
                memo.set(k, true);
                return true;
            }
        }
        if (s2[i2] && s3[i3] === s2[i2]) {
            if (dfs(i1, i2 + 1, i3 + 1)) {
                memo.set(k, true);
                return true;
            }
        }
        memo.set(k, false);
        return false;
    }

    if (s1.length + s2.length !== s3.length) return false;

    return dfs(0, 0, 0)
};
// @lc code=end
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

Deno.test("a", () => {
    const s1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac";
    assertEquals(isInterleave(s1, s2, s3), true)
})
Deno.test("a", () => {
    const s1 = "aabcc", s2 = "dbbca", s3 = "aadbbbaccc";
    assertEquals(isInterleave(s1, s2, s3), false)
})
Deno.test("a", () => {
    const s1 = "", s2 = "", s3 = ""
    assertEquals(isInterleave(s1, s2, s3), true)
})
Deno.test("a", () => {
    const s1 = "aaaaaaaaaaaaaaaaaaaaaaaaaaa"
    const s2 = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    const s3 = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    // console.log(s1.length)
    // console.log(s2.length)
    // console.log(s3.length)

    assertEquals(isInterleave(s1, s2, s3), false)
})
