/*
 * @lc app=leetcode id=1642 lang=typescript
 *
 * [1642] Furthest Building You Can Reach
 *
 * https://leetcode.com/problems/furthest-building-you-can-reach/description/
 *
 * algorithms
 * Medium (49.83%)
 * Likes:    601
 * Dislikes: 31
 * Total Accepted:    17.9K
 * Total Submissions: 36.5K
 * Testcase Example:  '[4,2,7,6,9,14,12]\n5\n1'
 *
 * You are given an integer array heights representing the heights of
 * buildings, some bricks, and some ladders.
 * 
 * You start your journey from building 0 and move to the next building by
 * possibly using bricks or ladders.
 * 
 * While moving from building i to building i+1 (0-indexed),
 * 
 * 
 * If the current building's height is greater than or equal to the next
 * building's height, you do not need a ladder or bricks.
 * If the current building's height is less than the next building's height,
 * you can either use one ladder or (h[i+1] - h[i]) bricks.
 * 
 * 
 * Return the furthest building index (0-indexed) you can reach if you use the
 * given ladders and bricks optimally.
 * 
 * 
 * Example 1:
 * 
 * 
 * Input: heights = [4,2,7,6,9,14,12], bricks = 5, ladders = 1
 * Output: 4
 * Explanation: Starting at building 0, you can follow these steps:
 * - Go to building 1 without using ladders nor bricks since 4 >= 2.
 * - Go to building 2 using 5 bricks. You must use either bricks or ladders
 * because 2 < 7.
 * - Go to building 3 without using ladders nor bricks since 7 >= 6.
 * - Go to building 4 using your only ladder. You must use either bricks or
 * ladders because 6 < 9.
 * It is impossible to go beyond building 4 because you do not have any more
 * bricks or ladders.
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: heights = [4,12,2,7,3,18,20,3,19], bricks = 10, ladders = 2
 * Output: 7
 * 
 * 
 * Example 3:
 * 
 * 
 * Input: heights = [14,3,19,3], bricks = 17, ladders = 0
 * Output: 3
 * 
 * 
 * 
 * Constraints:
 * 
 * 
 * 1 <= heights.length <= 10^5
 * 1 <= heights[i] <= 10^6
 * 0 <= bricks <= 10^9
 * 0 <= ladders <= heights.length
 * 
 * 
 */

import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

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

function furthestBuilding(heights: number[], bricks: number, ladders: number): number {
    let heap: Node = new Node(heights[0]);

    for (let i = 0; i < heights.length - 1; i++) {
        const step = heights[i + 1] - heights[i];
        heap = meld(heap, new Node(step))!;
        if (step <= 0) continue;
        bricks -= step;
        while (bricks < 0) {
            if (ladders == 0) return i;
            ladders--;
            bricks += heap!.val;
            heap = meld(heap.left, heap.right)!;
        }
    }
    return heights.length - 1;
};

// @lc code=end

Deno.test("a", () => {
    const heights = [4, 2, 7, 6, 9, 14, 12], bricks = 5, ladders = 1
    const output = 4
    assertEquals(furthestBuilding(heights, bricks, ladders), output);
});

Deno.test("a", () => {
    const heights = [4, 12, 2, 7, 3, 18, 20, 3, 19], bricks = 10, ladders = 2
    const output = 7
    assertEquals(furthestBuilding(heights, bricks, ladders), output);
});
Deno.test("a", () => {
    const heights = [14, 3, 19, 3], bricks = 17, ladders = 0;
    const output = 3;
    assertEquals(furthestBuilding(heights, bricks, ladders), output);
});

