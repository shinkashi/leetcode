/*
 * @lc app=leetcode id=943 lang=typescript
 *
 * [943] Find the Shortest Superstring
 *
 * https://leetcode.com/problems/find-the-shortest-superstring/description/
 *
 * algorithms
 * Hard (43.47%)
 * Likes:    713
 * Dislikes: 106
 * Total Accepted:    19.8K
 * Total Submissions: 42.9K
 * Testcase Example:  '["alex","loves","leetcode"]'
 *
 * Given an array of strings words, return the smallest string that contains
 * each string in words as a substring. If there are multiple valid strings of
 * the smallest length, return any of them.
 * 
 * You may assume that no string in words is a substring of another string in
 * words.
 * 
 * 
 * Example 1:
 * 
 * 
 * Input: words = ["alex","loves","leetcode"]
 * Output: "alexlovesleetcode"
 * Explanation: All permutations of "alex","loves","leetcode" would also be
 * accepted.
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: words = ["catg","ctaagt","gcta","ttca","atgcatc"]
 * Output: "gctaagttcatgcatc"
 * 
 * 
 * 
 * Constraints:
 * 
 * 
 * 1 <= words.length <= 12
 * 1 <= words[i].length <= 20
 * words[i] consists of lowercase English letters.
 * All the strings of words are unique.
 * 
 * 
 */

// @lc code=start
function shortestSuperstring(words: string[]): string {
    // calculate overlap between words
    const overlap: number[][] = Array.from({ length: words.length }, x => [])
    for (let i = 0; i < words.length; i++) {
        for (let j = 0; j < words.length; j++) {
            overlap[i][j] = 0;
            if (i == j) continue;
            // console.log({ i, j })
            const minlen = Math.min(words[i].length, words[j].length);
            for (let len = minlen; len >= 1; len--) {
                const last = words[i].slice(words[i].length - len)
                const first = words[j].slice(0, len)
                // console.log({ len, last, first })
                if (last == first) {
                    overlap[i][j] = len;
                    break;
                }
            }
        }
    }
    // console.table(overlap);

    // solve Shortest Hamilton Paths
    const hamilton = () => {
        const n = words.length;
        const dp: string[][] = Array.from(
            { length: 1 << n }, x => Array(n).fill("")
        );

        for (let i = 0; i < n; i++) {
            dp[1 << i][i] = words[i];
        }

        for (let s = 0; s < 1 << n; s++) {
            for (let cur = 0; cur < n; cur++) {
                if (!(s >> cur & 1) || dp[s][cur] === undefined) continue;

                for (let dst = 0; dst < n; dst++) {
                    if (dst != cur && !(s >> dst & 1)) {
                        const nextS = s | 1 << dst;
                        const nextWord = dp[s][cur] + words[dst].slice(overlap[cur][dst]);
                        if (!dp[nextS][dst] || dp[nextS][dst]!.length > nextWord.length) {
                            dp[nextS][dst] = nextWord;
                        }
                    }
                }
            }
        }

        // console.table(dp);

        let res = "";
        for (let i = 0; i < n; i++) {
            if (!res || dp[(1 << n) - 1][i].length < res.length) {
                res = dp[(1 << n) - 1][i];
            }
        }
        return res;

    }

    return hamilton();
}
// @lc code=end

import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

// Deno.test("a", () => {
//     const words = ["alex", "loves", "leetcode"];
//     const output = "alexlovesleetcode";
//     assertEquals(shortestSuperstring(words), output);
// })

Deno.test("a", () => {
    const words = ["catg", "ctaagt", "gcta", "ttca", "atgcatc"];
    const output = "gctaagttcatgcatc";
    assertEquals(shortestSuperstring(words), output);
})
