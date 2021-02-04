import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

function findLHS(nums: number[]): number {
    const m = new Map<number, number>();
    for (const n of nums) { m.set(n, (m.get(n) || 0) + 1) };
    let k = Array.from(m.keys());
    k.sort((a, b) => a - b);
    let prevn: number = k[0];
    let maxlen = 0;
    k.forEach(n => {
        if (n - prevn == 1) {
            maxlen = Math.max(maxlen, m.get(prevn)! + m.get(n)!);
        }
        prevn = n;
    })
    return maxlen;
};

Deno.test("A", () => {
    const nums = [1, 3, 2, 2, 5, 2, 3, 7];
    const output = 5
    assertEquals(findLHS(nums), output);
})
Deno.test("A", () => {
    const nums = [1, 2, 3, 4];
    const output = 2
    assertEquals(findLHS(nums), output);
})
Deno.test("A", () => {
    const nums = [1, 1, 1, 1];
    const output = 0;
    assertEquals(findLHS(nums), output);
})
Deno.test("A", () => {
    const nums = [1, 2, 2, 3, 4, 5, 1, 1, 1, 1]
    const output = 7;
    assertEquals(findLHS(nums), output);
})

