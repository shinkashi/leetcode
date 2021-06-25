/*
 * @lc app=leetcode id=92 lang=typescript
 *
 * [92] Reverse Linked List II
 *
 * https://leetcode.com/problems/reverse-linked-list-ii/description/
 *
 * algorithms
 * Medium (41.14%)
 * Likes:    4100
 * Dislikes: 212
 * Total Accepted:    376.9K
 * Total Submissions: 902.9K
 * Testcase Example:  '[1,2,3,4,5]\n2\n4'
 *
 * Given the head of a singly linked list and two integers left and right where
 * left <= right, reverse the nodes of the list from position left to position
 * right, and return the reversed list.
 * 
 * 
 * Example 1:
 * 
 * 
 * Input: head = [1,2,3,4,5], left = 2, right = 4
 * Output: [1,4,3,2,5]
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: head = [5], left = 1, right = 1
 * Output: [5]
 * 
 * 
 * 
 * Constraints:
 * 
 * 
 * The number of nodes in the list is n.
 * 1 <= n <= 500
 * -500 <= Node.val <= 500
 * 1 <= left <= right <= n
 * 
 * 
 * 
 * Follow up: Could you do it in one pass?
 */

class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val)
        this.next = (next === undefined ? null : next)
    }
}

// @lc code=start
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

function reverseBetween(head: ListNode | null, left: number, right: number): ListNode | null {
    const sentinel = new ListNode(-1, head);

    if (head == null) {
        return head;
    }
    sentinel.next = head;
    let mp: ListNode | null = sentinel;
    for (let i = 0; i < left - 1; i++) {
        mp = mp.next!;
    }
    //mp.next is the first element to be reversed
    let rhead: ListNode = mp;
    mp = mp.next;
    let rtail = mp;
    let next = null;
    for (let i = 0; i < right - left + 1; i++) {
        next = mp!.next;
        mp!.next = rhead.next;
        rhead.next = mp;
        mp = next;
    }
    rtail!.next = mp;
    return sentinel.next;
};
// @lc code=end

