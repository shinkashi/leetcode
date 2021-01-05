/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function (head) {
    const orig = new ListNode(9999, head);
    let prev = orig;
    let cur = head;
    while (cur && cur.next) {
        if (cur.val != cur.next.val) {
            prev = cur;
            cur = cur.next;
            continue;
        }
        const curval = cur.val;
        while (cur && curval == cur.val) cur = cur.next;
        prev.next = cur;
    }

    return orig.next;
};
