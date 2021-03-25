import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

function advantageCount(A: number[], B: number[]): number[] {
    const a = [...A].sort((a, b) => b - a);
    const b = [...B].map((x, i) => [x, i]).sort((a, b) => b[0] - a[0]);
    // console.error({ a, b })

    const res = Array<number>(A.length);
    let ai = 0;
    let az = a.length - 1;
    let bi = 0;
    while (ai <= az) {
        const loc = b[bi][1];
        // console.error({ ax, bx, loc });
        if (a[ai] > b[bi][0]) {
            // use a[ai]
            res[loc] = a[ai];
            ai++;
        } else {
            // use a[az]
            res[loc] = a[az];
            az--;
        }
        bi++;
    }
    // console.error({ res })
    return res;
}

Deno.test("test", () => {
    const A = [2, 7, 11, 15], B = [1, 10, 4, 11];
    const Output = [2, 11, 7, 15]
    assertEquals(advantageCount(A, B), Output);
})

Deno.test("test", () => {
    const A = [12, 24, 8, 32], B = [13, 25, 32, 11];
    const Output = [24, 32, 8, 12];
    assertEquals(advantageCount(A, B), Output);
})
