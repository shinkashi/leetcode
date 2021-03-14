import { assert } from "https://deno.land/std/testing/asserts.ts";

class Node {
    val: number;
    constructor(
        public pass: number,
        public total: number,
        public left: Node | null = null,
        public right: Node | null = null
    ) {
        this.val = (pass + 1) / (total + 1) - pass / total;
    };
}

// Skew Heap
function meld(a: Node | null, b: Node | null): Node | null {
    if (!a) return b;
    if (!b) return a;
    if (a.val < b.val) [b, a] = [a, b];     // Change > to < to make max-heap
    a.right = meld(a.right, b);
    [a.left, a.right] = [a.right, a.left];
    return a;
}

function maxAverageRatio(classes: number[][], extraStudents: number): number {
    let heap: Node | null = null;

    for (let i = 0; i < classes.length; i++) {
        const pass = classes[i][0];
        const total = classes[i][1];
        heap = meld(heap, new Node(pass, total));
    }

    for (let i = 1; i <= extraStudents; i++) {
        // remove top
        // console.log("top ", heap);

        let head = heap!;
        heap = meld(head.left, head.right);
        head.pass += 1;
        head.total += 1;
        heap = meld(heap, new Node(head.pass, head.total));
    }
    // console.log("final ", heap);

    // get final average
    let cnt = 0;
    let avg = 0;
    while (heap) {
        avg += heap.pass / heap.total;
        cnt += 1;
        // console.log({ pass, total })
        heap = meld(heap.left, heap.right);
    }

    return avg / cnt;
}

Deno.test("test", () => {
    const classes = [[1, 2], [3, 5], [2, 2]];
    const extraStudents = 2;
    const output = 0.78333;
    const res = maxAverageRatio(classes, extraStudents)
    const diff = Math.abs(res - output);
    // console.log({ res, diff })
    assert(diff <= 10e-5)
})
Deno.test("test", () => {
    const classes = [[2, 4], [3, 9], [4, 5], [2, 10]]
    const extraStudents = 4
    const output = 0.53485
    const res = maxAverageRatio(classes, extraStudents)
    const diff = Math.abs(res - output);
    // console.log({ res, diff })
    assert(diff <= 10e-5)
})

