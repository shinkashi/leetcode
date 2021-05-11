/*
 * @lc app=leetcode id=204 lang=typescript
 *
 * [204] Count Primes
 *
 * https://leetcode.com/problems/count-primes/description/
 *
 * algorithms
 * Easy (32.34%)
 * Likes:    3121
 * Dislikes: 788
 * Total Accepted:    480.7K
 * Total Submissions: 1.5M
 * Testcase Example:  '10'
 *
 * Count the number of prime numbers less than a non-negative number, n.
 * 
 * 
 * Example 1:
 * 
 * 
 * Input: n = 10
 * Output: 4
 * Explanation: There are 4 prime numbers less than 10, they are 2, 3, 5, 7.
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: n = 0
 * Output: 0
 * 
 * 
 * Example 3:
 * 
 * 
 * Input: n = 1
 * Output: 0
 * 
 * 
 * 
 * Constraints:
 * 
 * 
 * 0 <= n <= 5 * 10^6
 * 
 * 
 */

// @lc code=start
function countPrimes(n: number): number {
    const sieve = Array(n + 1);
    for (let i = 2; i * i <= n; i++) {
        if (sieve[i] !== false) {
            for (let j = i * i; j <= n; j += i) sieve[j] = false;
        }
    }

    let cnt = 0;
    for (let i = 2; i < n; i++) {
        if (sieve[i] !== false) cnt++;
    }
    return cnt;
};
// @lc code=end

