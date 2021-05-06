/*
 * @lc app=leetcode id=109 lang=typescript
 *
 * [109] Convert Sorted List to Binary Search Tree
 *
 * https://leetcode.com/problems/convert-sorted-list-to-binary-search-tree/description/
 *
 * algorithms
 * Medium (50.74%)
 * Likes:    2968
 * Dislikes: 97
 * Total Accepted:    294.6K
 * Total Submissions: 576.7K
 * Testcase Example:  '[-10,-3,0,5,9]'
 *
 * Given the head of a singly linked list where elements are sorted in
 * ascending order, convert it to a height balanced BST.
 * 
 * For this problem, a height-balanced binary tree is defined as a binary tree
 * in which the depth of the two subtrees of every node never differ by more
 * than 1.
 * 
 * 
 * Example 1:
 * 
 * 
 * Input: head = [-10,-3,0,5,9]
 * Output: [0,-3,9,-10,null,5]
 * Explanation: One possible answer is [0,-3,9,-10,null,5], which represents
 * the shown height balanced BST.
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: head = []
 * Output: []
 * 
 * 
 * Example 3:
 * 
 * 
 * Input: head = [0]
 * Output: [0]
 * 
 * 
 * Example 4:
 * 
 * 
 * Input: head = [1,3]
 * Output: [3,1]
 * 
 * 
 * 
 * Constraints:
 * 
 * 
 * The number of nodes in head is in the range [0, 2 * 10^4].
 * -10^5 <= Node.val <= 10^5
 * 
 * 
 */

/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

/* 
 * Definition for a binary tree node.
*/
class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val === undefined ? 0 : val)
        this.left = (left === undefined ? null : left)
        this.right = (right === undefined ? null : right)
    }
}

// @lc code=start

function sortedListToBST(head: ListNode | null): TreeNode | null {
    const makeTree = (left: ListNode | null): TreeNode | null => {
        if (!left) return null;

        // find the middle node
        let slow = left;
        let fast = left;
        let prev: ListNode | null = null;

        while (fast?.next) {
            prev = slow;
            slow = slow.next;
            fast = fast.next.next;
        }
        if (prev) prev.next = null;
        const mid = slow;

        if (left === mid) return new TreeNode(mid.val);

        return new TreeNode(
            mid.val,
            makeTree(left),
            makeTree(mid.next))
    }

    return makeTree(head);
};
// @lc code=end

