import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

function maxValue(n: number, index: number, maxSum: number): number {
    const sumSeries = (a: number, b: number): number => {
        a = Math.max(a, 0);
        b = Math.max(b, 0);
        return (a + b) * (Math.abs(a - b) + 1) / 2
    }

    const totalArea = (x: number, index: number): number => {
        let total = n;
        total += sumSeries(x - 1, x - index);
        total += sumSeries(x - 1, x + index);
        return total;
    }

    console.log(totalArea(4, 2));

    return 0;
}

Deno.test("test", () => {
    assertEquals(maxValue(4, 2, 6), 2);
})
Deno.test("test", () => {
    assertEquals(maxValue(6, 1, 10), 3);
})
