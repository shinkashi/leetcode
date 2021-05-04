/*
 * @lc app=leetcode id=34 lang=typescript
 *
 * [34] Find First and Last Position of Element in Sorted Array
 *
 * https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/description/
 *
 * algorithms
 * Medium (37.55%)
 * Likes:    5430
 * Dislikes: 209
 * Total Accepted:    694.6K
 * Total Submissions: 1.8M
 * Testcase Example:  '[5,7,7,8,8,10]\n8'
 *
 * Given an array of integers nums sorted in ascending order, find the starting
 * and ending position of a given target value.
 * 
 * If target is not found in the array, return [-1, -1].
 * 
 * Follow up: Could you write an algorithm with O(log n) runtime complexity?
 * 
 * 
 * Example 1:
 * Input: nums = [5,7,7,8,8,10], target = 8
 * Output: [3,4]
 * Example 2:
 * Input: nums = [5,7,7,8,8,10], target = 6
 * Output: [-1,-1]
 * Example 3:
 * Input: nums = [], target = 0
 * Output: [-1,-1]
 * 
 * 
 * Constraints:
 * 
 * 
 * 0 <= nums.length <= 10^5
 * -10^9 <= nums[i] <= 10^9
 * nums is a non-decreasing array.
 * -10^9 <= target <= 10^9
 * 
 * 
 */

// @lc code=start
function searchRange(nums: number[], target: number): number[] {
    const binarySeach = (fn: (x: number) => boolean) => {
        let hi = nums.length;
        let lo = 0;
        while (lo < hi) {
            const mid = lo + Math.floor((hi - lo) / 2);
            if (fn(mid)) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return lo;
    }

    let lowerBound = binarySeach((x) => nums[x] >= target);
    let upperBound = binarySeach((x) => nums[x] > target);
    upperBound--;

    // console.log({ lowerBound, upperBound })
    if (nums[lowerBound] !== target) lowerBound = -1;
    if (nums[upperBound] !== target) upperBound = -1;

    return [lowerBound, upperBound];
};
// @lc code=end

const nums = [5, 7, 7, 8, 8, 10], target = 6;
searchRange(nums, target);
