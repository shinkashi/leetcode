/*
 * @lc app=leetcode id=583 lang=typescript
 *
 * [583] Delete Operation for Two Strings
 *
 * https://leetcode.com/problems/delete-operation-for-two-strings/description/
 *
 * algorithms
 * Medium (50.49%)
 * Likes:    1764
 * Dislikes: 38
 * Total Accepted:    80.2K
 * Total Submissions: 154.8K
 * Testcase Example:  '"sea"\n"eat"'
 *
 * Given two strings word1 and word2, return the minimum number of steps
 * required to make word1 and word2 the same.
 * 
 * In one step, you can delete exactly one character in either string.
 * 
 * 
 * Example 1:
 * 
 * 
 * Input: word1 = "sea", word2 = "eat"
 * Output: 2
 * Explanation: You need one step to make "sea" to "ea" and another step to
 * make "eat" to "ea".
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: word1 = "leetcode", word2 = "etco"
 * Output: 4
 * 
 * 
 * 
 * Constraints:
 * 
 * 
 * 1 <= word1.length, word2.length <= 500
 * word1 and word2 consist of only lowercase English letters.
 * 
 * 
 */

// @lc code=start
function minDistance(word1: string, word2: string): number {
    const dp = Array.from({ length: word1.length + 1 },
        x => Array(word2.length + 1).fill(Infinity));

    dp[0][0] = 0;

    for (let i = 0; i <= word1.length; i++) {
        for (let j = 0; j <= word2.length; j++) {
            // no change
            if (i > 0 && j > 0) {
                if (word1[i - 1] == word2[j - 1]) {
                    dp[i][j] = Math.min(dp[i][j], dp[i - 1][j - 1]);
                }
            }
            // delete one from word1
            if (i > 0) dp[i][j] = Math.min(dp[i][j], dp[i - 1][j] + 1);
            // delete one from word2
            if (j > 0) dp[i][j] = Math.min(dp[i][j], dp[i][j - 1] + 1);
        }
    }

    return dp[word1.length][word2.length];
};
// @lc code=end

console.log(minDistance("leetcode", "etco"));
