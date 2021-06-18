/*
 * @lc app=leetcode id=307 lang=typescript
 *
 * [307] Range Sum Query - Mutable
 *
 * https://leetcode.com/problems/range-sum-query-mutable/description/
 *
 * algorithms
 * Medium (37.28%)
 * Likes:    1970
 * Dislikes: 111
 * Total Accepted:    143.8K
 * Total Submissions: 385K
 * Testcase Example:  '["NumArray","sumRange","update","sumRange"]\n[[[1,3,5]],[0,2],[1,2],[0,2]]'
 *
 * Given an integer array nums, handle multiple queries of the following
 * types:
 * 
 * 
 * Update the value of an element in nums.
 * Calculate the sum of the elements of nums between indices left and right
 * inclusive where left <= right.
 * 
 * 
 * Implement the NumArray class:
 * 
 * 
 * NumArray(int[] nums) Initializes the object with the integer array nums.
 * void update(int index, int val) Updates the value of nums[index] to be
 * val.
 * int sumRange(int left, int right) Returns the sum of the elements of nums
 * between indices left and right inclusive (i.e. nums[left] + nums[left + 1] +
 * ... + nums[right]).
 * 
 * 
 * 
 * Example 1:
 * 
 * 
 * Input
 * ["NumArray", "sumRange", "update", "sumRange"]
 * [[[1, 3, 5]], [0, 2], [1, 2], [0, 2]]
 * Output
 * [null, 9, null, 8]
 * 
 * Explanation
 * NumArray numArray = new NumArray([1, 3, 5]);
 * numArray.sumRange(0, 2); // return 1 + 3 + 5 = 9
 * numArray.update(1, 2);   // nums = [1, 2, 5]
 * numArray.sumRange(0, 2); // return 1 + 2 + 5 = 8
 * 
 * 
 * 
 * Constraints:
 * 
 * 
 * 1 <= nums.length <= 3 * 10^4
 * -100 <= nums[i] <= 100
 * 0 <= index < nums.length
 * -100 <= val <= 100
 * 0 <= left <= right < nums.length
 * At most 3 * 10^4 calls will be made to update and sumRange.
 * 
 * 
 */

// @lc code=start
type Node = number;

class SegTree {
    public n: number;
    public dat: Node[];

    constructor(origin: Node[]) {
        // The number of the botton nodes = n, which is a power of 2 and larger than origin.
        // Total nodes are 2n-1 (top part = n-1, bottom part = n)
        let x = 1
        while (origin.length > x) x *= 2;
        this.n = x
        this.dat = Array(2 * this.n - 1).fill(0);

        // Load the bottom nodes. 
        // As there are n - 1 nodes in the top part, origin[i] == dat[n-1 + i]
        for (let i = 0; i < origin.length; i++) this.dat[i + this.n - 1] = origin[i];

        // Fill the top part.
        // children of dat[i] are dat[2*i+1] and dat[2*i+2]
        for (let i = this.n - 2; i >= 0; i--) this.dat[i] = this.dat[2 * i + 1] + this.dat[2 * i + 2];
    }

    // Returns the sum of requested range [a, b)
    // k = index of current node
    // [l, r) = target range
    public query(a: number, b: number, k = 0, l = 0, r = -1): Node {
        // set the first target as [0, n) 
        if (r < 0) r = this.n;

        // return nothing when requested range and target range do not overlap
        if (r <= a || b <= l) return 0;

        // if requested range and target range are equal, use the segtree data
        if (a <= l && r <= b) return this.dat[k]

        // if there's overlap, search sub ranges
        // left range = vl, right range = vr
        // new target range is a half of the current target range
        const vl = this.query(a, b, 2 * k + 1, l, (l + r) >> 1);
        const vr = this.query(a, b, 2 * k + 2, (l + r) >> 1, r);
        const res = vl + vr;
        return res;
    }

    public update(idx: number, v: Node) {
        let i = this.n - 1 + idx;
        this.dat[i] = v;
        while (i != 0) {
            i = (i - 1) >> 1;
            this.dat[i] = this.dat[2 * i + 1] + this.dat[2 * i + 2];
        }
    }
}

class NumArray {
    seg: SegTree;

    constructor(nums: number[]) {
        this.seg = new SegTree(nums);
    }

    update(index: number, val: number): void {
        this.seg.update(index, val);
    }

    sumRange(left: number, right: number): number {
        return this.seg.query(left, right + 1);
    }
}

/**
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * obj.update(index,val)
 * var param_2 = obj.sumRange(left,right)
 */
// @lc code=end

import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

Deno.test("a", () => {
    const numArray = new NumArray([1, 3, 5]);
    // console.log(numArray.seg.dat);

    assertEquals(numArray.sumRange(0, 2), 9); // return 1 + 3 + 5 = 9
    numArray.update(1, 2);   // nums = [1, 2, 5]
    // assertEquals(numArray.nums, [1, 2, 5]);
    assertEquals(numArray.sumRange(0, 2), 8); // return 1 + 2 + 5 = 8
})

