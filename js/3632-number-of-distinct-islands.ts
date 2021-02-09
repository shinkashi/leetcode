import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

function numDistinctIslands(grid: number[][]): number {
    const ym = grid.length;
    const xm = grid[0].length;

    const islands = new Set<string>();

    const check = (y: number, x: number): string => {
        if (y < 0 || y >= ym) return "";
        if (x < 0 || x >= xm) return "";
        if (grid[y][x] === 0) return "";

        grid[y][x] = 0;

        let sig = '';
        let s = '';

        sig += 'u(' + check(y - 1, x) + ')';

        sig += 'l(' + check(y, x - 1) + ')';

        sig += 'd(' + check(y + 1, x) + ')';

        sig += 'r(' + check(y, x + 1) + ')';

        return sig;
    }

    for (let y = 0; y < ym; y++) {
        for (let x = 0; x < xm; x++) {
            const sig = check(y, x);
            if (sig !== "") {
                console.log({ sig });
                islands.add(sig);
            }
        }
    }
    return islands.size;
}

Deno.test("test", () => {
    const input = [[1, 1, 0, 0, 0], [1, 1, 0, 0, 0], [0, 0, 0, 1, 1], [0, 0, 0, 1, 1]];
    const output = 1;
    assertEquals(numDistinctIslands(input), output);
});

Deno.test("test", () => {
    const input = [[1, 1, 0, 1, 1], [1, 0, 0, 0, 0], [0, 0, 0, 0, 1], [1, 1, 0, 1, 1]];
    const output = 3;
    assertEquals(numDistinctIslands(input), output);
});

