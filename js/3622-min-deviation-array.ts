import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

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

function minimumDeviation(nums: number[]): number {
    let min = Infinity;
    let heap: Node | null = null;

    for (let i = 0; i < nums.length; i++) {
        if (nums[i] % 2 === 1) nums[i] *= 2;
        min = Math.min(min, nums[i]);
        heap = meld(heap, new Node(nums[i]))
    }

    let diff = Infinity;
    while (heap && heap.val % 2 === 0) {
        let max = heap.val;
        heap = meld(heap.left, heap.right);
        diff = Math.min(diff, max - min);
        max /= 2;
        min = Math.min(min, max);
        heap = meld(heap, new Node(max));
    }
    return Math.min(diff, heap!.val - min);
};

Deno.test("A", () => {
    const nums = [1, 2, 3, 4];
    const output = 1;
    assertEquals(minimumDeviation(nums), output);
})
Deno.test("A", () => {
    const nums = [4, 1, 5, 20, 3];
    const output = 3;
    assertEquals(minimumDeviation(nums), output);
})
Deno.test("A", () => {
    const nums = [2, 10, 8];
    const output = 3;
    assertEquals(minimumDeviation(nums), output);
})
Deno.test("A", () => {
    const nums = [3, 5]
    const output = 1;
    assertEquals(minimumDeviation(nums), output);
})
Deno.test("A", () => {
    const nums = [399, 908, 648, 357, 693, 502, 331, 649, 596, 698];
    const output = 315;
    assertEquals(minimumDeviation(nums), output);
})



