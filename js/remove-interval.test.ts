
import { assert, fail, assertEquals, assertThrows } from "https://deno.land/std/testing/asserts.ts";

function removeInterval(intervals: number[][], toBeRemoved: number[]): number[][] {
    const result: number[][] = [];
    const [ra, rb] = toBeRemoved;
    const push = ((x: number, y: number) => { (x < y) && result.push([x, y]) })
    intervals.forEach(([a, b]) => {
        if (b <= ra || rb <= a) {
            push(a, b)
        } else if (ra <= a && a <= rb && rb <= b) {
            push(rb, b)
        } else if (a <= ra && ra <= b && b <= b) {
            push(a, ra)
        } else if (a <= ra && rb <= b) {
            push(a, ra);
            push(rb, b);
        }
    });
    return result;
}


Deno.test('test', () => {
    const intervals = [[0, 2], [3, 4], [5, 7]], toBeRemoved = [1, 6]
    const output = [[0, 1], [6, 7]]
    assertEquals(removeInterval(intervals, toBeRemoved), output)
})


Deno.test('test', () => {
    const intervals = [[-5, -4], [-3, -2], [1, 2], [3, 5], [8, 9]], toBeRemoved = [-1, 4]
    const output = [[-5, -4], [-3, -2], [4, 5], [8, 9]]
    assertEquals(removeInterval(intervals, toBeRemoved), output)
})


