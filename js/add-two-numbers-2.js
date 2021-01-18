import { assert, fail, assertEquals } from "https://deno.land/std/testing/asserts.ts";

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
    const s1 = createStack(l1);
    const s2 = createStack(l2);
    let resNode = null;

    let carry = 0;
    while (true) {
        const d1 = s1.shift();
        const d2 = s2.shift();
        if (carry === 0 && d1 === undefined && d2 === undefined) break;
        let d = (d1 || 0) + (d2 || 0) + carry;
        if (d >= 10) {
            carry = 1
            d -= 10
        } else {
            carry = 0
        }
        resNode = new ListNode(d, resNode);
    }

    return resNode
};

function createStack(l) {
    const stack = [];
    while (l) {
        stack.unshift(l.val)
        l = l.next
    }
    return stack
}


//------------------------------------------------------------------------------

Deno.test('7243+564', () => {
    const res = addTwoNumbers(createList(7243), createList(564))
    assertEquals(res.val, 7)
    assertEquals(res.next.val, 8)
    assertEquals(res.next.next.val, 0)
    assertEquals(res.next.next.next.val, 7)
    assertEquals(res.next.next.next.next, null)
})

Deno.test('5+5', () => {
    const res = addTwoNumbers(createList(5), createList(5))
    assertEquals(res.val, 1)
    assertEquals(res.next.val, 0)
    assertEquals(res.next.next, null)
})


// Deno.test('creatStack', () => {
//     const stack = createStack(createList(123))
//     assertEquals(stack, [3, 2, 1])

//     const stack2 = createStack(createList(7243))
//     assertEquals(stack2, [3, 4, 2, 7])

// })


function createList(n) {
    const ary = String(n).split('').reverse()
    let cur;
    let next = null;
    for (const a of ary) {
        cur = new ListNode(Number(a), next);
        next = cur;
    }
    return cur
}

// Deno.test('createList', () => {
//     const l = createList(123)
//     assertEquals(l.val, 1)
//     assertEquals(l.next.val, 2)
//     assertEquals(l.next.next.val, 3)
//     assertEquals(l.next.next.next, null)
// })

function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}
