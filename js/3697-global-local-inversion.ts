import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

function isIdealPermutation(A: number[]): boolean {
    // calc local inversion
    let localInv = 0;
    for (let i = 0; i < A.length - 1; i++) {
        if (A[i] > A[i + 1]) localInv++;
    }

    // calc global inversion
    const M: number[] = Array(A.length);
    for (let i = 0; i < A.length; i++) {
        M[A[i]] = i;
    }
    let globalInv = 0;
    for (let i = 0; i < A.length; i++) {
        let pos = M[i];
        let cnt = 0
        for (let j = 0; j < i; j++) {
            if (M[j] < pos) cnt++;
        }
        globalInv += pos - cnt;
    }
    // console.log({ globalInv, localInv })
    return globalInv == localInv;
}

Deno.test("test", () => {
    assertEquals(isIdealPermutation([1, 0, 2]), true)
})
Deno.test("test", () => {
    assertEquals(isIdealPermutation([1, 2, 0]), false)
})
