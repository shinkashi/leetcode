/*
 * @lc app=leetcode id=45 lang=typescript
 *
 * [45] Jump Game II
 *
 * https://leetcode.com/problems/jump-game-ii/description/
 *
 * algorithms
 * Medium (31.81%)
 * Likes:    4094
 * Dislikes: 177
 * Total Accepted:    336.4K
 * Total Submissions: 1.1M
 * Testcase Example:  '[2,3,1,1,4]'
 *
 * Given an array of non-negative integers nums, you are initially positioned
 * at the first index of the array.
 * 
 * Each element in the array represents your maximum jump length at that
 * position.
 * 
 * Your goal is to reach the last index in the minimum number of jumps.
 * 
 * You can assume that you can always reach the last index.
 * 
 * 
 * Example 1:
 * 
 * 
 * Input: nums = [2,3,1,1,4]
 * Output: 2
 * Explanation: The minimum number of jumps to reach the last index is 2. Jump
 * 1 step from index 0 to 1, then 3 steps to the last index.
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: nums = [2,3,0,1,4]
 * Output: 2
 * 
 * 
 * 
 * Constraints:
 * 
 * 
 * 1 <= nums.length <= 1000
 * 0 <= nums[i] <= 10^5
 * 
 * 
 */

// @lc code=start
function jump(nums: number[]): number {
    let visited = Array(nums.length).fill(false);
    let q = new Set<number>();
    q.add(0);
    let jumps = 0;
    while (q.size) {
        let qq = new Set<number>();
        for (const p of q) {
            if (p === nums.length - 1) return jumps;
            visited[p] = true;
            const start = Math.max(0, p - nums[p]);
            const end = Math.min(nums.length - 1, p + nums[p]);
            for (let i = start; i <= end; i++) {
                if (!visited[i]) qq.add(i);
            }
        }
        q = qq;
        jumps++;
    }
};
// @lc code=end

const nums = [5, 8, 1, 8, 9, 8, 7, 1, 7, 5, 8, 6, 5, 4, 7, 3, 9, 9, 0, 6, 6, 3, 4, 8, 0, 5, 8, 9, 5, 3, 7, 2, 1, 8, 2, 3, 8, 9, 4, 7, 6, 2, 5, 2, 8, 2, 7, 9, 3, 7, 6, 9, 2, 0, 8, 2, 7, 8, 4, 4, 1, 1, 6, 4, 1, 0, 7, 2, 0, 3, 9, 8, 7, 7, 0, 6, 9, 9, 7, 3, 6, 3, 4, 8, 6, 4, 3, 3, 2, 7, 8, 5, 8, 6, 0];
const output = jump(nums);
console.log(output);
