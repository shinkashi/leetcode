import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { italic } from "https://deno.land/std@0.78.0/fmt/colors.ts";

function countBalls(lowLimit: number, highLimit: number): number {
    let counter = Array(50).fill(0);

    for (let i = lowLimit; i <= highLimit; i++) {
        const n = Array.from(i.toString()).map(x => Number(x)).reduce((a, b) => a + b)
        counter[n]++
    }
    return Math.max(...counter);
};

Deno.test("test", () => {
    const lowLimit = 1, highLimit = 10;
    const output = 2;
    assertEquals(countBalls(lowLimit, highLimit), output);
})
Deno.test("test", () => {
    const lowLimit = 5, highLimit = 15;
    const output = 2;
    assertEquals(countBalls(lowLimit, highLimit), output);
})
Deno.test("test", () => {
    const lowLimit = 19, highLimit = 28;
    const output = 2;
    assertEquals(countBalls(lowLimit, highLimit), output);
})
