/*
 * @lc app=leetcode id=1354 lang=typescript
 *
 * [1354] Construct Target Array With Multiple Sums
 *
 * https://leetcode.com/problems/construct-target-array-with-multiple-sums/description/
 *
 * algorithms
 * Hard (31.23%)
 * Likes:    278
 * Dislikes: 38
 * Total Accepted:    9.3K
 * Total Submissions: 30K
 * Testcase Example:  '[9,3,5]'
 *
 * Given an array of integers target. From a starting array, A consisting of
 * all 1's, you may perform the following procedure :
 * 
 * 
 * let x be the sum of all elements currently in your array.
 * choose index i, such that 0 <= i < target.size and set the value of A at
 * index i to x.
 * You may repeat this procedure as many times as needed.
 * 
 * 
 * Return True if it is possible to construct the target array from A otherwise
 * return False.
 * 
 * 
 * Example 1:
 * 
 * 
 * Input: target = [9,3,5]
 * Output: true
 * Explanation: Start with [1, 1, 1] 
 * [1, 1, 1], sum = 3 choose index 1
 * [1, 3, 1], sum = 5 choose index 2
 * [1, 3, 5], sum = 9 choose index 0
 * [9, 3, 5] Done
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: target = [1,1,1,2]
 * Output: false
 * Explanation: Impossible to create target array from [1,1,1,1].
 * 
 * 
 * Example 3:
 * 
 * 
 * Input: target = [8,5]
 * Output: true
 * 
 * 
 * 
 * Constraints:
 * 
 * 
 * N == target.length
 * 1 <= target.length <= 5 * 10^4
 * 1 <= target[i] <= 10^9
 * 
 * 
 */

// @lc code=start
class Node {
    constructor(
        public val: number,
        public left: Node | null = null,
        public right: Node | null = null
    ) { };
}

// Skew Heap
function meld(a: Node | null, b: Node | null): Node | null {
    if (!a) return b;
    if (!b) return a;
    if (a.val < b.val) [b, a] = [a, b];
    a.right = meld(a.right, b);
    [a.left, a.right] = [a.right, a.left];
    return a;
}

function isPossible(target: number[]): boolean {
    let h: Node | null = null;
    let total = 0;
    for (const t of target) {
        total += t;
        h = meld(h, new Node(t));
    }
    while (h && h.val > 1) {
        let x = h!.val * 2 - total;
        // console.log({ h: h.val, x });
        if (x < 1) return false;
        const dec = h.val - x;
        x = h.val % dec;
        if (x == 0) x = dec;
        total -= h!.val;
        total += x;
        h = meld(h!.left, h!.right);
        h = meld(h!, new Node(x));
    }
    return total == target.length;
};
// @lc code=end
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

Deno.test("a", () => {
    const target = [1, 1000000000]
    assertEquals(isPossible(target), true)
})
Deno.test("b", () => {
    const target = [2, 900000002]
    assertEquals(isPossible(target), false)
})




