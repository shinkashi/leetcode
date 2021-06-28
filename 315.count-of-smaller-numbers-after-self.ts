/*
 * @lc app=leetcode id=315 lang=typescript
 *
 * [315] Count of Smaller Numbers After Self
 *
 * https://leetcode.com/problems/count-of-smaller-numbers-after-self/description/
 *
 * algorithms
 * Hard (42.30%)
 * Likes:    3970
 * Dislikes: 119
 * Total Accepted:    184.9K
 * Total Submissions: 439.2K
 * Testcase Example:  '[5,2,6,1]'
 *
 * You are given an integer array nums and you have to return a new counts
 * array. The counts array has the property where counts[i] is the number of
 * smaller elements to the right of nums[i].
 * 
 * 
 * Example 1:
 * 
 * 
 * Input: nums = [5,2,6,1]
 * Output: [2,1,1,0]
 * Explanation:
 * To the right of 5 there are 2 smaller elements (2 and 1).
 * To the right of 2 there is only 1 smaller element (1).
 * To the right of 6 there is 1 smaller element (1).
 * To the right of 1 there is 0 smaller element.
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: nums = [-1]
 * Output: [0]
 * 
 * 
 * Example 3:
 * 
 * 
 * Input: nums = [-1,-1]
 * Output: [0,0]
 * 
 * 
 * 
 * Constraints:
 * 
 * 
 * 1 <= nums.length <= 10^5
 * -10^4 <= nums[i] <= 10^4
 * 
 * 
 */



// @lc code=start
function countSmaller(nums: number[]): number[] {
    class TreeNode {
        val: number;
        count: number;
        right: TreeNode | null;
        left: TreeNode | null;

        constructor(value: number) {
            this.val = value;
            this.count = 0;
            this.right = null;
            this.left = null;
        }
    }

    const insert = (root: TreeNode | null, val: number, countArr: number[], index: number, count: number) => {
        if (!root) {
            root = new TreeNode(val);
            countArr[index] = count;
        } else if (root.val > val) {
            root.count++;
            root.left = insert(root.left, val, countArr, index, count);
        } else {
            root.right = insert(root.right, val, countArr, index, root.count + count + (root.val < val ? 1 : 0));
        }

        return root;
    };



    const result: number[] = [];
    let root = null;

    // For every entry in nums, insert it into the root BST
    for (let i = nums.length - 1; i >= 0; i--) {
        root = insert(root, nums[i], result, i, 0);
    }

    return result;
}

// @lc code=end

function countSmaller1(nums: number[]): number[] {
    // m.get(n) == number of elements smaller than n
    const m = new Map<number, number>();

    const res: number[] = [];
    for (let i = nums.length - 1; i >= 0; i--) {
        const n = nums[i];

        // fill the slot if empty
        if (!m.has(n)) m.set(n, 0);

        console.log({ i, m })

        const k = [...m.keys()].sort((a, b) => b - a);

        let cnt = 0;
        for (let j = 0; j < k.length; j++) {
            if (k[j] >= n) {
                m.set(k[j], m.get(k[j])! + 1);
            } else {
                cnt = m.get(k[j]) ?? 0;
                break;
            }
        }

        res[i] = cnt;
    }
    return res;
};
