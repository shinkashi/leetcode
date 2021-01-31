import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

function canEat(candiesCount: number[], queries: number[][]): boolean[] {
    let acc = Array(candiesCount.length);
    acc[0] = candiesCount[0];
    for (let i = 1; i < candiesCount.length; i++) {
        acc[i] = acc[i - 1] + candiesCount[i]
    }

    return queries.map(([typ, day, cap]) => {
        let candyMin = typ === 0 ? 1 : acc[typ - 1] + 1;
        let candyMax = acc[typ];

        let eatMin = day + 1;
        let eatMax = (day + 1) * cap;
        // console.log({ q: [typ, day, cap], candyMin, candyMax, eatMin, eatMax })

        return (candyMax < eatMin || eatMax < candyMin) ? false : true;
    })
};
Deno.test("test", () => {
    const candiesCount = [7, 4, 5, 3, 8], queries = [[0, 2, 2], [4, 2, 4], [2, 13, 1000000000]]
    const output = [true, false, true]
    assertEquals(canEat(candiesCount, queries), output);
})

Deno.test("test", () => {
    const candiesCount = [5, 2, 6, 4, 1], queries = [[3, 1, 2], [4, 10, 3], [3, 10, 100], [4, 100, 30], [1, 3, 1]];
    const output = [false, true, true, false, false];
    assertEquals(canEat(candiesCount, queries), output);
})
