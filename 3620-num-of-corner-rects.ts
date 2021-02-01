import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

function countCornerRectangles(grid: number[][]): number {
    let total = 0;
    for (let y1 = 0; y1 < grid.length; y1++) {
        for (let y2 = y1 + 1; y2 < grid.length; y2++) {
            let cnt = 0;
            for (let x = 0; x < grid[0].length; x++) {
                if (grid[y1][x] * grid[y2][x] === 1) cnt++;
            }
            total += cnt * (cnt - 1) / 2
        }
    };
    return total;
}

Deno.test("A", () => {
    const grid =
        [[1, 1, 1],
        [1, 1, 1],
        [1, 1, 1]]
    const output = 9
    assertEquals(countCornerRectangles(grid), output);
})
Deno.test("A", () => {
    const grid =
        [[1, 0, 0, 1, 0],
        [0, 0, 1, 0, 1],
        [0, 0, 0, 1, 0],
        [1, 0, 1, 0, 1]]
    const output = 1
    assertEquals(countCornerRectangles(grid), output)
})

Deno.test("A", () => {
    const grid =
        [[1, 1, 1, 1]]

    const output = 0
    assertEquals(countCornerRectangles(grid), output)
})


