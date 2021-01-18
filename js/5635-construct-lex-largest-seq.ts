import { assert, fail, assertEquals } from "https://deno.land/std/testing/asserts.ts";

function constructDistancedSequence(n: number): number[] {
    const a = Array(1 + (n - 1) * 2).fill(0);

    let res: number[][] = [];

    const chk = (i: number): boolean => {
        if (i === 1) {
            a[a.indexOf(0)] = 1;
            res.push([...a]);
            return true;
        }
        for (let j = 0; j < a.length - i; j++) {
            if (a[j] == 0 && a[j + i] == 0) {
                a[j] = i;
                a[j + i] = i;
                // console.log({ j, a });
                chk(i - 1);
                a[j] = 0;
                a[j + i] = 0;
            }
        }
        return false;
    }

    chk(n);

    res.sort((a, b) => JSON.stringify(a) > JSON.stringify(b) ? -1 : 1);
    console.log({ all: res });
    return res[0];

}


Deno.test("a", () => {
    assertEquals(constructDistancedSequence(3), [3, 1, 2, 3, 2]);
})
Deno.test("a", () => {
    console.log(constructDistancedSequence(5));
    // assertEquals(constructDistancedSequence(5), [5, 3, 1, 4, 3, 5, 2, 4, 2]);
})
