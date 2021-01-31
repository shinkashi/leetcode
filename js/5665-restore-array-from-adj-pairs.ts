import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

function restoreArray(adjacentPairs: number[][]): number[] {
    const m = new Map<number, number[]>();

    for (const [a, b] of adjacentPairs) {
        m.set(a, (m.get(a) || []).concat([b]));
        m.set(b, (m.get(b) || []).concat([a]));
    }

    let i = -1;
    for (const [k, v] of m) {
        if (v.length === 1) {
            i = k;
            break;
        }
    }

    let res: number[] = [];
    let prev = Infinity;

    while (true) {
        res.push(i);
        const nx = m.get(i)!.filter(nx => nx !== prev)
        if (nx.length === 0) break;
        prev = i;
        i = nx[0];
    }

    return res;
};

Deno.test("test", () => {
    const adjacentPairs = [[2, 1], [3, 4], [3, 2]]
    const output = [1, 2, 3, 4]
    assertEquals(restoreArray(adjacentPairs), output);
})
Deno.test("test", () => {
    const adjacentPairs = [[4, -2], [1, 4], [-3, 1]];
    const output = [-2, 4, 1, -3];
    assertEquals(restoreArray(adjacentPairs), output);
})
