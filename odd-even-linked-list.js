import _ from 'http://deno.land/x/lodash@4.17.11-es/lodash.js';
import { assert, assertEquals } from "https://deno.land/std@0.69.0/testing/asserts.ts";

function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}

/**
* @param {ListNode} head
* @return {ListNode}
*/

var oddEvenList = function (head) {
    if (!head) return null;
    if (!head.next) return head;

    const oddHead = head;
    const evenHead = head.next;

    let oddTail = oddHead;
    let evenTail = evenHead;

    let ptr = head.next.next

    while (ptr) {
        oddTail.next = ptr;
        oddTail = ptr;
        ptr = ptr.next;
        if (!ptr) break;

        evenTail.next = ptr;
        evenTail = ptr;
        ptr = ptr.next;
        if (!ptr) break;
    }

    evenTail.next = null;
    oddTail.next = evenHead;
};


Deno.test('test', () => {
    const input = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5)))))
    console.log(input)

    oddEvenList(input);
    console.log(input)


    const output = new ListNode(1, new ListNode(3, new ListNode(5, new ListNode(2, new ListNode(4)))))
    console.log(output)

    assertEquals(input, output)

})

// Deno.test.skip('test', () => {
//     const input = new ListNode(2, new ListNode(1, new ListNode(2, new ListNode(4, new ListNode(5)))))
//     oddEvenList(input);
//     const output = new ListNode(1, new ListNode(3, new ListNode(5, new ListNode(2, new ListNode(4)))))
// })
