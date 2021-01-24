import { assert, assertEquals } from "https://deno.land/std/testing/asserts.ts";

function kthLargestValue(matrix: number[][], k: number): number {
    let kth = Array(k).fill(0);

    const xor: number[][] = Array(matrix.length).fill(0).map(_ => []);


    for (let i = 0; i < matrix.length; i++) {
        let n = 0;
        for (let j = 0; j < matrix[0].length; j++) {
            n ^= matrix[i][j];
            let m = i == 0 ? 0 : xor[i - 1][j]
            xor[i][j] = n ^ m;
            // console.log({ i, j, xor: xor[i][j] })

            kth.push(xor[i][j]);
        }
    };

    kth.sort((a, b) => b - a);
    // kth.length = k;

    return kth[k - 1];
}


Deno.test("a", () => {
    const matrix = [[5, 2], [1, 6]], k = 1;
    const output = 7;
    assertEquals(kthLargestValue(matrix, k), output);
})


Deno.test("a", () => {
    const matrix = [[5, 2], [1, 6]], k = 2;
    const output = 5;
    assertEquals(kthLargestValue(matrix, k), output);
})

Deno.test("a", () => {
    const matrix = [[5, 2], [1, 6]], k = 3;
    const output = 4;
    assertEquals(kthLargestValue(matrix, k), output);
})

Deno.test("a", () => {
    const matrix = [[5, 2], [1, 6]], k = 4;
    const output = 0;
    assertEquals(kthLargestValue(matrix, k), output);
})
