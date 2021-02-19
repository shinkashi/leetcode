import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

function numberOfArithmeticSlices(A: number[]): number {
    if (A.length <= 2) return 0;

    const d = Array(A.length - 1);
    for (let i = 0; i < A.length - 1; i++) {
        d[i] = A[i + 1] - A[i];
    }

    let cnt = 0;

    let prev = 0;
    for (let i = 0; i < d.length + 1; i++) {
        if (d[prev] === d[i]) continue;
        let len = i - prev;
        if (len >= 2) {
            len -= 1;
            cnt += len * (len + 1) / 2;
        }
        prev = i;
    }

    return cnt;
};

Deno.test("test", () => {
    const input: number[] = [];
    const output = 0;
    assertEquals(numberOfArithmeticSlices(input), output);
})

Deno.test("test", () => {
    const input = [1];
    const output = 0;
    assertEquals(numberOfArithmeticSlices(input), output);
})

Deno.test("test", () => {
    const input = [1, 2];
    const output = 0;
    assertEquals(numberOfArithmeticSlices(input), output);
})

Deno.test("test", () => {
    const input = [1, 2, 3];
    const output = 1;
    assertEquals(numberOfArithmeticSlices(input), output);
})

Deno.test("test", () => {
    const input = [1, 2, 3, 4];
    const output = 3;
    assertEquals(numberOfArithmeticSlices(input), output);
})

Deno.test("test", () => {
    const input = [1, 2, 3, 4, 1, 3, 5, 7, 9];
    const output = 3 + 6;
    assertEquals(numberOfArithmeticSlices(input), output);
})
